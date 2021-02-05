import {Component, OnInit} from '@angular/core';
import {SequenceService} from '../../services/sequence.service';

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
            content: {
                title: 'Sequence',
                type: 'string',
                width: '200px'
            },
            sourceFile: {
                title: 'File',
            },
            datasetId: {
                title: 'Datasets'
            }
        }
    };
    sequences = [];

    constructor(private sequenceService: SequenceService) {
    }

    ngOnInit(): void {
        this.getSequences();
    }

    getSequences(): void {
        this.sequenceService.getSequences().subscribe(data => {
            console.log(data);
            this.sequences = data;
        }, error1 => {
            console.log(error1);
        });
    }

}
