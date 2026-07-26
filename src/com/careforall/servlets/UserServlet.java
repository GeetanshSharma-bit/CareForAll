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

@WebServlet("/api/users")
public class UserServlet extends HttpServlet {

   String dbUrl = System.getenv("DB_URL");
   String dbUser = System.getenv("DB_USER");
   String dbPassword = System.getenv("DB_PASSWORD");

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
           Connection conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            
            // Checking if the user exists in the database
            String sql = "SELECT * FROM users WHERE email = ? AND password_hash = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, email);
            
            // IMPORTANT: In a real app, passwords must be hashed (e.g., BCrypt). 
            // This is a simplified direct check for learning purposes.
            stmt.setString(2, password); 
            
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                // Login Success
                out.println("<h3>Login Successful! Welcome " + rs.getString("name") + "</h3>");
                out.println("<a href='../hospitals.html'>Go to Hospitals</a>");
            } else {
                // Login Failed
                out.println("<h3>Invalid Email or Password.</h3>");
                out.println("<a href='../login.html'>Try Again</a>");
            }
            
            rs.close();
            stmt.close();
            conn.close();
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.println("Error: " + e.getMessage());
        }
    }
}