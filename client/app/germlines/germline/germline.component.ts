import {Component, EventEmitter, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions} from 'ngx-uploader';
import SequenceConfigs from '../../../../server/configurations/sequence';
import {GermlinesService} from '../../services/germlines.service';
import {ToastComponent} from '../../shared/toast/toast.component';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-germline',
    templateUrl: './germline.component.html',
    styleUrls: ['./germline.component.scss']
})
export class GermlineComponent implements OnInit {
    @ViewChild('germlineEditModal') private germlineEditModal: TemplateRef<any>;

    tableSettings = {
        actions: {
            edit: false,
            delete: false,
            add: false,
            custom: [{
                name: 'details',
                title: '<i class="fa fa-eye" title="View"></i> View &nbsp;'
            }, {
                name: 'edit',
                title: '<i class="fa fa-pencil" title="Edit"></i> Edit &nbsp;'
            }, {
                name: 'delete',
                title: '<i class="fa fa-remove" title="Delete"></i> Delete &nbsp;'
            }],
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
            createdDate: {
                title: 'Date'
            },
            vgenes: {
                title: 'V Genes',
            },
            dgenes: {
                title: 'D Genes',
            },
            jgenes: {
                title: 'J Genes',
            },
            privacy: {
                title: 'Visibility'
            }
        }
    };
    germlines;

    newGermline;

    options: UploaderOptions;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes;
    dragOver: boolean;


    constructor(private router: Router, private modalService: NgbModal, private germlineService: GermlinesService, public toast: ToastComponent, private authService: AuthService) {
        this.options = {concurrency: 1, maxUploads: 1, maxFileSize: SequenceConfigs.maxFileSize};
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
    }

    ngOnInit(): void {
        this.resetNewGermlineObject();
        this.getGermlines();
    }

    resetNewGermlineObject(): void {
        this.newGermline = {
            name: null,
            privacy: null,
            organism: null
        };
    }

    tableEvent($event) {
        console.log($event);

        if ($event.action === 'details') {
            this.router.navigate(['/germlines', $event.data._id, 'vgenes']);
        }
        if ($event.action === 'edit') {
            if (!!this.authService.currentUser && this.authService.currentUser._id === $event.data.owner) {
                this.newGermline = $event.data;
                this.modalService.open(this.germlineEditModal).result.then((result) => {
                    console.log(this.newGermline);
                    this.saveOrEditGermline();

                }, (reason) => {
                    console.log(reason);
                });
            } else {
                this.toast.setMessage('You can not edit germlines which don\'t belong to you', 'danger');
            }

        }
        if ($event.action === 'delete') {

        }
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            console.log(this.newGermline);
            this.saveOrEditGermline();

        }, (reason) => {
            console.log('modal closed');
        });
    }


    getGermlines(): void {
        this.germlineService.getGermlines().subscribe(
            data => {
                console.log(data);
                this.germlines = data;
            },
            error1 => {
                console.log(error1);
            }
        );
    }

    saveOrEditGermline(): void {
        if (!!this.newGermline._id) {
            // is editing an existing germline
            this.germlineService.editGermline(this.newGermline).subscribe(
                data => {
                    this.toast.setMessage('Germline successfully edited.', 'success');
                    this.getGermlines();

                },
                error1 => {
                    console.log(error1);
                    this.toast.setMessage('An error occurred. ' + error1.error.error, 'danger');
                }
            );
        } else {
            // save a new germline
            this.germlineService.addGermline(this.newGermline).subscribe(
                data => {
                    console.log(data);
                    this.toast.setMessage('New germline created', 'success');
                    this.getGermlines();
                },
                error1 => {
                    console.log(error1);
                    this.toast.setMessage('An error occurred. ' + error1.error.error, 'danger');
                }
            );
        }
    }

}
