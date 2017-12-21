package com.vini;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@SpringBootApplication
@EnableAutoConfiguration
@Controller
public class Application {
	
	public static void main(final String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
	/**
	 * Method to handle root request and return the landing page's view name
	 * @return index
	 */
	@RequestMapping(value={"/"} , method = RequestMethod.GET) 
	public String index(){
		return "index";
	}

}
