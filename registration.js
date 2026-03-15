<!DOCTYPE html>
<html lang="en">
  <head>
   <meta charset="UTF-8">
  <title>Black Cup - Customer Registration</title>
<link rel="stylesheet" href="registration.css">

</head>
 <body>
  <div class="form-container">
     <h1>BLACK CUP</h1>
     <h2>Customer Registration</h2>
  <form>
     <div class="form-group">
        <label>Full Name</label>
        <input type="text" placeholder="Enter your full name" required>
     </div>

     <div class="form-group">
        <label>Email</label>
        <input type="email" placeholder="Enter your email" required>
     </div>

     <div class="form-group">
        <label>Phone Number</label>
        <input type="tel" placeholder="Enter your phone number" required>
     </div>

     <div class="form-group">
        <label>Address</label>
        <textarea placeholder="Enter your address"></textarea>
     </div>

     <div class="form-group">
         <label>Password</label>
         <input type="password" placeholder="Create a password" required>
     </div>

      <div class="form-group">
         <label>Confirm Password</label>
         <input type="password" placeholder="Confirm your password" required>
      </div>

     <button type="submit">Register</button>
    </form>
   </div>
  </body>
 </html>
