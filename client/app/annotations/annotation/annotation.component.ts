import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatasetService} from '../../services/datasets.service';
import {ToolsService} from '../../services/tools.service';
import {GermlinesService} from '../../services/germlines.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
            name: {
                title: 'Name'
            },
            dataset: {
                title: 'Dataset',
            },
            tool: {
                title: 'Tool'
            },
            nrseq: {
                title: 'Sequences annotated',
            },
            job: {
                title: 'Job ID',
                filter: false
            }
        }
    };
    annotations = [];

    constructor(private router: Router, private datasetService: DatasetService, private toolsService: ToolsService, private germlinesService: GermlinesService, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.resetJobObject();
        this.getDatasets();
        this.getTools();
        this.getGermlines();
    }

    tableEvent($event) {
        console.log($event);
        if ($event.action === 'view') {
            this.router.navigate(['/annotations', $event.data._id, 'details']);
        }
    }

    resetJobObject() {
        this.job = {
            type: 'annotation',
            target: null,
            tool: null,
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
                this.germlines = [{
                    name: 'IMGT 2020.08.17'
                }];
            },
            error1 => {
                console.log(error1);
            }
        );
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            console.log(this.job);
        }, (reason) => {
            console.log('modal closed');
            this.resetJobObject();
        });
    }
}
