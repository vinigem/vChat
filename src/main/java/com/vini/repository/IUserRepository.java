package com.vini.repository;

import com.vini.entities.User;

public interface IUserRepository {
	
	User findByUsername(String username);

	void saveUser(User newUser);
	
}
