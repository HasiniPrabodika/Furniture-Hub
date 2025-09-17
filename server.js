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
  res.send('✅ Server is running. Go to /Admin/login.html to log in.');
});


app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@gmail.com' && password === 'admin123') {
  
    return res.redirect('/Admin/AdminDashboard.html');
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
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
