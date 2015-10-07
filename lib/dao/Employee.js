var express = require('express');
var dbUtils = require('../database/db');

module.exports = {
	saveEmployee : function(data, callback){
		var query = "insert into users (employeename, designation, organization_name, office_contact, office_address, employee_image, url, gender, doj) values(?,?,?,?,?,?,?,?,?)";
		var params = [data.employeename, data.designation, data.organization_name, data.office_contact, data.office_address, data.employee_image, data.employee_url, data.gender, data.joining_date];
		dbUtils.exec(query, params, callback);
	},
	getEmployee: function(userid, callback){
		var query = "select * from users where ?? = ?";
		var params = ['userid', userid];
		dbUtils.exec(query, params, callback);
	}
};