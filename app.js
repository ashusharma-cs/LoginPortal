// REQUIRING/LOADING ALL THE DEPENDENCIES.
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

// SETTING UP THE MONGODB DATABASE THROUGH MONGOOSE.
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://user_ashu:ashu@cluster0.wp2x53r.mongodb.net/Project", 
{ useNewUrlParser: true });

// INITIALIZING THE SERVER THROUGH EXPRESS.
const app = express();

// INITIALIZING THE "body-parser"
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// INITIALIZING EXPRESS TO USE STATIC FILES IN THE PUBLIC FOLDER.
app.use(express.static("public"));


// CREATING A SCHEMA FOR THE DOCUMENT.
const userSchema = {
    username: String,
    password: String,
    name: String,
    course: String,
    country: String

}

// CREATING A MODEL NAMED AS "Users" BY PROVIDING THE SCHEMA CREATED.
const Users = mongoose.model("users", userSchema);


// SETTING UP A GET - HTTP REQUEST ON THE HOME ROUTE("/") AND SENDING THE "login.html" file AS A RESPONSE.
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login.html");

})


// SETTING UP A POST - HTTP REQUEST ON THE "/login" ROUTE AND SENDING THE RESPONSE ACCORDINGLY.
app.post("/login", (req, res) => {

    // RETRIEVING USERNAME AND PASSWORD FROM THE NETWORK USING "body-parser".
    let username = req.body.name;
    let password = req.body.pass;


    // QUERY TO FIND A DOCUMENT WITH THE USERNAME PROVIDED BY THE USER. find() used to work with callbacks previously, now it works with promises as it resolves the response.
    Users.find({ username: username })
        .then((user) => {

            userobj = user[0]

            // CONDITION TO CHECK IF THE USERNAME PROVIDED IS NOT PRESENT IN THE DATABASE
            if (!userobj) {

                // CREATING A NEW USER IF THE USERNAME PORVIDED BY THE USER IS NEW AND NOT FOUND IN THE DATABASE.
                let newUser = new Users({
                    username: username,
                    password: password
                });

                // SAVING THE NEWLY CREATED DOCUMENT BY USING save()
                newUser.save()
                    .then((savedUser) => {
                        res.send({
                            newUser: true
                        })

                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            
            // CONDITION TO CHECK IF THE PROVIDED PASSWORD DOESNT MATCH WITH THE SAVED PASSWORD IN THE DATABASE.
            else if (userobj.password != password) {

                res.send({
                    flag: true,
                    message: "INVALID PASSWORD"
                });

            }

            // FINALLY SENDING THE OBJECT(DOCUMENT) AS A RESPONSE, IF THE USERNAME AND PASSOWRD MATCHES WITH THE ONE SAVED IN THE DATABASE.
            else {

                res.send(userobj);

            }


        })

})


// THE SERVER IS LISTENING ON PORT 3000
app.listen(3000, () => {
    console.log("SERVER STARTED");
})