import { Component, OnInit } from '@angular/core';

import { ChatService } from '../chat/chat.service';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(private chatService: ChatService) { }
    
    ngOnInit() {
        this.chatService.sendMessage("Welcome User", "user");    
    }

}
