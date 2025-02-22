const express = require('express');
const personaController = require('../controllers/persona.controller');
const router = express.Router();

//obtener todas las personas
router.get('/', personaController.getAllPersonas);
router.get('/:id', personaController.getPersonaById);
router.post('/', personaController.createPersona);
router.put('/:id', personaController.updatePersona);
router.delete('/:id', personaController.deletePersona);

module.exports = router;