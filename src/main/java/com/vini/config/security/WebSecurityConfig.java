package com.vini.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
			
	@Autowired
	private AuthProvider authProvider;
	
	@Autowired
    private AuthEntryPoint authEntryPoint;
		
	@Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider);
    }
		
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	http
    		.httpBasic()
    		.and()
        		.authorizeRequests()
    				.antMatchers("/", "/resources/**", "/dist/**", "/signin", "/register").permitAll()
    				.anyRequest().hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
    		.and()
            	.csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            	.logout()
            		.clearAuthentication(true)
            		.invalidateHttpSession(true)
            		.logoutSuccessUrl("/")
            .and()
            	.exceptionHandling()
        			.authenticationEntryPoint(authEntryPoint);
    }
            
}