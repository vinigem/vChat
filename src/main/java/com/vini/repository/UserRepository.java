package com.vini.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.vini.entities.User;

public interface UserRepository extends MongoRepository<User, String> {
	
	User findByUsername(String username);
	
}
