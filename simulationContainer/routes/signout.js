var db = require('../public/javascripts/db');
var express = require('express');
var router = express.Router();
var db = require('../public/javascripts/db');
var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', function(req, res){
    if (req.session){
        req.session.destroy(function(err){
            if(err){
                return err;
            }
        })
        res.redirect('/signin');
    }
})

router.get('/manager', function(req, res){
    if (req.session){
        req.session.destroy(function(err){
            if(err){
                return err;
            }
        })
        res.redirect('/signin_manager');
    }
})
module.exports = router;