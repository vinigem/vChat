package com.vini.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
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
	
		
	@RequestMapping(value="/signin", method = RequestMethod.POST)
	public @ResponseBody boolean signin(HttpSession session, Authentication authentication){
		boolean isAuthenticated = null != authentication && authentication.isAuthenticated();
		
		if(isAuthenticated){
			setSessionAttributes(session, authentication);
		}
		return isAuthenticated;
	}
	
	@RequestMapping(value="/signup", method = RequestMethod.POST)
	public @ResponseBody boolean signup(@RequestBody User user){
		LOGGER.info("User details for sign up: {}", user);
		return userService.saveUser(user);
	}
		
	@SuppressWarnings("unchecked")
	private void setSessionAttributes(HttpSession session, Authentication authentication) {
		session.setMaxInactiveInterval(1800);
		session.setAttribute("username", authentication.getName());
		List<GrantedAuthority> grantedAuths = (List<GrantedAuthority>) authentication.getAuthorities();
		session.setAttribute("role", grantedAuths.get(0).getAuthority());
	}

}
