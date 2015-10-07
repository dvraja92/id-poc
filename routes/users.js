var express = require('express');
var router = express.Router();
var utils = require('../lib/database/db');
var employeeDao = require('../lib/dao/Employee');

/* GET User Information */
router.get('/:userid', function(req, res, next) {

	var userid = req.params.userid;
	console.log(userid);
 	employeeDao.getEmployee(userid, function(err, result){
 		if(err){
 			throw err;
 		}
 		console.log(result);
 		res.render('user-id-card', result[0]);
 	});
});

/* GET User Information for PDF Generation */
router.get('/getUserCard/:userid', function(req, res, next) {

	var userid = req.params.userid;
	console.log(userid);
 	employeeDao.getEmployee(userid, function(err, result){
 		if(err){
 			throw err;
 		}
 		console.log(result);
 		res.render('user-id-pdf', result[0]);
 	});
});


module.exports = router;
