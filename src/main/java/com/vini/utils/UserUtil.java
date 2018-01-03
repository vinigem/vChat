package com.vini.utils;

import org.springframework.beans.BeanUtils;

import com.vini.entities.User;

public class UserUtil {
	
	public static User convertToUserEntity(com.vini.dto.User user){
		User userEntity = new User();
		BeanUtils.copyProperties(user, userEntity);
		return userEntity;
	}

}
