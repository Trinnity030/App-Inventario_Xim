const personaService = require('../services/persona.service.js');

class personaController{
    async getAllPersonas(req, res){
        try{
            const personas = await personaService.getAllPersonas();
            //por defecto siempre retorna 200 si no se especifica otro código de estado
            //200 -> exito | OK
            res.status(200).json(personas);
        }catch(error){
            res.status(400).json({message: error.message});
        }

    }
    async getPersonaById(req, res){
        try{
            //validar que el Id venga en la peticion. 
            const personaId = req.params.id;
            if(!personaId || personaId === '' || personaId === undefined || personaId === null){
                throw new Error('El id es obligatorio');
            }
            const persona = await personaService.getPersonaById(personaId);
            res.json(persona);
        }catch (error){
            res.status(400).json({message: error.message});
        }
    }
    async createPersona(req, res){
        try{
            const persona = await personaService.createPersona(req.body);
            res.json(persona);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }

    async updatePersona(req, res){
        try{
            //Validar que el id venga en la peticion
            const personaId = req.params.id;

            if(!personaId || personaId === '' || personaId === undefined || personaId === null){
                throw new Error('El id de la persona es requerido');
            }
            const persona = await personaService.updatePersona(personaId, req.body);
            res.json(persona);

        }catch(error){
            res.status(400).json({message: error.message});
        }
    }

    async deletePersona(req, res){
        try{
            //Validar que el id venga en la peticion
            const personaId = req.params.id;

            if(!personaId || personaId === '' || personaId === undefined || personaId === null){
                throw new Error('El id de la persona es requerido');
            }
            const persona = await personaService.deletePersona(personaId);
            res.json(persona);
            console.log('Persona eliminada correctamente');

        }catch(error){
            res.status(400).json({message: error.message});
        }
    }

}


module.exports = new personaController();