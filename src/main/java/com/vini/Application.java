package com.vini;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.vini.repository.UserRepository;
import com.vini.entities.User;

@SpringBootApplication
@EnableAutoConfiguration
@Controller
public class Application {
	
	@Autowired
	private UserRepository userRepository;
	
	public static void main(final String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
	/**
	 * Method to handle root request and return the landing page's view name
	 * @return index
	 */
	@RequestMapping(value={"/"} , method = RequestMethod.GET) 
	public String index(){
		
		initUsers();
		
		return "index";
	}


	private void initUsers() {
		userRepository.deleteAll();
		userRepository.save(new User("user", "user@test.com", "passw0rd", "USER"));
		userRepository.save(new User("admin", "admin@test.com", "passw0rd", "ADMIN"));
	}

}
