package com.springbootrest.SpringBootRest.service;

import com.springbootrest.SpringBootRest.repo.UserRepo;
import com.springbootrest.SpringBootRest.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo repo;

    public User saveUser(User user) {
        return repo.save(user) ;

    }
}
