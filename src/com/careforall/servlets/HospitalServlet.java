package com.careforall.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/hospitals")
public class HospitalServlet extends HttpServlet {

    // Replace with your MySQL credentials
  private static final String DB_URL = "jdbc:mysql://mysql-38e99add-karalgeetansh-7f76.l.aivencloud.com:27407/defaultdb?sslMode=REQUIRED";
private static final String DB_USER = "avnadmin"; 
private static final String DB_PASS = "AVNS_o21VSMbiNtCzVCKYD6V"; // Paste your actual revealed password here

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);
            // Corrected syntax (removed 'sql:' which was causing an error)
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM hospitals");
            ResultSet rs = stmt.executeQuery();

            // Add this line to test if the code actually reaches this point
            System.out.println("DEBUG: Query executed successfully. Now processing data...");

            // Manual JSON construction for zero-dependency simplicity.
            // In production, use Google Gson: String json = new
            // Gson().toJson(hospitalList);
            StringBuilder json = new StringBuilder("[");
            while (rs.next()) {
                json.append("{");
                json.append("\"id\":").append(rs.getInt("id")).append(",");
                json.append("\"name\":\"").append(rs.getString("name")).append("\",");
                json.append("\"address\":\"").append(rs.getString("address")).append("\",");
                json.append("\"lat\":").append(rs.getDouble("latitude")).append(",");
                json.append("\"lng\":").append(rs.getDouble("longitude")).append(",");
                json.append("\"phone\":\"").append(rs.getString("phone")).append("\",");
                json.append("\"specialties\":\"").append(rs.getString("specialties")).append("\"");
                json.append("}");
                if (!rs.isLast())
                    json.append(",");
            }
            json.append("]");

            out.print(json.toString());

            rs.close();
            stmt.close();
            conn.close();
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}
