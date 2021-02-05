# Benchmarking Platform
## Docker container for annotation tool

This repo contains the Dockerized IgBLAST tool for use in the Benchmarking platfrom. It is also an example reference for futher tools to be added.

#### Overview

The tool container will receive minimal input and produce minimal output. The germline will be given along with each run. 
There must be a single command to start the container and process all the data. This command shall be named 'start'

#### Container format

The container must be defined by a single Dockerfile (do not use compose). Docker compose will be used by the Benchmarking Platform to group all tools and their parameters. 

#### Data Directories

Whenever the container is started, 3 volumes will be bound:

- /INPUT
- /OUTPUT   
- /GERMLINES

The container will have read/write access to these paths. 
The tool should annotate any fasta file under /INPUT, write the results to /OUTPUT and use the germlines found in /GERMLINES

##### Input

The input will be only FASTA format. The programmer may assume a flat directory structure for /INPUT (i.e. there are no subdirectories).
The input may be multiple files.

##### Output

The output will be TSV format. The output will contain at least the following columns:

- sequence_id
    - is the original annotated sequence's ID.
    - if the tool collapses multiple sequences into a single annotation, they must all be present in this field, separated by comma.    
- productive
    - a true false flag indicating whether the annotation is aproductive one.
- v_call
    - the v gene name. For multiple genes, use csv
- d_call
    - the d gene name. For multiple genes, use csv
- j_call
    - the j gene name. For multiple genes, use csv
- cdr3_aa
    - the CDR3 aa annotation.
    
##### Germlines

Germlines provided under /GERMLINES directory will be IMGT format (check ./stample_data/germines in this repository).
The tool should build the germline to proprietray format if necessary, for every run.
There will be only 1 germline available in the directory.

#### $PATH

The programmer is supposed to export to the PATH of the container the 'start' command. The start command will receive only 2 parameters: the species and the receptor type.


#### Examples

The tool will be build once when installed in the Benchmarking platform:

``docker build  -t igblast_docker .``

After it has been build, it is considered ready for use. To run it, the steps below are carried out:

- User

```$xslt
- selects in UI the datasets for annoation
- selects in UI the receptor and species (if not already known for selected dataset)
- selects in UI the germline to use (For custom germlines, they would first add them to the system at which point they will be available for selection) 
```

- Benchmarking platform

```$xslt
- Exports chosen dataset to FASTA format.
- Generates a unique run ID (eg. 44fd3574-ca1e-49b5-8955-51ec5aa2609e)
- Places the FASTA files under /tmp/44fd3574-ca1e-49b5-8955-51ec5aa2609e/INPUT
- Places the germline files under /tmp/44fd3574-ca1e-49b5-8955-51ec5aa2609e/GERMLINES
- Creates empty directory /tmp/44fd3574-ca1e-49b5-8955-51ec5aa2609e/OUTPUT
- Starts the tool docker container with the command below:
```

```$xslt
docker run \
     -v /tmp/44fd3574-ca1e-49b5-8955-51ec5aa2609e/INPUT:/INPUT \
     -v /tmp/44fd3574-ca1e-49b5-8955-51ec5aa2609e/OUTPUT:/OUTPUT  \ 
     -v /tmp/44fd3574-ca1e-49b5-8955-51ec5aa2609e/GERMLINES:/GERMLINES \
     container_name start species receptor
```

Notice above how the volumes are bound and how the command start is given as a literal, so it must be available in the container's path.
The purpose of this, is to unify the communication with the platform for the various tools. 


- The annotation tool

```$xslt
- Annotates any FASTA files under /INPUT
- Uses germlines under /GERMLINE
- Annotations are saved in /OUTPUT
- Any stdout and stderr content will be regarded as logs (saved for debugging purposes)
- The tool must have exit code 0 for success. Any other code will indicated failure. 
```

- Benchmarking platform
```$xslt
Once the tool has finished:
- Scan /tmp/44fd3574-ca1e-49b5-8955-51ec5aa2609e/OUTPUT for any files (regardless of file extension).
- Attempt to parse the files as TSV with rules indicated in Output section above.
- Import into platform DB the annotations.
- Notify user of complete status.
```

####

For any further questions regarding tool integration contact [Erand](mailto:erand.smakaj@gmail.com) or make an issue in GitLab.


