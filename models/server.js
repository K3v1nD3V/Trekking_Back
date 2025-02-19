const dbConnect = require('../database/config');
const express = require('express');
const cors = require('cors');

const clienteRoutes = require('../routes/clienteRoutes');
const privilegiosRoutes = require('../routes/privilegiosRoutes');
const permisosRoutes = require('../routes/permisosRoutes');
const pagoRoutes = require('../routes/pagoRoutes');
const paqueteRoutes = require('../routes/paqueteRoutes');
const servicioRoutes = require('../routes/servicioRoutes');
const tourRoutes = require('../routes/tourRoutes');
const usuarioRoutes = require('../routes/usuarioRoutes');

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
        this.app.use(cors());
        
        // Rutas
        this.app.use('/api/clientes', clienteRoutes);
        this.app.use('/api/privilegios', privilegiosRoutes);
        this.app.use('/api/permisos', permisosRoutes);
        this.app.use('/api/pagos', pagoRoutes);
        this.app.use('/api/paquetes', paqueteRoutes);
        this.app.use('/api/servicios', servicioRoutes);
        this.app.use('/api/tours', tourRoutes);
        this.app.use('/api/usuarios', usuarioRoutes);




    }

    async dbConnection() {
        await dbConnect();
    }
}

module.exports = Server;
