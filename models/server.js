const dbConnect = require('../database/config');
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
const guiaRoutes = require('../routes/guiaRoutes');


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
        this.app.use(cors());
        
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
        this.app.use('/api/guias', guiaRoutes)

        this.app.use(errorMiddleware)
    }

    async dbConnection() {
        await dbConnect();
    }
}

module.exports = Server;
