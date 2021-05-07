//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FIRSTNAME: firstName,
                    LASTNAME: lastName
                }
            }
        ]
    };
    var jsonDATA = JSON.stringify(data);

    const url = "https://DC.api.mailchimp.com/3.0/lists/<MY_LIST_ID>/";
    const options = {
        method: "POST",
        auth: "<Any_string>:<MY_API_KEY>"
    }
//Replace <Any_String> with any string of your choice (your name/username example: auth: "pranshukas:us1-XXXXXXXXXXXXX"

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        // response.on("data", function (data) {
        //     console.log(JSON.parse(data));
        // })
    });

    request.write(jsonDATA);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("Server is Running on port 3000");
});



//API Keys:  

//ListID: 

//Data Center: usX


//To Use the code just replace the API_KEYS with your API's keys and LIST_ID with your List Id generated on Milchimp (https://mailchimp.com/)

//Also Make sure to Replace with your Data Center available on your API keys. Example: Mine was us1 
