package com.vini.config.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class AuthProvider implements AuthenticationProvider {

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		List<GrantedAuthority> grantedAuths = null;
		Authentication authToken = null;

		if(null != authentication){
			grantedAuths = new ArrayList<GrantedAuthority>();
			String userName = authentication.getName();
			String password = (String) authentication.getCredentials();

			if(userName.equals("user")  && password.equals("passw0rd")) {
				grantedAuths.add(new SimpleGrantedAuthority("ROLE_USER"));
				authToken = new UsernamePasswordAuthenticationToken(userName, password, grantedAuths);

			}else if(userName.equals("admin")  && password.equals("passw0rd")){
				grantedAuths.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
				authToken = new UsernamePasswordAuthenticationToken(userName, password, grantedAuths);
			}
		}
		return authToken;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
	}

}
