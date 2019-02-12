const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const StudentAuthController = require('./controllers/StudentAuthController')
const StudentsController = require('./controllers/StudentsController')
const TeacherAuthController = require('./controllers/TeacherAuthController')
const TeachersController = require('./controllers/TeachersController')

const RocksController = require('./controllers/RocksController')
const QueriesController = require('./controllers/QueriesController')
const OrdersController = require('./controllers/OrdersController')
const EmailController = require('./controllers/EmailController')
const StudentEmailController = require('./controllers/EmailController')
const TeacherEmailController = require('./controllers/EmailController')
const FileController = require('./controllers/FileController')
const NotificationController = require('./controllers/NotificationController')

var path = require('path');

var express = require('express');
var router  = express.Router();

router.use(express.static(path.join(__dirname,'dist')));

//Routes Start

router.get("/", function(req, res) {
	res.sendFile((path.join(__dirname,"index.html")));
})

//Student Authentication

router.post("/sregister",
  AuthenticationControllerPolicy.register,
  StudentAuthController.register
)

router.post("/slogin", StudentAuthController.login)

router.post("/sforgot", StudentAuthController.forgot)

router.post("/sreset", StudentAuthController.reset)


//Students

router.get("/students", StudentsController.index)

router.get("/students/:studentId", StudentsController.show)

router.put("/students/:studentId", StudentsController.put)

router.delete("/students/:studentId", StudentsController.delete)

//Teacher Authentication

router.post("/tregister",
  AuthenticationControllerPolicy.register,
  TeacherAuthController.register
)

router.post("/tlogin", TeacherAuthController.login)

router.post("/tforgot", TeacherAuthController.forgot)

router.post("/treset", TeacherAuthController.reset)


//Teachers


router.get("/teachers", TeachersController.index)

router.get("/teachers/:teacherId", TeachersController.show)

router.put("/teachers/:teacherId", TeachersController.put)

router.delete("/teachers/:teacherId", TeachersController.delete)


//Rocks

router.get("/rocks", RocksController.index)

router.post("/rocks", RocksController.post)

router.get("/rocks/:rockId", RocksController.show)

router.put("/rocks/:rockId", RocksController.put)

router.delete("/rocks/:rockId", RocksController.delete)


//Queries

router.get("/queries", QueriesController.index)

router.post("/queries", QueriesController.post)

router.get("/queries/:queryId", QueriesController.show)

router.put("/queries/:queryId", QueriesController.put)

router.delete("/queries/:queryId", QueriesController.delete)

//Orders

router.get("/orders", OrdersController.index)

router.post("/orders", OrdersController.post)

router.get("/orders/:orderId", OrdersController.show)

router.put("/orders/:orderId", OrdersController.put)

//Student Email Verifiaction

router.post("/send/:sId", StudentEmailController.send)

router.get("/verify/:sId", StudentEmailController.verify)

//File Upload

router.post("/upload/", FileController.save)

//Notification

router.get("/updates", NotificationController.index)

/*--------------------Routing Over----------------------------*/


module.exports = router;