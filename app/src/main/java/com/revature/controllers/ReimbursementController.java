package com.revature.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.services.ReimbursementServices;
import com.revature.models.*;
import io.javalin.http.Handler;

import java.util.List;

public class ReimbursementController {
    private ReimbursementServices rs;
    private ObjectMapper om;

    public ReimbursementController(ReimbursementServices rs) {
        this.rs = rs;
        om = new ObjectMapper();
    }

    // handle add reimbursement
    public Handler handleAddReimbursement = (ctx) ->{
        if(ctx.req.getSession().getAttribute("loginName") == null){
            ctx.status(401);
            ctx.result("You must be logged in to add reimbursement");
        }
        else{
            Reimbursement reimb = om.readValue(ctx.body(), Reimbursement.class);
            Reimbursement result = rs.addReimbursement(reimb);
            ctx.status(201);
            ctx.result(result.toString());
        }
    };

    //  handle view reimbursement
    public Handler handleViewReimbursement = (ctx)  ->{
        if(ctx.req.getSession().getAttribute("loginName") == null){
            ctx.status(401);
            ctx.result("You must be logged in to view reimbursement");
        }
        else {
            int id = Integer.parseInt(ctx.pathParam("id"));
            Reimbursement riem = rs.viewReimbursement(id);
            ctx.result(riem.toString());
        }
    };

    // handle update reimbursement
    public Handler handleUpdateReimbursement = (ctx) ->{
        if(ctx.req.getSession().getAttribute("user") != "Manager"){
            ctx.status(401);
            ctx.result("You must be logged in as a manager to update reimbursements");
        }
        else {
            Reimbursement reimb = om.readValue(ctx.body(), Reimbursement.class);
            rs.updateReimbursement(reimb);
            ctx.result("Reimbursement updated.");
        }
    };

    // handle delete reimbursement
    public Handler handleDeleteReimbursement= (ctx)->{
        if(ctx.req.getSession().getAttribute("user") != "Manager"){
            ctx.status(401);
            ctx.result("You must be logged in as a manager to delete reimbursement");
        }
        else {
            int id = Integer.parseInt(ctx.pathParam("id"));
            rs.deleteReimbursement(id);
            //ctx.result("Reimbursement deleted.");
            ctx.result(String.valueOf(id));
        }
    };

    public Handler handleViewReimbursementsByUser = (ctx) -> {
        User user = om.readValue(ctx.body(), User.class);
        if (user.getUserName() == ctx.req.getSession().getAttribute("loginName") ||
                ctx.req.getSession().getAttribute("user") == "Manager"){
            List<Reimbursement> rList = rs.showAllReimbursements();
            ctx.result(rList.toString());
        }else{
            ctx.status(401);
            ctx.result("You must be logged in as a manager or the correct user to view reimbursements");
        }
    };

    public Handler handleViewAllReimbursements = (ctx) -> {
        if(ctx.req.getSession().getAttribute("user") != "Manager"){
            ctx.status(401);
            ctx.result("You must be logged in as a manager to show all reimbursements");
        }else{
            List<Reimbursement> rList = rs.showAllReimbursements();
            ctx.result(rList.toString());
        }
    };
}
