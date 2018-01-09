import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {

    private confirm = new Subject<boolean>();
    private show = new Subject<any>();

    constructor() { }

    showDialog(): Observable<any> {
        return this.show.asObservable();
    }

    showModal(message: string, title: string, confirmation: boolean): boolean | Observable<boolean> {
        this.show.next({
            message: message,
            title: title,
            confirmationDialog: confirmation
        });
        return confirmation ? this.confirm.asObservable() : false;
    }

    addConfirmation(confirm?: boolean): void {
        this.confirm.next(confirm);
    }

}
