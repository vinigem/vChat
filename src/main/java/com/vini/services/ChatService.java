package com.vini.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vini.config.TextMessageHandler;

@Service
public class ChatService implements IChatService {

	@Autowired
	private TextMessageHandler messageHandler; 
	
	@Override
	public void sendMessage(String fromUserName, String toUserName, String message) {
		try {
			messageHandler.sendMessage(fromUserName, toUserName, message);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
