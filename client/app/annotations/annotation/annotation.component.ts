import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatasetService} from '../../services/datasets.service';
import {ToolsService} from '../../services/tools.service';
import {GermlinesService} from '../../services/germlines.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {JobsService} from '../../services/jobs.service';

@Component({
    selector: 'app-annotation',
    templateUrl: './annotation.component.html',
    styleUrls: ['./annotation.component.scss']
})
export class AnnotationComponent implements OnInit {
    datasets = [];
    tools = [];
    germlines = [];
    job = {
        type: 'annotation',
        target: null,
        tool: null,
        status: null,
        germline: null
    };
    tableSettings = {
        actions: {
            edit: false,
            delete: false,
            add: false,
            custom: [
                {
                    name: 'view',
                    title: '<i class="fa fa-eye" title="View"></i> View &nbsp;'
                }
            ],
            position: 'right'
        },
        pager: {
            display: true,
            perPage: 20
        },
        columns: {
            createdDate: {
                title: 'Date'
            },
            targetName: {
                title: 'Dataset',
            },
            toolName: {
                title: 'Tool'
            },
            _id: {
                title: 'Job ID',
                filter: false
            }
        }
    };
    annotations = [];

    constructor(private router: Router,
                private datasetService: DatasetService,
                private toolsService: ToolsService,
                private germlinesService: GermlinesService,
                private modalService: NgbModal,
                private jobsService: JobsService) {
    }

    ngOnInit(): void {
        this.resetJobObject();
        this.getAnnotations();
        this.getDatasets();
        this.getTools();
        this.getGermlines();
    }

    tableEvent($event) {
        console.log($event);
        if ($event.action === 'view') {
            this.router.navigate(['/annotations', $event.data._id, 'sequences']);
        }
    }

    resetJobObject() {
        this.job = {
            type: 'annotation',
            target: null,
            tool: null,
            status: null,
            germline: null
        };
    }

    getDatasets(): void {
        this.datasetService.getDatasetsCondensed().subscribe(
            data => {
                this.datasets = data;
            },
            error1 => {
                console.log(error1);
            }
        );
    }

    getTools(): void {
        this.toolsService.getTools().subscribe(
            data => {
                console.log(data);
                this.tools = data;
            },
            error1 => {
                console.log(error1);
            }
        );
    }

    getGermlines(): void {
        this.germlinesService.getGermlines().subscribe(
            data => {
                console.log(data);
                this.germlines = data;
            },
            error1 => {
                console.log(error1);
            }
        );
    }

    getAnnotations(): void {
        this.jobsService.getAnnotations().subscribe(data => {
            this.annotations = data;
            console.log(this.annotations);
        }, error1 => {
            console.log(error1);
        });
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            const job = this.job;
            job.target = job.target._id;
            job.tool = job.tool._id;
            job.germline = job.germline._id;
            console.log(job);
            job.status = 'SUBMITTED';
            this.jobsService.addJob(job).subscribe(data => {
                console.log(data);
                this.getAnnotations();
            }, error1 => {
                console.log(error1);
            });
        }, (reason) => {
            console.log('modal closed');
            this.resetJobObject();
        });
    }
}
