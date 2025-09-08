const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));

mongoose.connect("mongodb+srv://hprabodika657_db_user:64ZOMGWDEB9Y79Q@cluster0.r3sjfra.mongodb.net/CraftifyDB?retryWrites=true&w=majority")
    .then(() => console.log("MongoDB connected ✅"))
    .catch(err => console.error("MongoDB connection error:", err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    image: String
});
const Item = mongoose.model("Product", itemSchema, "Products");

app.post("/api/items", upload.single("image"), async (req, res) => {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    try {
        const newItem = new Item({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            // Fixed: Use backticks for the template literal
            image: req.file ? `/Uploads/${req.file.filename}` : null
        });

        await newItem.save();
        res.status(201).json({ message: "Item added successfully", item: newItem });
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ message: "Error adding item" });
    }
});

app.get("/api/items", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Error fetching items" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));