import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DatasetService} from '../../services/datasets.service';
import {Router} from '@angular/router';
import {ToastComponent} from '../../shared/toast/toast.component';

@Component({
    selector: 'app-dataset',
    templateUrl: './dataset.component.html',
    styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {
    @ViewChild('datasetEditModal') private datasetEditModal: TemplateRef<any>;

    tableSettings = {
        actions: {
            edit: false,
            delete: false,
            add: false,
            custom: [
                {
                    name: 'details',
                    title: '<i class="fa fa-search" title="Details"></i> Details &nbsp;'
                },
                {
                    name: 'rename',
                    title: '<i class="fa fa-edit" title="Rename"></i> Rename &nbsp;'
                },
                {
                    name: 'delete',
                    title: '<i class="fa fa-times" title="Delete"></i> Delete'
                },
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
            description: {
                title: 'Description'
            },
            createdDate: {
                title: 'Created on'
            },
            files: {
                title: 'Files',
                filter: false
            },
            sequences: {
                title: 'Sequences',
                filter: false
            },
            annotations: {
                title: 'Annotations',
                filter: false
            }
        }
    };
    datasets = [];
    newDataset;

    constructor(private modalService: NgbModal, private datasetService: DatasetService, private router: Router, public toast: ToastComponent) {
        this.resetNewDatasetObject();
    }

    ngOnInit(): void {
        this.getDatasets();
    }

    getDatasets(): void {
        this.datasetService.getDatasetsCondensed().subscribe(
            data => {
                this.datasets = data;
            },
            error1 => {
                console.log(error1);
            }
        );
    }

    resetNewDatasetObject(): void {
        this.newDataset = {
            name: '',
            description: ''
        };
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            console.log(this.newDataset);
            if (!!this.newDataset._id) {
                this.datasetService.editDataset(this.newDataset).subscribe(
                    data => {
                        console.log(data);
                        this.toast.setMessage('Dataset changes saved', 'success');
                        this.resetNewDatasetObject();
                        this.getDatasets();
                    },
                    error1 => {
                        console.log(error1);
                        this.resetNewDatasetObject();
                    }
                );
            } else {
                this.datasetService.addDataset(this.newDataset).subscribe(
                    data => {
                        console.log(data);
                        this.toast.setMessage('Dataset created', 'success');
                        this.resetNewDatasetObject();
                        this.router.navigate(['/datasets', data._id]);
                    },
                    error1 => {
                        console.log(error1);
                        this.resetNewDatasetObject();
                    }
                );
            }
        }, (reason) => {
            console.log('modal closed');
            this.resetNewDatasetObject();
        });
    }

    tableEvent($event) {
        console.log($event);
        if ($event.action === 'details') {
            this.router.navigate(['/datasets', $event.data._id]);
        }
        if ($event.action === 'rename') {
            this.newDataset = $event.data;
            this.open(this.datasetEditModal);
        }
        if ($event.action === 'delete') {
            if (confirm('Are you sure you want to delete dataset ' + $event.data.name + '?')) {
                this.datasetService.deleteDataset($event.data).subscribe(data => {
                        console.log(data);
                        this.toast.setMessage('Dataset deleted', 'success');
                        this.resetNewDatasetObject();
                        this.getDatasets();
                    },
                    error1 => {
                        console.log(error1);
                        this.resetNewDatasetObject();
                        this.toast.setMessage(error1.toString(), 'success');
                    });
            }
        }
    }

}
