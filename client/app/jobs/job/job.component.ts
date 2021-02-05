import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {JobsService} from '../../services/jobs.service';
import {ToastComponent} from '../../shared/toast/toast.component';
import {Job} from '../../shared/models/job';
@Component({
    selector: 'app-job',
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
    @ViewChild('jobEditModal') private jobEditModal: TemplateRef<any>;

    newJob: Job;
    jobs = [];

    tableSettings = {
        actions: {
            edit: false,
            delete: false,
            add: false,
            custom: [],
            position: 'right'
        },
        pager: {
            display: true,
            perPage: 20
        },
        columns: {
            target: {
                title: 'Dataset',
            },
            tool: {
                title: 'Tool',
            },
            germline: {
                title: 'Germline',
            },
            status: {
                title: 'Status'
            }
        }
    };
    dummy_jobs = [{
        _id: '3124jlhn2j3k5j234j',
        name: 'Job_234JS',
        dataset: 'Lorem ipsum',
        type: 'Annotation',
        status: 'SUBMITTED'
    },
        {
            _id: '3124jlhn2j3k5j234j',
            name: 'Job_2ATHB',
            dataset: 'Lorem ipsum',
            type: 'Benchmark',
            status: 'PROCESSING'
        }
        ,
        {
            _id: '3124jlhn2j3k5j234j',
            name: 'Job_TR45U',
            dataset: 'Other dataset',
            type: 'Benchmark',
            status: 'DONE'
        }];

    constructor(private router: Router,
                private modalService: NgbModal,
                private jobsService: JobsService,
                public toast: ToastComponent) {
    }

    ngOnInit(): void {
        this.resetNewJobObject();
        this.getJobs();
    }

    tableEvent($event) {
        console.log($event);

        if ($event.action === 'details') {
            this.router.navigate(['/jobs', $event.data._id, 'vgenes']);
        }
        if ($event.action === 'delete') {
            this.deleteJob($event.data._id);
        }
    }

    resetNewJobObject(): void {
        this.newJob = {
            _id: null,
            name: '',
            dataset: null,
            type: null,
            status: 'SUBMITTED',
        };
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            console.log(this.newJob);
            this.createJob();
            console.log('opened up a new job modal');

        }, (reason) => {
            console.log('modal closed');
        });
    }
    getJobs(): void {
        this.jobsService.getJobs().subscribe(
            data => {
                console.log(data);
                this.jobs = data;
            },
            error1 => {
                console.log(error1);
            }
        );
    }

    createJob() {
            if (!!this.newJob._id) {
            // is editing an existing germline
            this.jobsService.editJob(this.newJob).subscribe(
                data => {
                    this.toast.setMessage('Job successfully edited.', 'success');
                    this.getJobs();

                },
                error1 => {
                    console.log(error1);
                    this.toast.setMessage('An error occurred. ' + error1.error.error, 'danger');
                }
            );
        } else {
            // save a new germline
            this.jobsService.addJob(this.newJob).subscribe(
                data => {
                    console.log(data);
                    this.toast.setMessage('Created job: ' + this.newJob.name, 'success');
                    this.resetNewJobObject();
                    this.getJobs();
                },
                error1 => {
                    console.log(error1);
                    this.toast.setMessage('An error occurred. ' + error1.error.error, 'danger');
                }
            );
        }
    }

    deleteJob(jobID) {
        console.log(jobID);
        const approve = confirm('Are you sure you want to delete the job?');
        if (approve) {
            this.jobsService.deleteJob(jobID).subscribe(
                res => {
                    this.toast.setMessage('Job deleted', 'success'), this.getJobs();
                    console.log(this.toast);
                },
                error => console.log(error),
            );
        }
    }

}
