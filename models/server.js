const dbConnect = require('../database/config');
const express = require('express'); 

const { getAgenda_guia, postAgenda_guia, putAgenda_guia, deleteAgenda_guia } = require('../controllers/agenda_guiaController')

class Server{
    constructor(){
        this.app = express();
        this.listen();
        this.dbConnection();
        this.pathAgenda_guia = '/api/agenda_guia';
        this.route();

    }   

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running`);  
        })
    }

    route(){
        this.app.use(express.json());

        // vehicle
        this.app.get(this.pathAgenda_guia, getAgenda_guia);
        this.app.post(this.pathAgenda_guia, postAgenda_guia);
        this.app.put(this.pathAgenda_guia, putAgenda_guia);
        this.app.delete(this.pathAgenda_guia+'/:id', deleteAgenda_guia);
        
    }
    async dbConnection() {
        await dbConnect()
    }
}

module.exports =  Server 