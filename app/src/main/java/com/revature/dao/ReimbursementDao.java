package com.revature.dao;

import com.revature.models.Reimbursement;
import com.revature.models.User;
import com.revature.utils.ConnectionSingleton;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ReimbursementDao implements IReimbursementDao{

    public ConnectionSingleton cs = ConnectionSingleton.getConnectionSingleton();
    Connection c = cs.getConnection();

    @Override
    public Reimbursement createReimbursement(Reimbursement reimbursement) {

        String sql = "INSERT INTO reimbursement (amount, submitted_date, resolved_date, description, "+
                     "reimbursement_author, reimbursement_resolver, reimbursement_status, reimbursement_type) values (?,?,?,?,?,?,?,?)";
        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setDouble(1, reimbursement.getAmount());
            ps.setDate(2, reimbursement.getSubmittedDate());
            ps.setDate(3, reimbursement.getResolvedDate());
            ps.setString(4, reimbursement.getDescription());
            ps.setInt(5, reimbursement.getReimbursementAuthor());
            ps.setInt(6, reimbursement.getReimbursementResolver());
            ps.setInt(7, reimbursement.getReimbursementStatus());
            ps.setInt(8, reimbursement.getReimbursementType());
            ps.execute();
        }catch(SQLException e){
            e.printStackTrace();
        }
        return reimbursement;
    }

    @Override
    public Reimbursement viewReimbursement(int id) {

        String sql = "select * from reimbursement where reimbursement_id = ?";
        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            Reimbursement reimbursement = new Reimbursement();
            while (rs.next()) {
                // int id = rs.getInt("reimbursement_id");
                // BigDecimal amt = rs.getBigDecimal("amount");
                // Date subDate
                reimbursement = new Reimbursement(rs.getInt(1), rs.getDouble(2), rs.getDate(3), rs.getDate(4), rs.getString(5), rs.getInt(6), rs.getInt(7), rs.getInt(8), rs.getInt(9));
            }
            return reimbursement;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void updateReimbursement(Reimbursement reimbursement) {
        String sql = "update reimbursement set amount = ?, submitted_date = ?, resolved_date = ?, description = ?, reimbursement_author = ?, "+
                    "reimbursement_resolver = ?, reimbursement_status = ?, reimbursement_type = ? where reimbursement_id = ?";
        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setDouble(1, reimbursement.getAmount());
            ps.setDate(2, reimbursement.getSubmittedDate());
            ps.setDate(3, reimbursement.getResolvedDate());
            ps.setString(4, reimbursement.getDescription());
            ps.setInt(5, reimbursement.getReimbursementAuthor());
            ps.setInt(6, reimbursement.getReimbursementResolver());
            ps.setInt(7, reimbursement.getReimbursementStatus());
            ps.setInt(8, reimbursement.getReimbursementType());
            ps.setInt(9, reimbursement.getReimbursementId());
            ps.execute();
        }catch(SQLException e){
            e.printStackTrace();
        }

    }

    @Override
    public void deleteReimbursement(int id) {
        String sql = "delete from reimbursement where reimbursement_id = ?";

        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, id);
            ps.execute();
        }catch(SQLException e){
            e.printStackTrace();
        }
    }

    @Override
    public List<Reimbursement> viewReimbursementsByUser(User u) {
        String sql = "select * from reimbursements where reimbursement_author = ?";
        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setInt(1, u.getUserId());
            ResultSet rs = ps.executeQuery();
            List<Reimbursement> rlist = new ArrayList<>();
            while(rs.next()) {
                rlist.add(new Reimbursement(rs.getInt(1), rs.getDouble(2), rs.getDate(3), rs.getDate(4), rs.getString(5), rs.getInt(6), rs.getInt(7), rs.getInt(8), rs.getInt(9)));

            }
            return rlist;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Reimbursement> viewAllReimbursements() {
        String sql = "select * from reimbursements";
        try{
            PreparedStatement ps = c.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            List<Reimbursement> rlist = new ArrayList<>();
            while(rs.next()) {
                rlist.add(new Reimbursement(rs.getInt(1), rs.getDouble(2), rs.getDate(3), rs.getDate(4), rs.getString(5), rs.getInt(6), rs.getInt(7), rs.getInt(8), rs.getInt(9)));

            }
            return rlist;
        }catch(SQLException e){
            e.printStackTrace();
            return null;
        }

    }
}
