

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    productName: { type: String, required: true },
    category: String,
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    photo: String,
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model("Review", reviewSchema, "Reviews");


app.post("/api/reviews", upload.single("photo"), async (req, res) => {
    try {
        const newReview = new Review({
            name: req.body.name,
            productName: req.body.productName,
            category: req.body.category,
            rating: req.body.rating,
            review: req.body.review,
            photo: req.file ? `/Uploads/${req.file.filename}` : null
        });
        await newReview.save();
        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Error adding review" });
    }
});

app.get("/api/reviews", async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Error fetching reviews" });
    }
});
