package mypackage;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.util.HashMap;

@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {

    // Store customer username/password in memory (simple version)
    public static HashMap<String, String> users = new HashMap<>();

    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
                          throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if(users.containsKey(username) || username.equals("admin")){
            response.getWriter().println("Username already exists! Try again.");
        } else {
            users.put(username, password);
            response.getWriter().println("Registration successful! <a href='index.html'>Login here</a>");
        }
    }
}