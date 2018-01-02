import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {
        
    msgType: number;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.msgType = params['type'];
        });
    }
    
}
