require('./dbConnection')
const express = require('express');
const movie_router = require('./routes/movies')
const session_router = require('./routes/sessions')
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json())
app.use('/api/movies',movie_router);
app.use('/api/sessions',session_router);
app.listen(port,()=>console.log(`server on ${port}`));
