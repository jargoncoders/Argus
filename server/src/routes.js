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
	res.sendFile((path.join(__dirname, 'index.html')));
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

router.get("/students", TeachersController.index)

router.route("/students/:studentId")
  .get(TeachersController.show)
  .put(TeachersController.put)
  .delete(TeachersController.delete)

//Teacher Authentication

router.post("/tregister",
  AuthenticationControllerPolicy.register,
  TeacherAuthController.register
)
router.post("/tlogin", TeacherAuthController.login)
router.post("/tforgot", TeacherAuthController.forgot)
router.post("/treset", TeacherAuthController.reset)


//Teachers

router.get("/students", StudentsController.index)

router.route("/students/:studentId")
  .get(StudentsController.show)
  .put(StudentsController.put)
  .delete(StudentsController.delete)

//Rocks

router.route("/rocks")
  .get(RocksController.index)
  .post(RocksController.post)

router.route("/rocks/:rockId")
  .get(RocksController.show)
  .put(RocksController.put)
  .delete(RocksController.delete)

//Queries
router.route('/queries')
  .get(QueriesController.index)
  .post(QueriesController.post)

router.route('/queries/:queryId')
  .get(QueriesController.show)
  .put(QueriesController.put)
  .delete(QueriesController.delete)

//Orders

router.route("/orders")
  .get(OrdersController.index)
  .post(OrdersController.post)

router.route("/orders/:orderId")
  .get(OrdersController.show)
  .put(OrdersController.put)

//Student Email Verifiaction

router.post("/send/:sId", StudentEmailController.send)
router.get("/verify/:sId", StudentEmailController.verify)

//File Upload

router.post("/upload/", FileController.save)

//Notification

router.get("/updates", NotificationController.index)

module.exports = router;