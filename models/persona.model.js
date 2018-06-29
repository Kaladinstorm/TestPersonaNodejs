const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const PersonaSchema = new Schema({
    rut: {
        type: String,
        required: true,
        /*unique: true,
        validate: { 
            validator: validators, 
            message: 'Formato rut incorrecto!'
        }*/
    },
    nombre: {
        type: String,
        required: true
    }
});

const Persona = mongoose.model('Persona', PersonaSchema);

module.exports = Persona;