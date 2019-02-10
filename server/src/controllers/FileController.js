const {Rock} = require('../models')
const {Plant} = require('../models')
const {Fish} = require('../models')
var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
  destination:'./../client/static/public//uploads',
  filename:function(req,file,cb){
    cb(null,file.fieldname +'-' + Date.now() + path.extname(file.originalname));
  }
});
console.log(storage);
const upload = multer({
    storage:storage,
    limits:{fileSize:10000000},
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('image');

// check file type 
function checkFileType(file,cb){
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname.toLowerCase()));
    const mimeType = fileTypes.test(file.mimetype);
    if(mimeType && extname){
        return cb(null,true);
    }else{
        cb('Error:images only');
    }
}

module.exports = {
  async save (req,res){
    console.log("Here i am")
    upload(req,res,err=>{
        if(err){
            res.status(500).send({msg:err});
        }else{
          const path = req.file.filename
          return res.status(200).send(path)
        }
    })
  }
}