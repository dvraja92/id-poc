var express = require('express');
var mysql = require('mysql');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodedemo',
    debug    :  false
});

module.exports = {
	getDBConnection: function(callback) {
    	pool.getConnection(function(err, connection){
        	if(err){
	            //console.log(err);
            	return callback(err);
        	}
        	callback(null, connection);
    	});
	},
	endDBConnection: function(connection) {
    	connection.release(function (err) {
        	if(err) {
            	//console.log(err); 
            	callback(true); 
            	return; 
        	}   
    	});
	},
	exec: function(query, data, callback) {
    	console.log(query);
    	var self = this;
    	this.getDBConnection(function(err, connection){
        	if(err){
            	//console.log('error');
            	return callback(err);
        	}
        	console.log(connection);
        	connection.query(query, data, function(err, results) {
	            self.endDBConnection(connection);
            	if(err) {
	                return callback(err);
            	}
            	callback(null, results);
        	});
    	});
	}
}