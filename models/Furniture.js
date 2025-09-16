const mongoose = require('mongoose');


const furnitureSchema = new mongoose.Schema({
   
    name: { 
        type: String, 
        required: true 
    },
   
    price: { 
        type: Number, 
        required: true 
    },
  
    category: {
        type: String, 
        required: true 
    },
    
    image: { 
        type: String, 
        required: false 
    },
    
    description: { 
        type: String, 
        required: false 
    },
});


module.exports = mongoose.model('Furniture', furnitureSchema);