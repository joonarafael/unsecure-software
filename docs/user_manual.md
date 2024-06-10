# USER MANUAL

This document details the correct intended use of the web application. If you are looking for the guide on how to get this web application running on your own local machine, please consult [this document](./installation_manual.md "Installation Manual"). If you are looking for the information and instructions on how to perform attacks against the unsecure system, please check [this document](./security_issues.md "Security Issues").

## Index

Index page is the landing page for the application. It contains a brief introduction to the application, a button to open the database control panel (not really a part of the application proper), and a button to navigate to the login page.

## DB Control Panel

This is not really a part of the application. As I did not build real registration functionality, I've included controls to populate and manage the database. This is behind the button "_Let's do it_" on the index page or route `/populate`.

**Do not consider this as a part of the application. It is only there to help you populate the database with some default users** (and later switch to hashed passwords). **This is not a part of the intended use of the application.**

Start by populating the database with the plaintext passwords. Try using the application, and perform the attacks described [here](./security_issues.md). Make sure to keep the database entries (plaintext/hashed) in sync with the authentication logic in the application. Login won't work if the passwords are in the wrong format.

## Login

Login page is where you can log in to the application. You can use the following credentials to log in:

```
alice:redqueen
bob:squarepants
patrick:asteroid
```

## Dashboard

Once logged in, you will be redirected to the dashboard. This page contains a welcome message and some buttons; one to navigate to _Todo_ page, one to navigate to the _user information_ page, and one to log out.

## Todos

Todos page is where you can see your todos. You can add new todos, mark them as done, or delete them. You can also navigate back to the dashboard.

## User Information Page

On the User Information page, you can see your account details. This includes your username, password, and email. You can also navigate back to the dashboard.
