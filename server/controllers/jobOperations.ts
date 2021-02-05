import Job from '../models/job';
import Sequence from '../models/sequence';
import SequenceAnnotation from '../models/sequence-annotation';
import * as path from 'path';
import * as os from 'os';

const {v1: uuidv1} = require('uuid');
const fs = require('fs');
const fse = require('fs-extra');
const {exec} = require('child_process');
const dl = require('datalib');


class JobOperations {
    jobs = Job;
    sequences = Sequence;
    sequenceAnnotations = SequenceAnnotation;

    processJobs = async (req, res) => {
        const nextJob = await this.jobs.findOne({status: 'SUBMITTED'}).populate('tool').populate('target').populate('germline');
       // const nextJob = await this.jobs.findOne({}).populate('tool').populate('target').populate('germline');
        if (!!nextJob) {
            console.log('next job', nextJob._doc._id);

            // 1 change status to 'PROCESSING'
            const fullJobObj = nextJob._doc;
            const job = JSON.parse(JSON.stringify(fullJobObj));
            job.tool = job.tool._id;
            job.target = job.target._id;
            job.germline = job.germline._id;
            job.status = 'PROCESSING';

            await this.jobs.findOneAndUpdate({_id: job._id}, job);

            // 2 create job directories
            const jobDir = fs.mkdtempSync(path.join(os.tmpdir(), 'job-'));
            console.log('Created job directory: ', jobDir);
            const inputsDir = fs.mkdtempSync(path.join(jobDir, 'input-'));
            const germliDir = fs.mkdtempSync(path.join(jobDir, 'germline-'));
            const outputsDir = fs.mkdtempSync(path.join(jobDir, 'output-'));
            console.log('Created directories: ', inputsDir, outputsDir, germliDir);

            // 3 Export sequences to fasta
            const fastaFileInput = uuidv1() + '.fasta';
            const inputSequences = await this.sequences.find({datasetId: job.target});
            for (const seq of inputSequences) {
                fs.appendFileSync(path.join(inputsDir, fastaFileInput), '>' + seq._doc.seqId + os.EOL);
                fs.appendFileSync(path.join(inputsDir, fastaFileInput), seq._doc.content + os.EOL);
            }

            // 4 prepare germlines
            // currently a snapshot, later to generate from db
            fse.copySync(path.join(__dirname, '../configurations/seeds/germlines'), germliDir);

            const dockerPath = path.join(__dirname, '../' + fullJobObj.tool.pathCmd);
            const dockerBuildCmd = 'docker build -t ' + fullJobObj.tool._id + ' ' + dockerPath;
            console.log(dockerBuildCmd);
            exec(dockerBuildCmd, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);

                const dockerRunCmd = 'docker run ' +
                    '-v ' + inputsDir + ':/INPUT ' +
                    '-v ' + outputsDir + ':/OUTPUT ' +
                    '-v ' + germliDir + ':/GERMLINES ' + fullJobObj.tool._id +
                    ' start human ig';

                exec(dockerRunCmd, (error1, stdout1, stderr1) => {
                    if (error1) {
                        console.log(`error: ${error1.message}`);
                        return;
                    }
                    if (stderr1) {
                        console.log(`stderr: ${stderr1}`);
                        return;
                    }
                    console.log(`stdout: ${stdout1}`);

                    // Loop through all the files in the temp directory
                    fs.readdir(outputsDir, (err, files) => {
                        if (err) {
                            console.error('Could not list the directory.', err);
                            process.exit(1);
                        }

                        files.forEach(async (file, index) => {
                            console.log('Procesing output file: ', file);

                            // import tsv data, automatically infer value types
                            const data = dl.tsv(path.join(outputsDir, file));
                            for (const d of data) {
                                await new SequenceAnnotation({
                                    jobId: fullJobObj._id,
                                    seqId: d.sequence_id,
                                    locus: d.locus,
                                    v_call: d.v_call,
                                    d_call: d.d_call,
                                    j_call: d.j_call,
                                    productive: d.productive,
                                    cdr3aa: d.cdr3_aa
                                }).save();
                            }

                        });
                        job.status = 'DONE';

                        this.jobs.findOneAndUpdate({_id: job._id}, job);

                    });


                });
            });

        }

    };
}

export default JobOperations;
