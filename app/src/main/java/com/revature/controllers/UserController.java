package com.revature.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.services.UserServices;
import com.revature.models.*;
import io.javalin.http.Handler;
import javax.servlet.http.HttpSession;
import java.util.List;

public class UserController {
    private UserServices us;
    private ObjectMapper om;

    public UserController(UserServices us) {
        this.us = us;
        om = new ObjectMapper();
    }

    // handle user login
    public Handler handleUserLogin = (ctx) ->{
        LoginObject lo = om.readValue(ctx.body(), LoginObject.class);
        User loggedInUser = us.login(lo.username, lo.password);

        if(loggedInUser == null){
            ctx.status(403);
            ctx.result("Login Invalid!");
        }
        else{
            HttpSession session = ctx.req.getSession();
            session.setAttribute("loginName", loggedInUser.getUserName());
            if(loggedInUser.getRole() == 1){
                session.setAttribute("user", "Employee");
            }
            else{
                session.setAttribute("user", "Manager");
            }
            ctx.result(om.writeValueAsString(loggedInUser));
        }
    };

    public Handler handleUserLogout = (ctx) ->{
      ctx.req.getSession().invalidate();
      ctx.result("User Logged Out");
    };

    // handle add user
    public Handler handleUserRegistration = (ctx) ->{
        User user = om.readValue(ctx.body(), User.class);
        User result = us.createUser(user);
        ctx.status(201);
        ctx.result(result.toString());
    };

    //  handle view users
    public Handler handleViewUserById = (ctx)  ->{
        if(ctx.req.getSession().getAttribute("user") != "Manager") {
            ctx.status(401);
            ctx.result("You must be logged in as a manager to view user by id");
        }else {
            int id = Integer.parseInt(ctx.pathParam("id"));
            ctx.result(us.viewUser(id).toString());
        }
    };

    // handle update users
    public Handler handleUpdateUser = (ctx) ->{
        User user = om.readValue(ctx.body(), User.class);
        if (user.getUserName() == ctx.req.getSession().getAttribute("loginName") ||
             ctx.req.getSession().getAttribute("user") == "Manager"){
            us.updateUser(user);
            ctx.result("User updated.");
        }else{
            ctx.status(403);
            ctx.result("You must be a manager or updating yourself to continue");
        }

    };

    // handle delete users
    public Handler handleDeleteUser= (ctx)->{
        if(ctx.req.getSession().getAttribute("user") != "Manager") {
            ctx.status(401);
            ctx.result("You must be logged in as a manager to delete user");
        }else {
            int id = Integer.parseInt(ctx.pathParam("id"));
            us.deleteUser(id);
            //ctx.result("User deleted.");
            ctx.result(String.valueOf(id));
        }
    };

    public Handler handleViewAllUsers = (ctx) -> {
        if(ctx.req.getSession().getAttribute("user") != "Manager"){
            ctx.status(401);
            ctx.result("You must be logged in as a manager to view all users");
        }else{
            List<User> ulist = us.viewAllUsers();
            ctx.result(ulist.toString());
        }
    };
}
