import {Component, EventEmitter, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions} from 'ngx-uploader';
import SequenceConfigs from '../../../../server/configurations/sequence';

@Component({
    selector: 'app-germline',
    templateUrl: './germline.component.html',
    styleUrls: ['./germline.component.scss']
})
export class GermlineComponent implements OnInit {
    @ViewChild('germlineEditModal') private datasetEditModal: TemplateRef<any>;

    tableSettings = {
        actions: {
            edit: false,
            delete: false,
            add: false,
            custom: [{
                name: 'details',
                title: '<i class="fa fa-search" title="Details"></i> Details &nbsp;'
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
            dateCreated: {
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
    germlines = [{
        _id: 'asdfjkh234579235bn',
        name: 'Germline A',
        dateCreated: '20/07/2020',
        vgenes: 20,
        dgenes: 15,
        jgenes: 9,
        privacy: 'Public'
    },
        {
            _id: 'asdfjkh234579235bn',
            name: 'Germline B',
            dateCreated: '21/07/2020',
            vgenes: 22,
            dgenes: 17,
            jgenes: 11,
            privacy: 'Private'
        }];

    newGermline;

    options: UploaderOptions;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes;
    dragOver: boolean;


    constructor(private router: Router, private modalService: NgbModal) {
        this.options = {concurrency: 1, maxUploads: 1, maxFileSize: SequenceConfigs.maxFileSize};
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
    }

    ngOnInit(): void {
        this.resetNewGermlineObject();
    }

    resetNewGermlineObject(): void {
        this.newGermline = {
            name: '',
            privacy: ''
        };
    }

    tableEvent($event) {
        console.log($event);
        if ($event.action === 'details') {
            this.router.navigate(['/germlines', $event.data._id, 'vgenes']);
        }
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

        }, (reason) => {
            console.log('modal closed');
        });
    }

}
