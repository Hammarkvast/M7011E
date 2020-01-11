var db = require('../public/javascripts/db');
var express = require('express');
var router = express.Router();
const request = require("request");

/* GET handle users page */

router.get('/', function(req, res, next){
    if(req.session.loggedin){
        res.render("handleusers");
    }else{
        res.redirect('/signin_manager');
    }
});

module.exports = router;