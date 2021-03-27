const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const Joi=require('joi');

const movieSchema=new Schema({
    name:{type:String,required:true},
    actors:{type:[String]},
    sessions:[{type:Schema.Types.ObjectId,ref:'Session'}]
});

const movie_validation=Joi.object({
    name:Joi.string().required().min(4).max(30),
    actors:Joi.array().items(Joi.string().min(4).max(30)).min(2),
});

module.exports.Movie=mongoose.model('Movie',movieSchema);
module.exports.movie_validation=movie_validation;
