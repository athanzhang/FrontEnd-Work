var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify.js');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .all(Verify.verifyOrdinaryUser)
    .get(function(req,res,next) {
        var userId = req.decoded._doc._id;
        Favorites.find({postedBy:userId})
            .populate('postedBy dishes')
            .exec(function(err,favorite) {
                if(err) return next(err);
                res.json(favorite);
            });
    })
    .post(function(req,res,next) {
        var userId = req.decoded._doc._id;
        var dishId = req.body._id;

        Favorites.update({postedBy:userId},
            {$push:{dishes: dishId}},
            {upsert:true},
            function(err,data) {
                if(err) return next(err);
                res.json(data);
            }
        );
    })
    .delete(function(req,res,next) {
        var userId = req.decoded._doc._id;

        Favorites.remove({postedBy:userId},function(err,resp) {
            if(err) return next(err);
            res.json(resp);
        });
    });

    favoriteRouter.route('/:dishId')
        .delete(Verify.verifyOrdinaryUser,function(req,res,next) {
            var dishId = req.params.dishId;
            var userId = req.decoded._doc._id;

            Favorites.update({postedBy:userId},{$pull:{'dishes':dishId}},function(err,resp) {
                if(err) return next(err);
                res.json(resp);
            })
        });

module.exports = favoriteRouter;       