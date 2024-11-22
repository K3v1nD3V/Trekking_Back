const dbConnect = require('../database/config');
const express = require('express'); 
const cors = require('cors');

const { getAgenda_guia, getAgenda_guiaById, postAgenda_guia, putAgenda_guia, deleteAgenda_guia } = require('../controllers/agenda_guiaController')
const { getPrivilegios, postPrivilegios, putPrivilegios, deletePrivilegios } = require('../controllers/privilegiosController')
const { getPermisos, getPermiso,postPermisos, putPermisos, deletePermisos } = require('../controllers/permisosController')

class Server{
    constructor(){
        this.app = express();
        this.listen();
        this.dbConnection();
        this.pathAgenda_guia = '/api/agenda_guia';
        this.pathPrivilegios = '/api/privilegios';
        this.pathPermisos = '/api/permisos';
        this.route();

    }   

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running`);  
        })
    }

    route(){
        this.app.use(express.json());
        this.app.use( cors() );
        
        // agenda_guia
        this.app.get(this.pathAgenda_guia, getAgenda_guia);
        this.app.get(this.pathAgenda_guia + '/:id', getAgenda_guiaById);
        this.app.post(this.pathAgenda_guia, postAgenda_guia);
        this.app.put(this.pathAgenda_guia+'/:id', putAgenda_guia);
        this.app.delete(this.pathAgenda_guia+'/:id', deleteAgenda_guia);

        // privilegios
        this.app.get(this.pathPrivilegios, getPrivilegios);
        this.app.post(this.pathPrivilegios, postPrivilegios);
        this.app.put(this.pathPrivilegios+'/:id', putPrivilegios);
        this.app.delete(this.pathPrivilegios+'/:id', deletePrivilegios);
        
        // permisos
        this.app.get(this.pathPermisos, getPermisos);
        this.app.get(this.pathPermisos+'/:id', getPermiso);
        this.app.post(this.pathPermisos, postPermisos);
        this.app.put(this.pathPermisos+'/:id', putPermisos);
        this.app.delete(this.pathPermisos+'/:id', deletePermisos);
        
    }
    async dbConnection() {
        await dbConnect()
    }
}

module.exports =  Server 