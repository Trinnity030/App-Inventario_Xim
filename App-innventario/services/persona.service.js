const personaRepository = require('../repositories/persona.repository');
const validaciones = require('../utils/validation');
const utils = require('../utils/utils');

class personaService{
    async getAllPersonas(){
        return await personaRepository.getAllPersonas();
    }
    async getPersonaById(id){
        const persona = await personaRepository.getPersonaById(id);
        if(!persona){
            throw new Error('Persona no encontrada');
        }
        return persona;
    }

    async createPersona(persona){
        //Validar todos los campos obligatorios
        if(!persona.nombre || !persona.apellido || !persona.fechaNacimiento || !persona.rfc || !persona.correo){
            throw new Error('Todos los campos son obligatorios');
        }
        //validar que el formato del RFC y del Correo sean correctos
        validaciones.validarRFC(persona.rfc);
        validaciones.validarCorreo(persona.correo);
        //validar que el RFC no exista en la base de datos
        const personaByRFC = await personaRepository.getPersonaByRFC(persona.rfc);

        //validar que el correo no exista en la base de datos
        const personaByCorreo = await personaRepository.getPersonaByCorreo(persona.correo);

        if(personaByRFC){
            throw new Error('El RFC ya existe');
        }

        if(personaByCorreo){
            throw new Error('El correo ya existe');
        }

        if(utils.calcularEdad(persona.fechaNacimiento) < 18){
            throw new Error('La persona debe ser mayor de edad');
        }

        return await personaRepository.createPersona(persona);

    }
    async updatePersona (id, persona){
        //validar que la persona exista
        const personaById = await personaRepository.getPersonaById(id);
        if(!personaById){
            throw new Error('Persona no encontrada');
        }
        //validar que todos los campos requeridoa vengan en la petición
        if(!persona.nombre || !persona.apellido || !persona.fechaNacimiento || !persona.rfc || !persona.correo){
            throw new Error('Todos los campos son obligatorios');
        }
        //validar que el formato del RFC y del Correo sean correctos
        validaciones.validarRFC(persona.rfc);

        validaciones.validarCorreo(persona.correo);
        
        //validar que el RFC no exista en la base de datos
        //Que no lo tengan otras personas, que no sea la misma persona
        const personaByRFCAndNotId = await personaRepository.getPersonaByRFCAndNotId(id, persona.rfc);
        if(personaByRFCAndNotId){
            throw new Error('El RFC ya existe');
        }
        //validar que el correo no exista en la base de datos
        //Que no lo tengan otras personas, que no sea la misma persona
        const personaByCorreoAndNotId = await personaRepository.getPersonaByCorreoAndNotId(id, persona.correo);
        if(personaByCorreoAndNotId){
            throw new Error('El correo ya existe');
        }

        if(utils.calcularEdad(persona.fechaNacimiento) < 18){
            throw new Error('La persona debe ser mayor de edad');
        }
        return await personaRepository.updatePersona(id, persona);
    }
    
    async deletePersona(id){
        //validar que la persona exista
        const persona = await personaRepository.getPersonaById(id);
        if(!persona){
            throw new Error('Persona no encontrada');
        }
        return await personaRepository.deletePersona(id);
    }
}
module.exports = new personaService();