
const router=require('express').Router();
const _=require('lodash');
const {Session,session_validation,reserve_validation}=require('../models/session');
const {Movie}=require('../models/movie');

router.get('',async (req,res)=>{
    return res.status(200).json(await Session.find().populate('movie','_id name'));
})
router.get('/:id',async (req,res)=>{

    try{
        let session=await Session.findById(req.params.id);
        if(!session)
            res.status(404).json('Session not found');
        return res.status(200).json(session);
    }catch (e){
        return res.status(400).json(e.message);
    }
});
router.post('',async (req,res)=>{
    try{
        await session_validation.validateAsync(req.body);
        let session=new Session(_.pick(req.body,['date','time','availableSeats','movie']));
        let movie=await Movie.findById(session.movie);
        if(!movie)
            res.status(404).json('Movie not found');
        session=await session.save();
        movie.sessions.push(session);
        await movie.save();

        return res.status(200).json(session);
    }catch (e){
        return res.status(400).json(e.message);
    }
});
router.put('/:id',async (req,res)=>{
    try{
        await session_validation.validateAsync(req.body);
        let session=await Session.findById(req.params.id);
        if(!session)
            return res.status(404).json('Session not found');
        let movie=await Movie.findById(session.movie);
        session=_.merge(session,req.body);
        let movieTwo= await Movie.findById(session.movie)
        if(!movieTwo)
            return res.status(404).json('Movie not found');
        session=await session.save();
        if(!_.isEqual(movie,movieTwo)){
            movie.sessions.pull(session);
            await movie.save();
            movieTwo.sessions.push(session);
            await movieTwo.save();
        }

        return res.status(200).json(session);
    }catch (e){
        return res.status(400).json(e.message);
    }
});
router.delete('/:id',async (req,res)=>{
    try{
        let session=await Session.findById(req.params.id);
        if(!session)
            return res.status(404).json('Session not found');
        let movie=await Movie.findById(session.movie);
        movie.sessions.pull(session);
        await movie.save();
        await Session.deleteOne({_id:req.params.id});
        return res.status(200).json(session);
    }catch (e){
        return res.status(400).json(e.message);
    }


})

router.post('/:id/reserve',async (req,res)=>{
    try{
        await reserve_validation.validateAsync(req.body);
        let session=await Session.findById(req.params.id);
        if(!session)
            return res.status(404).json('Session not found');
        if(session.availableSeats===0)
            return res.status(401).json('No place available in this session ');
        if(req.body.seats>session.availableSeats)
            return res.status(401).json('The requested places are not available ');
        session.availableSeats-=req.body.seats;
        await session.save()
        return res.status(200).json(session);

    }catch(e){
        return res.status(400).json(e.message);
    }
})






module.exports=router;
