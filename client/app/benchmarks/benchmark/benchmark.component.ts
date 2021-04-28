import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatasetService} from '../../services/datasets.service';
import {JobsService} from '../../services/jobs.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-benchmark',
    templateUrl: './benchmark.component.html',
    styleUrls: ['./benchmark.component.scss']
})
export class BenchmarkComponent implements OnInit {
    datasets = [];
    selectedDataset;
    annotations = [];
    toolsList = [];

    completeBenchmarks = [];

    tableSettings = {
        actions: {
            edit: false,
            delete: false,
            add: false,
            custom: [
                {
                    name: 'view',
                    title: '<i class="fa fa-eye" title="View"></i> View &nbsp;'
                },
                {
                    name: 'delete',
                    title: '<i class="fa fa-remove" title="Delete"></i> Delete &nbsp;'
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
                title: 'Name'
            },
            _id: {
                title: 'Job ID',
            },
            status: {
                title: 'Status'
            }
        }
    };

    constructor(private router: Router, private datasetService: DatasetService, private jobsService: JobsService, private modalService: NgbModal,) {
    }

    ngOnInit(): void {
        this.getBenchmarks();
        this.getAnnotations();
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
           this.submitBenchmarkJob();
        }, (reason) => {
            console.log('modal closed');
        });
    }

    tableEvent($event) {
        console.log($event);
        if ($event.action === 'view') {
            this.router.navigate(['/benchmarks', $event.data._id]);
        }
        if ($event.action === 'delete') {
            this.jobsService.deleteJob($event.data._id).subscribe(data => {
                console.log(data);
                alert("Deleted sucessfully");
                this.getBenchmarks();
            }, error => {
                console.log(error);
            });
        }
    }

    getAnnotations(): void {
        this.jobsService.getAnnotations().subscribe(data => {
            this.annotations = data;
            console.log(this.annotations);
            this.extractDatasets();
        }, error1 => {
            console.log(error1);
        });
    }

    extractDatasets(): void {
        this.datasets = [];
        for (const annotation of this.annotations) {
            if (!this.datasets.includes(annotation.targetName)) {
                this.datasets.push(annotation.targetName);
            }
        }
        console.log(this.datasets);
    }

    extractTools(selectedDataset): void {
        this.toolsList = [];
        this.selectedDataset = selectedDataset;
        for (const annotation of this.annotations) {
            if (annotation.targetName === selectedDataset) {
                this.toolsList.push({
                    id: annotation._id,
                    selected: true,
                    toolName: annotation.toolName,
                    germline: annotation.germlineName,
                    date: annotation.createdDate
                });
            }
        }
        console.log(this.toolsList);
    }

    submitBenchmarkJob(): void {
        const selectedTools = [];
        for (const tool of this.toolsList) {
            if (tool.selected) {
                selectedTools.push((tool.id));
            }
        }
        if (selectedTools.length > 0) {
            const job = {annotations: selectedTools, status: 'SUBMITTED', type: 'benchmark'};
            console.log(job);
            this.jobsService.addJob(job).subscribe(data => {
                console.log(data);
                this.getBenchmarks();
            }, error1 => {
                console.log(error1);
            });
        }
    }


    getBenchmarks(): void {
        this.jobsService.getBenchmarks().subscribe(data => {
                this.completeBenchmarks = data;
                console.log(this.completeBenchmarks);
            }, error1 => {
                console.log(error1);
            }
        );
    }
}
