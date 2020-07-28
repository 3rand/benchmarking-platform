import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-annotation',
    templateUrl: './annotation.component.html',
    styleUrls: ['./annotation.component.scss']
})
export class AnnotationComponent implements OnInit {
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
    annotations = [{
        _id: '3124jlhn2j3k5j234j',
        name: 'Test annotation_1',
        dataset: 'Lorem ipsum',
        nrseq: 735,
        tool: 'IgBLAST 16',
        job: 'SH341BF'
    },
        {
            name: 'Test annotation_1',
            _id: '3124jlhn2j3k5j234j',
            dataset: 'Lorem ipsum',
            nrseq: 735,
            tool: 'partis',
            job: 'SH341BF'
        },
        {
            name: 'Test annotation_2',
            _id: '3124jlhn2j3k5j234j',
            dataset: 'Other dataset',
            nrseq: 856,
            tool: 'IgBLAST 16',
            job: 'XDF456W'
        },
        {
            name: 'Test annotation_2',
            _id: '3124jlhn2j3k5j234j',
            dataset: 'Other dataset',
            nrseq: 856,
            tool: 'partis',
            job: 'XDF456W'
        }];

    constructor(private router: Router) {
    }

    ngOnInit(): void {

    }

    tableEvent($event) {
        console.log($event);
        if ($event.action === 'view') {
            this.router.navigate(['/annotations', $event.data._id, 'details']);
        }
    }
}
