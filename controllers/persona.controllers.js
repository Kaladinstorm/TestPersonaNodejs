
const Persona = require('../models/persona.model');
const validators = require('../utils/validators');



/**
 * Generador de mensajes
 * @param {*} error 
 * @param {*} mensaje 
 */
const generadorMensaje = function(error, mensaje) {
    return {
        'error' : error,
        'msg': mensaje
    }
};

const validaNombre = function(nombre) {
    if(nombre.toString().trim().length > 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * valida que el rut sea real
 * @param {*} rut 
 */
const validaRut = function(rut) {
    return new Promise(function(resolve, reject) {
        if(validators.checkRut(rut)) {
            resolve(rut);
        } else {
            reject(generadorMensaje('RutNoValido', `ERROR: el ${rut} no es valido!`));
        }
    });
};

/**
 * valida que el rut sea unico
 * @param {*} rut 
 */
const validaRutUnico = function(rut) {
    return new Promise(function(resolve, reject) {
        Persona.findOne({ rut: rut }, function(error, persona) {
            if(error) {
                throw error;
            } else {
                if(persona) {
                    reject(generadorMensaje('RutYaExiste', `ERROR: el ${rut} ya existe!`));
                } else {
                    resolve(true);
                }
            }
        });
    });
}

/**
 * Agregar persona
 * @param {*} persona 
 */
module.exports.agregarPersona = async function(persona) {

    try {
        const verificaRutValido = await validaRut(persona.rut);
        const verificaRutUnico = await validaRutUnico(persona.rut);
        

        if(verificaRutUnico){
        
            if(validaNombre(persona.nombre.toString())){
                const newPersona = new Persona({
                    rut: persona.rut,
                    nombre: persona.nombre
                });
                newPersona.save(function(err) {
                    if(err) {
                        throw err;
                    } 
                });
                return persona;
            } else {
                throw generadorMensaje('CampoVacio', `ERROR: El nombre no debe estar vacio!`);
            }
            
        }
    } catch(e) {
        
        if(e.error === 'CampoVacio'){
            throw e;
        } 
        else {
            throw e;
        }
    }  
};

/**
 * Modifica el nombre solamente de la persona
 * @param {*} persona 
 */
module.exports.modificaPersona = function(persona) {

    return new Promise(function(resolve, reject) {

        if(validaNombre(persona.nombre.toString())){

             Persona.findOneAndUpdate({ rut: persona.rut }, { nombre: persona.nombre}, function(error, data) {
                if(error) {
                    reject(generadorMensaje('Error', error));
                } else {
                    if(data) {
                        resolve(persona);
                    } else {
                        reject(generadorMensaje('NoExisteLaPersona', `No existe la persona con el rut ${ persona.rut }.`));
                    }
                }
            }); 
    
        } else {
            reject(generadorMensaje('CampoVacio', `ERROR: El nombre no debe estar vacio!`));
        }

    });
}

/**
 * Elimina la persona buscando por rut
 * @param {*} rut 
 */
module.exports.eliminarPersona = function(rut) {
    return new Promise(function(resolve, reject) {
        if(rut.toString().trim().length > 0) {
            Persona.findOneAndRemove({ rut: rut }, function(error, data) {
                if(error) {
                    reject(generadorMensaje('Error', error));
                } else {
                    if(data) {
                        resolve(data);
                    } else {
                        reject(generadorMensaje('NoExisteLaPersona', `No existe la persona con el rut ${ rut }.`));
                    }
                }
            })
        } else {
            reject(generadorMensaje('CampoVacio', `ERROR: El rut no debe estar vacio!`))
        }
    });
}

/**
 * Busca a una persona por el rut
 * @param {*} rut 
 */
module.exports.buscaPersona = function(rut) {
    return new Promise(function(resolve, reject) {
        if(rut.toString().trim().length > 0) {
            Persona.findOne({ rut: rut }, function(error, data) {
                if(error) {
                    reject(generadorMensaje('Error', error));
                } else {
                    if(data) {
                        resolve(data);
                    } else {
                        reject(generadorMensaje('NoExisteLaPersona', `No existe la persona con el rut ${ rut }.`));
                    }
                    
                }
            })
        } else {
            reject(generadorMensaje('CampoVacio', `ERROR: El rut no debe estar vacio!`))
        }
    });
}

/**
 * Trae a todas las personas
 */
module.exports.listaPersonas = function() {
    return new Promise(function(resolve, reject) {
        Persona.find({}, function(error, data) {
            if(error) {
                reject(generadorMensaje('Error', error));
            } else {
                if(data) {
                    resolve(data);
                } else {
                    reject(generadorMensaje('NoExisteLaPersona', `No existen personas en la BD`));
                }
            }
        });
    });
}
