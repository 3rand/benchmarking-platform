import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-job',
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
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
            type: {
                title: 'Job type'
            },
            status: {
                title: 'Status'
            }
        }
    };
    jobs = [{
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

    constructor(private router: Router) {
    }

    ngOnInit(): void {

    }

    tableEvent($event) {
        console.log($event);
        if ($event.action === 'view') {
            this.router.navigate(['/jobs', $event.data._id]);
        }
    }

}
