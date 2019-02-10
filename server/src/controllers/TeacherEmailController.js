const {Teacher} = require('../models')
var config = require('../config/config')
var nodemailer = require("nodemailer")

/*
  Here we are configuring our SMTP Server details.
  STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: config.email.user,
        pass: config.email.password
    },
    tls: {
        rejectUnauthorized: false
    }
});
var rand,mailOptions,host,link;
/*------------------SMTP Over-----------------------------*/

module.exports = {

  async forgot(email){
    const teacher = await Teacher.findOne({
      where: {
        email: email
      }
    })
    if(teacher) {
      link="http://localhost:8080/reset/"+email;
      mailOptions={
        to : email,
        subject : "Password Reset Request",
        html : "Hello,<br> Please Click on the link to reset your password.<br><a href="+link+">Click here to reset your password</a>" 
      }
      console.log(mailOptions);
      smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
          console.log(error);
          res.status(500).send("error");
        } else{
          console.log("Message sent: " + response.message);
          res.status(200).send("sent");
        }
      });
    }
    else {
      throw "no such teacher"
    }
  },

  async send(req, res) {
    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    sId=req.params.sId
    const teacher = await Teacher.findById(tId)
    link="http://"+req.get('host')+"/verify/"+tId+"?id="+rand;
    mailOptions={
      to : user.email,
      subject : "Please confirm your Email account",
      html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error);
        res.status(500).send("error");
      } else{
        console.log("Message sent: " + response.message);
        res.status(200).send("sent");
      }
    });
  },

  async verify(req, res) {
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
      console.log("Domain is matched. Information is from Authentic email");
      if(req.query.id==rand)
      {
        console.log("email is verified");
        await Teacher.update(
          {
            isVerified: true
          },
          {
            where: {
              id: req.params.sId
            }
          })
        res.status(200).send("Email "+mailOptions.to+" has been Successfully verified. You can now <a href='http://localhost:8080'>Login</a>")
      }
      else
      {
        console.log("Email is not verified");
        res.status(400).send("<h1>Bad Request</h1>");
      }
    }
    else
    {
      res.end("<h1>Request is from unknown source");
    }
  }
}