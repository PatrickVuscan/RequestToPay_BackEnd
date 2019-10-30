/* The login function, handling the response from the login.html (username/password), queries the database for a
 * a matching row, then directs the logged in user to the appropriate page.
 */

// required packages
// require('dotenv').config();                // .env containing db info
const express = require("express");           // for logged in session
const session = require("express-session");   //
const bodyParser = require("body-parser");    // capturing requests from html
const path = require("path");                 //
const pg = require("pg");

// // import packages - TODO: 'import' not working
// import express from "express";
// import session from "express-session";
// import bodyParser from "body-parser";
// import path from "path";
// import pg from "pg";

// set up connection to the database - to be modified to Heroku server
// var conString = process.env.DB_CONSTRING;   // .env containing db info
const conString = "postgres://postgres:t3$t3r@34.74.107.202:5432/postgres";  // Google Cloud (Dionysus)
const connection = new pg.Client(conString);
connection.connect();

// set up Express
const app = express();

// determine if the user is logged in
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}));

// extract form data from login.html
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());  // extract form data from login.html

// display login.html to client
app.get("/", function(request, response){
    response.sendFile(path.join(__dirname + "/__mocks__/login.html"));
});

// handle POST request to check username/password against DB entries
app.post("/auth", function(request, response) {

    const username = request.body.username;
    const password = request.body.password;
    if (username && password) {
        // Search Database for correct U/P combo
        // results contains matching table row
        const userPwQuery = "SELECT * FROM accounts WHERE username = $1 AND password = $2";
        connection.query(userPwQuery, [username, password], function(error, results){
            if (error) {
                response.send("Not Connected to Google Cloud");
                // // dirty no-connection alternative test
                // if (username === "cocacola" && password === "pepsi"){
                //     request.session.loggedin = true;
                //     request.session.username = username;
                //     response.redirect("/home");
            } else if (results.rows.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect("/home");
            } else {
                // no U/P combo found
                response.send("Invalid Username or Password!");
            }
            response.end();
        });
    } else {
        // Missing an entry field
        response.send("Enter Username or Password!");
        response.end();
    }
});

// generate the home page - to be connected to page specific to user
app.get("/home", function(request, response) {
    if (request.session.loggedin) {
        return response.sendFile(path.join(__dirname + "/__mocks__/" + request.session.username + ".html"));
        // response.send('Welcome to the RTP, ' + request.session.username + '!');  // direct message
    } else {
        response.send("Please login!");
    }
    response.end();
});

// test port @ http://localhost:3000/
app.listen(3000);
