package mypackage;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
                          throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        // Admin fixed login
        if(username.equals("admin") && password.equals("123")){
            response.sendRedirect("admin.html");
        } 
        // Check customer from registered users
        else if(RegisterServlet.users.containsKey(username) &&
                RegisterServlet.users.get(username).equals(password)){
            response.sendRedirect("customer.html");
        }
        else {
            response.getWriter().println("Invalid login! <a href='index.html'>Try again</a>");
        }
    }
}