const mongoose = require('mongoose');
const { v2: cloudinary } = require('cloudinary');

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { dbConnect, cloudinary };
