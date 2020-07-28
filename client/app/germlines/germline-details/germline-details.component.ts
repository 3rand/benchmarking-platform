import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-germline-details',
    templateUrl: './germline-details.component.html',
    styleUrls: ['./germline-details.component.scss']
})
export class GermlineDetailsComponent implements OnInit {

    germlineID;
    action;

    tableSettings = {
        actions: {
            edit: false,
            delete: false,
            add: false,
            custom: [],
            position: 'right'
        },
        pager: {
            display: true,
            perPage: 20
        },
        columns: {
            seqId: {
                title: 'Gene ID'
            },
            sequence: {
                title: 'Gene Sequence',
            }
        }
    };


    vgenes = [{
        seqId: 'IGHV1-1',
        sequence: 'GCTAGGGTATAATGCTGAAACCGTCCCCCA'
    },
        {
            seqId: 'IGHV2-1',
            sequence: 'AGCGTTCAGGGTGGGGTTTGCTACGACTTCCGAG'
        },
        {
            seqId: 'IGHV3-1',
            sequence: 'TCCAAAGTGTCCGTGTTTTTGATATATACGCTCAAGGGCGAGA'
        },
        {
            seqId: 'IGHV4-1',
            sequence: 'TACGTAGCATGGTGACACAAGCACAGTAGATCCTG'
        }];

    dgenes = [{
        seqId: 'IGHD1-1',
        sequence: 'GTTCGCAAGTCGCACCCTAAACGATGTTGAAGGCTCAGGATGTACACGCACTAGTACAATACATACGTGTTCCGGCTCTTAT'
    },
        {
            seqId: 'IGHD2-1',
            sequence: 'CCTGCATCGGAAGCTCAATCATGCATCGCACCAGCGTGTTCGTGTCATCTAGGAGGGGCGCGTAGGATAAATAATTCAATTAAGATATCGTTATGCTAGTATACG'
        },
        {
            seqId: 'IGHD3-1',
            sequence: 'CCTACCCGTCACCG'
        },
        {
            seqId: 'IGHD4-1',
            sequence: 'GCCAACAGTGTGCAGATGGCGCCACGAGTTACTGGCCCTGATTTCTCCGCTTC'
        }];

    jgenes = [{
        seqId: 'IGHJ1-1',
        sequence: 'TAATACCGCACACTGGGCAAT'
    },
        {
            seqId: 'IGHJ2-1',
            sequence: 'ACGAGCTCAAGCCAGTCTCGCAGTAACGCTCAT'
        },
        {
            seqId: 'IGHJ3-1',
            sequence: 'CAGCTAACGAAAGAGTTAGAG'
        },
        {
            seqId: 'IGHJ4-1',
            sequence: 'GCTCGCTAAATCGCACTGTCGGGGT'
        }];

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.germlineID = params.id;
            const routeParts = this.router.url.split('/');
            this.action = routeParts[routeParts.length - 1];
        });
    }

}
