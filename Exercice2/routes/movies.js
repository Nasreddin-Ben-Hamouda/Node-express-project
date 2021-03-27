
const router=require('express').Router();
const _=require('lodash');
const {Movie,movie_validation}=require('../models/movie');
const {Session}=require('../models/session');

router.get('',async (req,res)=>{
    return res.status(200).json(await Movie.find().populate('sessions'));
})
router.get('/:id',async (req,res)=>{

    try{
        let movie=await Movie.findById(req.params.id).populate('sessions');
        if(!movie)
            return res.status(404).json('Movie not found');
        return res.status(200).json(movie);
    }catch (e){
        return res.status(400).json(e.message);
    }
});
router.post('',async (req,res)=>{
    try{
        await movie_validation.validateAsync(req.body);
        let movie=new Movie(_.pick(req.body,['name','actors']));
        movie=await movie.save();
        return res.status(200).json(movie);
    }catch (e){
        return res.status(400).json(e.message);
    }
});
router.put('/:id',async (req,res)=>{
    try{
        await movie_validation.validateAsync(req.body);
        let movie=await Movie.findById(req.params.id);
        if(!movie)
            return res.status(404).json('Movie not found');
        movie=_.merge(movie,req.body);
        movie=await movie.save();
        return res.status(200).json(movie);
    }catch (e){
        return res.status(400).json(e.message);
    }
});
router.delete('/:id',async (req,res)=>{
    try{
        let movie=await Movie.findById(req.params.id);
        if(!movie)
            return res.status(404).json('Movie not found');
         await Session.deleteMany({movie:movie._id})
         await Movie.deleteOne({_id:req.params.id});
        return res.status(200).json(movie);
    }catch (e){
        return res.status(400).json(e.message);
    }


})

module.exports=router;
