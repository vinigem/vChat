package com.vini.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vini.dto.User;
import com.vini.repository.UserRepository;

@Service
public class UserService implements IUserService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private UserRepository userRepository;

	/**
	 * save user
	 * @param user the user dto
	 */
	@Override
	public boolean saveUser(User user) {
		com.vini.entities.User newUser = new com.vini.entities.User();
		BeanUtils.copyProperties(user, newUser);
		newUser.setRole("USER");
		
		boolean saveStatus = false;
		
		try{
			userRepository.save(newUser);
			saveStatus = true;
		}catch (Exception e) {
			LOGGER.error("Error while saving User. {}", e);
		}
		return saveStatus;
	}

}