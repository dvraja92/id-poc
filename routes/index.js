var express = require('express');
var router = express.Router();
var multer  = require('multer');
//var fileSystem = require('fs');
var phantom = require('phantom');
var QRCode = require('qrcode');
var utils = require('../lib/database/db');
var employeeDao = require('../lib/dao/Employee');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {uploadStatus : false});
});

/* Submit User Information */
router.post('/saveUserData', function(req, res, next){
  console.dir(req.files);
  console.dir(req.body);

  employeeModel = {};
  employeeModel.employeename = req.body.name;
  employeeModel.designation = req.body.designation;
  employeeModel.organization_name = req.body.organizationName;
  employeeModel.office_contact = req.body.officeContactNo;
  employeeModel.office_address = req.body.officeAddress;
  employeeModel.gender = req.body.gender;
  employeeModel.joining_date = req.body.joining_date;
  employeeModel.employee_image = req.files.image.path.replace(/\\/g, '/').replace('public','');
  employeeModel.employee_url = req.body.verificationUrl;
  
  employeeDao.saveEmployee(employeeModel, function(err, results){
  	var uploadStatus = true;
  	if(err){
  		console.log(err);
  		uploadStatus = false;
      res.render('index', {'uploadStatus' : uploadStatus});
  	}else{
      console.log("Starting PDF Capturing");

      // Generate QR Code Here.
      QRCode.save('./public/qrcodes/' + results.insertId + '.png', employeeModel.employee_url, function(err,url){
        console.log("QRCode Generated");
      });

      phantom.create(function(ph){
        ph.createPage(function(page) {
          page.open("http://localhost:8080/users/getUserCard/" + results.insertId, function(status) {
            page.render('./public/gen_pdf/' + results.insertId + '.pdf', function(){
              console.log('Page Rendered');
              ph.exit();
              res.redirect('/file/' + results.insertId);
            });
          });
        });
      });
    }
  });
});

/* For Downloading PDF */
router.get('/file/:id', function(req, res, next){
  res.download('./public/gen_pdf/' + req.params.id + '.pdf');
});


/* For QRCode Demo */
router.get('/qr', function(req, res, next){
  QRCode.toDataURL('i am a pony!',function(err,url){
    console.log(url);
  });
});

module.exports = router;
