const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://MongoUser:MongoPassword@cluster0.dlkzu.mongodb.net/cinema?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log('Data Base Connection is UP.'))
    .catch((err) => console.log('Data Base Connection is DOWN. Raison :',err));
