const mongoose = require('mongoose');

const uri = 'mongodb+srv://hprabodika657_db_user:<db_password>@cluster0.r3sjfra.mongodb.net/';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));
