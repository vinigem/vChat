import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'modal',
    templateUrl:  './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

    show: boolean;
    confirmationDialog: boolean;
    title: string;
    message: string;

    private modalSubscription: any;

    constructor(private modalService: ModalService) { }

    ngOnInit() {
        this.modalSubscription = this.modalService.showDialog()
            .subscribe(data => {
                this.show = true;
                this.title = data.title;
                this.message = data.message;
                this.confirmationDialog = data.confirmationDialog;
            });
    }

    handleCancel(): void {
        this.show = false;
        this.modalService.addConfirmation(false);
    }

    handleOK(): void {
        this.show = false;
        this.modalService.addConfirmation(true);
    }


    ngOnDestroy() {
        this.modalSubscription.unsubscribe();
    }

}
