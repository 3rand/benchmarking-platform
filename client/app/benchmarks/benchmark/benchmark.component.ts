import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-benchmark',
  templateUrl: './benchmark.component.html',
  styleUrls: ['./benchmark.component.scss']
})
export class BenchmarkComponent implements OnInit {
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
            annotation: {
                title: 'Annotation'
            },
            tools: {
                title: 'Tools',
            },
            job: {
                title: 'Job ID',
                filter: false
            }
        }
    };
    benchmarks = [{
        _id: '3124jlhn2j3k5j234j',
        name: 'Test benchmark_1',
        dataset: 'Lorem ipsum',
        annotation: 'Annotation_1',
        tools: 'IgBLAST 16, partis',
        job: 'SH3234H'
      },
        {
            _id: '3124jlhn2j3k5j234j',
            name: 'Test benchmark_12',
            dataset: 'Other dataset',
            annotation: 'Annotation_test_2',
            tools: 'IgBLAST 16, partis, MiXCR',
            job: 'HHM2221'
        }];

    constructor(private router: Router) {
    }

    ngOnInit(): void {

    }

    tableEvent($event) {
        console.log($event);
        if ($event.action === 'view') {
            this.router.navigate(['/benchmarks', $event.data._id, 'details']);
        }
    }

}
