import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-sequences',
    templateUrl: './sequences.component.html',
    styleUrls: ['./sequences.component.scss']
})
export class SequencesComponent implements OnInit {
    tableSettings = {
        actions: {
            edit: false,
            delete: false,
            add: false,
            //custom: [         ],
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
            sequence: {
                title: 'Sequence',
                type: 'string',
                width: '200px'
            },
            file: {
                title: 'File',
            },
            datasets: {
                title: 'Datasets'
            },
            annotations: {
                title: 'Annotations',
                filter: false
            }
        }
    };
    sequences = [{
        seqId: 'seq0',
        sequence: 'tgcaccaaacatgtctaaagctggaaccaaaattactttctttgaagacaaaaactttca' +
            'aggccgccactatgacagcgattgcgactgtgcagatttccacatgtacctgagccgctg' +
            'caactccatcagagtggaaggaggcacctgggctgtgtatg',
        file: 'my_fasta_0.fasta',
        datasets: 'Lorem ipsum',
        annotations: 6
    },
        {
            seqId: 'seq1',
            sequence: 'tgcaccaaacatgtctaaagctggaaccaaaattactttctttgaagacaaaaactttca' +
                'tttaaattata' +
                'caactccatcagagtggaaggaggcacctgggctgtgtatg',
            file: 'my_fasta_0.fasta',
            datasets: 'Lorem ipsum',
            annotations: 6
        },
        {
            seqId: 'seq2',
            sequence: 'tgcaccaaacatgtctaaagctggaaccaaaattactttctttgaagacaaaaactttca' +
                'caactccatcagagtggaaggaggcacctgggctgtgtatg',
            file: 'my_fasta_0.fasta',
            datasets: 'Lorem ipsum',
            annotations: 6
        },
        {
            seqId: 'seq3',
            sequence: 'caactccatcagagtggaaggaggcacctgggctgtgtatg',
            file: 'my_fasta_0.fasta',
            datasets: 'Lorem ipsum',
            annotations: 6
        }];

    constructor() {
    }

    ngOnInit(): void {
    }

}
