import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {JobsService} from '../../services/jobs.service';

@Component({
    selector: 'app-annotation-details',
    templateUrl: './annotation-details.component.html',
    styleUrls: ['./annotation-details.component.scss']
})
export class AnnotationDetailsComponent implements OnInit {

    single = [
        {
            'name': 'IGHV1-1',
            'value': 189
        },
        {
            'name': 'IGHV2-1',
            'value': 165
        },
        {
            'name': 'IGHV2-2',
            'value': 150
        },
        {
            'name': 'IGHV2-3',
            'value': 130
        },
        {
            'name': 'IGHV3-1',
            'value': 120
        },
        {
            'name': 'IGHV4-2',
            'value': 110
        },
        {
            'name': 'IGHV12-1',
            'value': 65
        },
        {
            'name': 'IGHV13-1',
            'value': 20
        }
    ];
    multi: any[];

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Gene';
    showYAxisLabel = true;
    yAxisLabel = 'Count';


    tableSettings = {
        actions: {
            edit: false,
            delete: false,
            add: false,
            custom: [
            ],
            position: 'right'
        },
        pager: {
            display: true,
            perPage: 20
        },
        columns: {
            seqId: {
                title: 'Sequence ID'
            },
            locus: {
                title: 'Locus',
            },
            productive: {
                title: 'Locus',
            },
            v_call: {
                title: 'V Gene',
            },
            d_call: {
                title: 'D Gene'
            },
            j_call: {
                title: 'J Gene',
            },
            cdr3aa: {
                title: 'CDR3 aa'
            }
        }
    };

    annotation;

    constructor(private route: ActivatedRoute, private router: Router, private jobsService: JobsService) {
    }

    annotationdId;
    action;

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.annotationdId = params.id;
            const routeParts = this.router.url.split('/');
            this.action = routeParts[routeParts.length - 1];
            this.getAnnotation();
        });
    }

    getAnnotation(): void {
        this.jobsService.getJob({_id: this.annotationdId}).subscribe(
            data => {
                console.log(data);
                this.annotation = data;
            },
            error => {
                console.log(error);
            }
        )
    }

}
