var express 	= require('express'),
	bodyParser  = require('body-parser'),
	cors 		    = require('cors'),
	morgan		  = require('morgan'),
	{sequelize}	= require('./models'),
  config      = require('./config/config'),
	app 		    = express(),
  routes      = require('./routes');

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use('/', routes)

sequelize.sync({force: false})
	.then(() => {
    app.listen(config.port)
      console.log(`Backend server started at: ${config.port}`);
  })

//to clear the database for every run
// sequelize.sync({force: true})
//   .then(() => {
//     app.listen(config.port)
//       console.log(`Backend server started at: ${config.port}`);
//   })