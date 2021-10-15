# MobileZone
GROUP ID : 2021S2_REG_WD_11

PROJECT NAME : MobileZone

MEMBER DETAILS,
Name                          Student ID                        Username
S.W.R.S.I.Rathnayake          IT19062266                        Sidath
A.R.W.M.B.W.D.B.Jayawardana   IT19127538                        Dhananjaya
A.V.Joachim                   IT19037998                        Viraj
K.A.Yathushan                 IT19513188                        Yathushan

PROJECT DESCRIPTION
E-Commerce web application to sell mobile devices and various accessories.

TECHNOLOGIES,
Express js
Node js
React js
MongoDB
Html
CSS
Bootstrap

HOW TO GET STARTED WITH THE APP,

Prerequisite

Installing Node modules
Have to have a Mongo DB account
Have to have a SendGrid account
Have to have a Paypal developer account

Procedure of setting up prerequisites and run the project

In server folder install the node modules by entering 'npm install' command
In client folder install the node modules by entering 'yarn' command
Create a config.env file in the server root folder and configuring the MONGODB_URI and PORT
Inside the config.env file configuring the sendgrid,
        EMAIL_SERVICE
        EMAIL_USERNAME
        EMAIL_PASSWORD
        EMAIL_FROM
Inside the config.env file configuring the JWT DATA,
        JWT_SECRET
        JWT_EXPIRE
Creating a sandbox account in paypal and configuring the client ID in the order_summary.js page inside component folder
Inside in server enter 'npm run dev' command.



