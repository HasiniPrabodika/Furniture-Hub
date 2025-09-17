require('dotenv').config();
const express = require('express');

const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));
app.use(express.static(__dirname));

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;"
  );
  next();
});


app.get('/', (req, res) => {
 
    res.redirect('/Admin/HTML/Adminlogin.html');

});


app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@gmail.com' && password === 'admin123') {
  
    return res.redirect('/Admin/HTML/AdminDashboard.html');
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({ success: true, path: '/uploads/' + req.file.filename });
=======
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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

