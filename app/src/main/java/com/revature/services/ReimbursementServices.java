package com.revature.services;

import com.revature.dao.IReimbursementDao;
import com.revature.models.Reimbursement;
import com.revature.models.User;

import java.util.List;

public class ReimbursementServices {
    private IReimbursementDao reimbursementDao;

    public ReimbursementServices(IReimbursementDao reimbursementDao) {
        this.reimbursementDao = reimbursementDao;
    }

    // add reimbursement request
    public Reimbursement addReimbursement(Reimbursement reimbursement){
        return reimbursementDao.createReimbursement(reimbursement);
    }

    // view reimbursement request
    public Reimbursement viewReimbursement(int reimbursementId){
        return reimbursementDao.viewReimbursement(reimbursementId);
    }

    // update reimbursement request
    public void updateReimbursement(Reimbursement reimbursement){
        reimbursementDao.updateReimbursement(reimbursement);
    }

    // delete reimbursement request
    public void deleteReimbursement(int reimbursementId){
        reimbursementDao.deleteReimbursement(reimbursementId);
    }

    public List<Reimbursement> showReimbursementsByUser(User u){return reimbursementDao.viewReimbursementsByUser(u); }

    public List<Reimbursement> showAllReimbursements(){return reimbursementDao.viewAllReimbursements();}

}
