const { dbConnect } = require('../database/config');
const express = require('express');
const cors = require('cors');

const clienteRoutes = require('../routes/clienteRoutes');
const privilegiosRoutes = require('../routes/privilegiosRoutes');
const permisosRoutes = require('../routes/permisosRoutes');
const paqueteRoutes = require('../routes/paqueteRoutes');
const servicioRoutes = require('../routes/servicioRoutes');
const tourRoutes = require('../routes/tourRoutes');
const usuarioRoutes = require('../routes/usuarioRoutes');
const rolRoutes = require('../routes/rolRoutes');
const ventaRoutes = require('../routes/ventaRoutes');

const errorMiddleware = require('../middlewares/errorMiddleware')
class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.dbConnection();
        this.route();
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running`);
        });
    }

    route() {
        this.app.use(express.json());
        
        const corsOptions = {
            origin: ['http://localhost:5173', 'https://trekking-back.onrender.com'], // Permite múltiples orígenes
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
            allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
        };
        
        this.app.use(cors(corsOptions));
          
        // this.app.use(cors({
        //     origin: 'http://localhost:5173', // Permite solo este origen
        //     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
        //     allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitido
        // }));
        
        // Rutas
        this.app.use('/api/clientes', clienteRoutes);
        this.app.use('/api/privilegios', privilegiosRoutes);
        this.app.use('/api/permisos', permisosRoutes);
        this.app.use('/api/paquetes', paqueteRoutes);
        this.app.use('/api/servicios', servicioRoutes);
        this.app.use('/api/tours', tourRoutes);
        this.app.use('/api/usuarios', usuarioRoutes);
        this.app.use('/api/roles', rolRoutes); 
        this.app.use('/api/ventas', ventaRoutes);

        this.app.use(errorMiddleware)
    }

    async dbConnection() {
        await dbConnect();
    }
}

module.exports = Server;
