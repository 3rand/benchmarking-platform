import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-benchmark-details',
    templateUrl: './benchmark-details.component.html',
    styleUrls: ['./benchmark-details.component.scss']
})
export class BenchmarkDetailsComponent implements OnInit {

    benchmark;
    L1 = 1;
    L2 = 1;
    L3 = 1;

    chartData = [
        {
            name: 'IGHV1',
            series: [
                {
                    name: '2010',
                    value: 40632,
                    extra: {
                        code: 'de'
                    }
                },
                {
                    name: '2000',
                    value: 36953,
                    extra: {
                        code: 'de'
                    }
                },
                {
                    name: '1990',
                    value: 31476,
                    extra: {
                        code: 'de'
                    }
                }
            ]
        },
        {
            name: 'United States',
            series: [
                {
                    name: '2010',
                    value: 0,
                    extra: {
                        code: 'us'
                    }
                },
                {
                    name: '2000',
                    value: 45986,
                    extra: {
                        code: 'us'
                    }
                },
                {
                    name: '1990',
                    value: 37060,
                    extra: {
                        code: 'us'
                    }
                }
            ]
        },
        {
            name: 'France',
            series: [
                {
                    name: '2010',
                    value: 36745,
                    extra: {
                        code: 'fr'
                    }
                },
                {
                    name: '2000',
                    value: 34774,
                    extra: {
                        code: 'fr'
                    }
                },
                {
                    name: '1990',
                    value: 29476,
                    extra: {
                        code: 'fr'
                    }
                }
            ]
        },
        {
            name: 'United Kingdom',
            series: [
                {
                    name: '2010',
                    value: 36240,
                    extra: {
                        code: 'uk'
                    }
                },
                {
                    name: '2000',
                    value: 32543,
                    extra: {
                        code: 'uk'
                    }
                },
                {
                    name: '1990',
                    value: 26424,
                    extra: {
                        code: 'uk'
                    }
                }
            ]
        }
    ];

    tableSettings1 = {
        actions: {
            edit: false,
            delete: false,
            add: false
        },
        pager: {
            display: true,
            perPage: 20
        },
        columns: {
            gene: {
                title: 'Gene'
            },
            count: {
                title: 'Count',
            },
            tool: {
                title: 'Tool'
            }
        }
    };

    constructor() {
    }

    ngOnInit(): void {
        this.benchmark = {
            _id: 'a458ghsb123',
            targetName: 'My dataset 12',
            annoations: [
                {_id: 'asdfas234', tool: 'IgBLAST 14 - Germline A'},
                {_id: 'asd345f', tool: 'IgBLAST 15 - Germline B'},
            ],
            date: '28/07/2020 9:34',
            status: 'PROCESSED',
            data: {
                vgenes: {
                    gene: [
                        {gene: 'IGHV1', count: 12, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV2', count: 1.6, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV3', count: 350.66, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV4', count: 8, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV5', count: 7.3, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV1', count: 12, tool: 'IgBLAST 15 - Germline B'},
                        {gene: 'IGHV2', count: 1.6, tool: 'IgBLAST 15 - Germline B'},
                        {gene: 'IGHV3', count: 350.66, tool: 'IgBLAST 15 - Germline B'},
                        {gene: 'IGHV4', count: 8, tool: 'IgBLAST 15 - Germline B'},
                        {gene: 'IGHV5', count: 7.3, tool: 'IgBLAST 15 - Germline B'},
                    ],
                    fam: [
                        {gene: 'IGHV1-12', count: 12, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV1-13', count: 12.5, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV2-12', count: 1.6, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV3-1', count: 350.66, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV4-1', count: 8, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV5-1', count: 7.3, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV1-12', count: 12, tool: 'IgBLAST 15 - Germline B'},
                        {gene: 'IGHV1-13', count: 12.5, tool: 'IgBLAST 15 - Germline B'},
                        {gene: 'IGHV2-12', count: 1.6, tool: 'IgBLAST 15 - Germline B'},
                        {gene: 'IGHV3-1', count: 350.66, tool: 'IgBLAST 15 - Germline B'},
                        {gene: 'IGHV4-1', count: 8, tool: 'IgBLAST 15 - Germline B'},
                        {gene: 'IGHV5-1', count: 7.3, tool: 'IgBLAST 15 - Germline B'},
                    ],
                    alelle: [
                        {gene: 'IGHV1-12*1', count: 12, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV1-13*2', count: 12.5, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV2-12*1', count: 1.6, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV3-1*1', count: 350.66, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV4-1*4', count: 8, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV5-1*3', count: 7.3, tool: 'gBLAST 14 - Germline A'},
                        {gene: 'IGHV1-12*1', count: 12, tool: 'IgBLAST 15 - Germline B'},
                        {gene: 'IGHV1-13*2', count: 12.5, tool: 'IgBLAST 15 - Germline B'},
                        {gene: 'IGHV2-12*1', count: 1.6, tool: 'IgBLAST 15 - Germline B'},
                        {gene: 'IGHV3-1*1', count: 350.66, tool: 'IgBLAST 15 - Germline B'},
                        {gene: 'IGHV4-1*4', count: 8, tool: 'IgBLAST 15 - Germline B'},
                        {gene: 'IGHV5-1*3', count: 7.3, tool: 'IgBLAST 15 - Germline B'},
                    ]
                },
                dgenes: [],
                jgenes: [],
                cdr3aa: []
            }
        };
    }

}
