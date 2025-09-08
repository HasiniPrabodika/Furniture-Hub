require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(' MongoDB connected');

        const admin = new Admin({
            name: 'Super Admin',
            email: 'admin@gmail.com',
            password: 'admin123'  
        });

        await admin.save();
        console.log('🎉 Admin created successfully');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error creating admin:', err);
        process.exit(1);
    }
}

run();
