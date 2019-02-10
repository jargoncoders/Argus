const {User} = require('../models')
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
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if(user) {
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
      throw "no such user"
    }
  },

  async sendOrderToUser(order) {
    const customer = await User.findById(order.UserId)
    mailOptions = {
      to: customer.email,
      subject: "Order Placed Successfully",
      html: "Hi!<br> You have successfully placed an order. You will soon be contacted by the Admin once your order is verified.<br><br>Regards<br>Wooscape India"
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error) {
        res.status(500).send(error)
      } else {
        res.status(200).send("sent")
      }
    })
  },

  async sendOrderToAdmin(order) {
    const customer = await User.findById(order.UserId)
    const admin = await User.find({
      where: {
        isAdmin: true
      }
    })
    mailOptions = {
      to: admin.email,
      subject: "New Order Received",
      html: `Hi!<br> You have a new order from ${customer.email}. Please check your Wooscape Admin account for more details.<br><br>Regards<br>Wooscape India`
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error) {
        res.status(500).send(error)
      } else {
        res.status(200).send("sent")
      }
    })
  },

  async sendQueryToUser(query) {
    mailOptions = {
      to: query.email,
      subject: "Query Received Sucessfully",
      html: "Hi!<br> We have received your query, will respond to you as early as possible.<br><br>Regards<br>Wooscape India"
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error) {
        res.status(500).send(error)
      } else {
        res.status(200).send("sent")
      }
    })
  },

  async sendQueryToAdmin(query) {
    const admin = await User.find({
      where: {
        isAdmin: true
      }
    })
    mailOptions = {
      to: admin.email,
      subject: "New Query Received",
      html: `Hi!<br> You have a new query from ${query.email}. Please check your Wooscape Admin account for more details.<br><br>Regards<br>Wooscape India`
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error) {
        res.status(500).send(error)
      } else {
        res.status(200).send("sent")
      }
    })
  },

  async sendServiceToUser(service) {
    const customer = await User.findById(service.UserId)
    mailOptions = {
      to: customer.email,
      subject: "Service Request Placed Sucessfully",
      html: "Hi!<br> You have successfully placed a service request. You will soon be contacted by the Admin once your request is verified.<br><br>Regards<br>Wooscape India"
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error) {
        res.status(500).send(error)
      } else {
        res.status(200).send("sent")
      }
    })
  },

  async sendServiceToAdmin(service) {
    const customer = await User.findById(service.UserId)
    const admin = await User.find({
      where: {
        isAdmin: true
      }
    })
    mailOptions = {
      to: admin.email,
      subject: "New Service Request Received",
      html: `Hi<br> You have a new service request from ${customer.email}. Please check your Wooscape Admin account for more details.<br><br>Regards<br>Wooscape India`
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error) {
        res.status(500).send(error)
      } else {
        res.status(200).send("sent")
      }
    })
  },

  async send(req, res) {
    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    uId=req.params.uId
    const user = await User.findById(uId)
    link="http://"+req.get('host')+"/verify/"+uId+"?id="+rand;
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
        await User.update(
          {
            isVerified: true
          },
          {
            where: {
              id: req.params.uId
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