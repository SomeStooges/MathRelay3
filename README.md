# MathRelay3
Create a program to facilitate the McNeil math honor society annual math relay competition.
The goal of the project is to automate the math relay competition in order to increase grading accuracy and responsiveness, thus creating a faster, more competitive, environment.

STRUCTURE AND BASIC FUNCTIONS
index.php
  -Acts as a general welcome page
  -Links to admin_login.php (for admins) and user_login (for non-admin users).

user_login.php
  -Acts as the login portal for users
  -Links to answer_sheet.php
  -Linked from index.php
  
answer_sheet.php
  -Allows users to enter a nickname, answer questions, and view their answer history.
  -Links to finish_page.php
  -Linked from user_login.php
  
finish_page.php
  -Tells users what their final rank was and closing instructions.
  -Linked from answer_sheet.php

admin_login.php
  -Acts as the login portal for administrators
  -Links to control_panel.php
  -Linked from from index.php
  
control_panel.php
  -Allows admins to control events, view team data, make manual changes, and view statistics.
  -Links to leaderboard.php
  -Linked from admin_login.php

leaderboard.php
  -Provides a leaderboard for the admins to display/
  -Linked from control_panel.php
  

