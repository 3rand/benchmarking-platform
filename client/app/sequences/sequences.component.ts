import { Component, OnInit } from '@angular/core';
import {Sequence} from '../shared/models/sequence.model';
import {SequenceService} from '../services/sequence.service';
import {ToastComponent} from '../shared/toast/toast.component';

@Component({
  selector: 'app-sequences',
  templateUrl: './sequences.component.html',
  styleUrls: ['./sequences.component.scss']
})
export class SequencesComponent implements OnInit {

    sequence = new Sequence();
    sequences: Sequence[] = [];
    isLoading = true;
    isEditing = false;

    constructor(private sequenceService: SequenceService,
                public toast: ToastComponent) { }

    ngOnInit() {
        this.getSequences();
    }

    getSequences() {
        this.sequenceService.getSequences().subscribe(
            data => this.sequences = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    enableEditing(sequence: Sequence) {
        this.isEditing = true;
        this.sequence = sequence;
    }

    cancelEditing() {
        this.isEditing = false;
        this.sequence = new Sequence();
        this.toast.setMessage('item editing cancelled.', 'warning');
        // reload the sequences to reset the editing
        this.getSequences();
    }

    editSequence(sequence: Sequence) {
        this.sequenceService.editSequence(sequence).subscribe(
            () => {
                this.isEditing = false;
                this.sequence = sequence;
                this.toast.setMessage('item edited successfully.', 'success');
            },
            error => console.log(error)
        );
    }

    deleteSequence(sequence: Sequence) {
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            this.sequenceService.deleteSequence(sequence).subscribe(
                () => {
                    this.sequences = this.sequences.filter(elem => elem._id !== sequence._id);
                    this.toast.setMessage('item deleted successfully.', 'success');
                },
                error => console.log(error)
            );
        }
    }

}
