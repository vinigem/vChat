package com.vini.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class TextMessageHandler extends TextWebSocketHandler  {
	
	public List<WebSocketSession> sessions = new ArrayList<WebSocketSession>();
	
			
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("TextMessageHandler.afterConnectionEstablished()");
		sessions.add(session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("TextMessageHandler.afterConnectionClosed()");
		sessions.remove(session);
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Received:" + message.getPayload());
	}

	public void sendMessage(String fromUserName, String toUserName, String message) throws IOException {
		for(WebSocketSession session: sessions){
			if(session.getPrincipal().getName().equals(toUserName)){
				session.sendMessage(new TextMessage("{\"from\": \"" + fromUserName + "\", \"message\": \"" + message + "\"}"));
			}
		}		
	}

}
