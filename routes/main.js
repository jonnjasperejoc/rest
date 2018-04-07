'use strict';

var express = require("express");
var router = express.Router();
var Question = require("../models").Question;
var root = "../";

router.param("qID", function(req, res, next, id){
	Question.findById(req.params.qID, function(err, doc){
		if(err) return next(err);
		if(!doc) {
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.question = doc
		return next();
	});
});

router.param("aID", function(req, res, next, id){
	req.answer = req.question.answers.id(id);
	if(!req.answer) {
		err = new Error("Not Found");
		err.status = 404;
		return next(err);
	}
	next();
});

router.get('/', function(req, res, next){
	Question.find({})
				.sort({createdAt: -1})
				.exec(function(err, questions){
					if(err) return next(err);
					//res.json(questions);
					res.render('index', {
						questions: questions,
						root: root
					});
				});
});

module.exports = router;