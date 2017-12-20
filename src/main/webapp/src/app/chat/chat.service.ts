import { Injectable } from '@angular/core';


@Injectable()
export class ChatService {

    private webSocket: WebSocket;

    constructor() {
        let webSocketUrl = 'ws://' + window.location.host + '/chat'; 
        this.webSocket = new WebSocket(webSocketUrl);
        this.webSocket.onmessage = this.onMessage;
        this.webSocket.onclose = this.onClose;
    }

    sendMessage(message: string, toUser: string, fromUser?: string) {
        if (this.webSocket.readyState === this.webSocket.CONNECTING) {
            setTimeout(() => {
                this.sendMessage(message, toUser, fromUser);
            }, 500)
        } else if(this.webSocket.readyState === this.webSocket.OPEN) {
            if (message && message !== "") {
                this.webSocket.send(message);
            }
        }
    }

    onMessage(message: any) {
        console.log("Message received", message);
    }

    onClose(message: any) {
        console.log("WebSocket connection closed");
    }

}