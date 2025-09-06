package com.springbootrest.SpringBootRest;


import com.springbootrest.SpringBootRest.model.User;
import com.springbootrest.SpringBootRest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @PostMapping("register")
    public User register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("user encrypted password = " + user.getPassword());
        return service.saveUser(user);
    }
}
