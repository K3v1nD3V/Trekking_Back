const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configura Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Define estas variables en tu archivo .env
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configura almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'trekking/paquetes', // Carpeta en Cloudinary donde se guardarán los archivos
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'webm', 'webp'], // Formatos permitidos
  },
});

// Filtro para aceptar solo imágenes y videos
const fileFilter = (req, file, cb) => {
  console.log('Procesando archivo:', file.originalname, file.mimetype);
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
  } else {
      console.error('Formato no válido:', file.originalname, file.mimetype);
      cb(new Error('Solo se permiten archivos de imagen o video'), false);
  }
};

// Configura Multer para usar Cloudinary
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB máximo
  },
});

module.exports = upload;