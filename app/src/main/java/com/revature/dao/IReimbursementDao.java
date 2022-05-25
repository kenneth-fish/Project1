package com.revature.dao;

import com.revature.models.*;

import java.util.List;

public interface IReimbursementDao{
    public Reimbursement createReimbursement(Reimbursement reimbursement);
    public Reimbursement viewReimbursement(int id);
    public void updateReimbursement(Reimbursement reimbursement);
    public void deleteReimbursement(int id);
    public List<Reimbursement> viewReimbursementsByUser(User u);
    public List<Reimbursement> viewAllReimbursements();
}