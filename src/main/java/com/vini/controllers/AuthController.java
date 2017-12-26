package com.vini.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.vini.dto.User;
import com.vini.services.IUserService;

/**
 * Controller to handle Authentication related requests
 * @author kumarv19
 *
 */
@RestController
public class AuthController {
	
	@Autowired
	private IUserService userService;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);
	
	/**
	 * method to sign in user	
	 * @param authentication the authentication object
	 * @return isAuthenticated
	 */
	@RequestMapping(value="/signin", method = RequestMethod.POST)
	public @ResponseBody boolean signin(Authentication authentication){
		LOGGER.info("Authentication object: {}", authentication);
		return null != authentication && authentication.isAuthenticated();
	}
	
	/**
	 * method to sign up/save user
	 * @param user the user dto
	 * @return status
	 */
	@RequestMapping(value="/signup", method = RequestMethod.POST)
	public @ResponseBody boolean signup(@RequestBody User user){
		LOGGER.info("User details for sign up: {}", user);
		return userService.saveUser(user);
	}
	

}
