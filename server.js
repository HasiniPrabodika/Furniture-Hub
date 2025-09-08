require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const multer = require('multer');


const Furniture = require('./models/Furniture'); 

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

const reviewRoutes = require('./routes/reviewRoutes'); 
app.use('/api/reviews', reviewRoutes);






const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); 
    },
    filename: (req, file, cb) => {
       
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });






app.post('/add-item', upload.single('image'), (req, res) => {
    
    const { name, price, category, description } = req.body;
    
    
    const imagePath = req.file ? '/uploads/' + req.file.filename : null; 

    const newFurniture = new Furniture({
        name,
        price,
        category,
        image: imagePath, 
        description
    });

    newFurniture.save()
        .then(() => {
            
            res.redirect('/dashboard');
        })
        .catch(err => {
            console.error('Error for Saving:', err);
            res.status(500).send('Error for Saving.');
        });
});


app.get('/dashboard', (req, res) => {
    Furniture.find({})
        .then(furnitureItems => {
            res.json(furnitureItems); 
        })
        .catch(err => {
            console.error('Error fetching furniture items:', err);
            res.status(500).send('Error fetching furniture items.');
        });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

