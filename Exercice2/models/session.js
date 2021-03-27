const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const Joi=require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const sessionSchema=new Schema({
        date:{type:Date,required:true},
        time:{type:Number,required:true},
        availableSeats:{type:Number,required:true},
        movie:{type:Schema.Types.ObjectId,ref:'Movie',required:true}
});


const session_validation=Joi.object({
        date:Joi.date().required(),
        time:Joi.number().required(),
        availableSeats:Joi.number().required(),
        movie:Joi.objectId(),
});
const reserve_validation=Joi.object({
        seats:Joi.number().positive().required(),
});


module.exports.Session=mongoose.model('Session',sessionSchema);
module.exports.session_validation=session_validation;
module.exports.reserve_validation=reserve_validation;
