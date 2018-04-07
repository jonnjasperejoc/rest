'use strict';

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", function(err){
	console.log("db connection successful");
});

db.once("open", function(err){
	// All database communication goes here
	var Schema = mongoose.Schema;
	var AnimalSchema = new Schema({
		type:  {type: String, default: "goldfish"},
		size:  String,
		color: {type: String, default: "golden"},
		mass:  {type: Number, default: 0.007},
		name:  {type: String, default: "Angela"}
	});

	AnimalSchema.pre("save", function(next){
		if(this.mass >= 100){
			this.size = "big";
		} else if (this.mass >= 5 && this.mass < 100) {
			this.size = "medium";
		} else {
			this.size = "small";
		}
		next();
	});

	AnimalSchema.statics.findSize = function(size, callback){
		//this == Animal
		return this.find({size: size}, callback);
	}

	AnimalSchema.methods.findSameColor = function(callback) {
		//this == document
		return this.model("Animal").find({color: this.color}, callback);
	}

	var Animal = mongoose.model("Animal", AnimalSchema);

	var elephant = new Animal({
		type: "elephant",
		color: "gray",
		mass: 6000,
		name: "Lawrence"
	});

	var animal = new Animal({}); //Goldfish

	var whale = new Animal({
		type: "whale",
		mass: 190500,
		name: "Fig"
	});

	var animalData = [
		{
			type: "mouse",
			color: "gray",
			mass: 0.035,
			name: "Marvin"
		},
		{
			type: "nutiria",
			color: "brown",
			mass: 6.35,
			name: "Gretchen"
		},
		{
			type: "wolf",
			color: "gray",
			mass: 0.035,
			name: "Iris"
		},
		elephant,
		animal,
		whale
	];
	/*Animal.remove({}, function(err){
		elephant.save(function(err){
			if(err){
				console.err("Save Failed.", err);
			} else {
				animal.save(function(err){
					if(err){
						console.err("Save Failed.", err);
					}
					else
					{
						whale.save(function(err){
							if(err){
								console.err("Save Failed.", err);
							}
							Animal.find({size: "big"}, function(err, animals){
								animals.forEach(function(animal){
									console.log(animal.name + " the " + animal.color + " " + animal.type);
								});
								db.close(function(){
									console.log("db connection closed!");
								});
							});
						});
					}
				});
			}
		});
	});*/
	Animal.remove({}, function(err){
		if (err) console.error(err);
		Animal.create(animalData, function(err, animals){
			if (err) console.error(err);
			Animal.findOne({type: "elephant"}, function(err, animals){
				elephant.findSameColor(function(err, animals){
					if (err) console.error(err);
					animals.forEach(function(animal){
						console.log(animal.name + " the " + animal.color + " " + animal.type + " is a " + animal.size + "-sized animal.");
					});
					db.close(function(){
						console.log("db connection closed!");
					});
				});
			});
		});
	});
});