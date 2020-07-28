import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';

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
            vgene: {
                title: 'V Gene',
            },
            dgene: {
                title: 'D Gene'
            },
            jgene: {
                title: 'J Gene',
            },
            cdr3aa: {
                title: 'CDR3 aa'
            }
        }
    };


    sequencesAnnoated = [{
        seqId: 'seq_0',
        vgene: 'IGHV1-1',
        dgene: 'IGHD1-2',
        jgene: 'IGHJ4',
        cdr3aa: 'CARTAXRTA'
    },
        {
            seqId: 'seq_0',
            vgene: 'IGHV1-1',
            dgene: 'IGHD1-2',
            jgene: 'IGHJ4',
            cdr3aa: 'CAWRTAXRTA'
        }, {
            seqId: 'seq_1',
            vgene: 'IGHV1-1',
            dgene: 'IGHD1-2',
            jgene: 'IGHJ4',
            cdr3aa: 'CARTWQTTTA'
        }, {
            seqId: 'seq_2',
            vgene: 'IGHV1-1',
            dgene: 'IGHD1-2',
            jgene: 'IGHJ4',
            cdr3aa: 'XXXTAXRTA'
        }, {
            seqId: 'seq_3',
            vgene: 'IGHV1-1',
            dgene: 'IGHD1-2',
            jgene: 'IGHJ4',
            cdr3aa: 'CATTTTTA'
        }];

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    annotationdId;
    action;

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.annotationdId = params.id;
            const routeParts = this.router.url.split('/');
            this.action = routeParts[routeParts.length - 1];
        });


    }


}
