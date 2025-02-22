const Persona = require('../models/persona.model');


class personaRepository {
    //buscar todas las personas
    async getAllPersonas() {
        return await Persona.find();
    }

    // buscar por id
    async getPersonaById(id) {
        return await Persona.findById(id);
    }

    // buscar por rfc
    async getPersonaByRFC(rfc) {
        return await Persona.findOne({rfc: rfc});
    }

    // buscar por correo
    async getPersonaByCorreo(correo) {
        return await Persona.findOne({correo: correo});
    }

    // crear persona
    async createPersona(persona) {
        return await Persona.create(persona);
    }

    // actualizar persona
    async updatePersona(id, persona) {
        return await Persona.findByIdAndUpdate(id, persona, {new: true});
    }

    // eliminar persona
    async deletePersona(id) {
        return await Persona.findByIdAndDelete(id);
    }

    //Buscar si hay otro rfc igual de la persona que le estoy mandando(id)
    //el rfc sea igual al rfc que le estoy mandando
    //y el id sea diferente al id que le estoy mandando $ne
    async getPersonaByRFCAndNotId(rfc, id) {
        return await Persona.findOne({_id: {$ne: id, rfc: rfc}});
    }
    async getPersonaByCorreoAndNotId(correo, id) {
        return await Persona.findOne({_id: {$ne: id, correo: correo}});
    }

}

module.exports = new personaRepository();