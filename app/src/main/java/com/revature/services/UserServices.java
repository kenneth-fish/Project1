package com.revature.services;

import com.revature.dao.IUserDao;
import com.revature.models.User;

import java.util.List;

public class UserServices {
    private IUserDao userDao;
    public UserServices(IUserDao userDao){
        this.userDao = userDao;
    }

    // user login
    public User login(String username, String password){
        User u = userDao.viewUserByUserName(username);
        if((u != null) && (password.equalsIgnoreCase(u.getPassword()))){
                return u;
        }
        else{
            return null;
        }
    }

    // add user
    public User createUser(User user){
        return userDao.createUser(user);
    }

    // view user
    public User viewUser(int userId){
        return userDao.viewUser(userId);
    }

    // update user
    public void updateUser(User user){
        userDao.updateUser(user);
    }

    // delete user
    public void deleteUser(int userId){
        userDao.deleteUser(userId);
    }

    public List<User> viewAllUsers(){ return userDao.viewAllUsers(); }

}
