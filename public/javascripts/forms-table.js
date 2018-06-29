function formateaRut(rut) {
 
    var actual = rut.replace(/^0+/, "");
    if (actual != '' && actual.length > 1) {
        var sinPuntos = actual.replace(/\./g, "");
        var actualLimpio = sinPuntos.replace(/-/g, "");
        var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        var rutPuntos = "";
        var i = 0;
        var j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
            var letra = inicio.charAt(i);
            rutPuntos = letra + rutPuntos;
            if (j % 3 == 0 && j <= inicio.length - 1) {
                rutPuntos = "." + rutPuntos;
            }
            j++;
        }
        var dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + "-" + dv;
    }
    return rutPuntos;
}

/**
 * Boton de buscar una persona
 */
jQuery("#buscar_persona button[name=btn_buscar_persona]").click( function(e) {
    e.preventDefault();

    var rut =  jQuery('[name=rut_persona]').val();

    

    if(rut.trim() === "")
    {
        alert("Debe ingresar un rut");
    } else {

        rut = formateaRut(rut);
        $.get('/api/persona/'+rut, function(persona){
        
            console.log(persona)
            jQuery("#tabla__persona tbody tr").remove();
    
            if(persona.Code === 200) {
                //var tr = jQuery('<tr><td>'+ persona.message.rut +'</td><td>'+persona.message.nombre+'</td> <td> <span class="glyphicon1 glyphicon-thumbs-up"> <button class="btn_buscar_persona" name="btn_eliminar_persona" >Eliminar</button></span></td></tr>');
               /* var trHead = jQuery('<tr></tr>');
               var thHead = jQuery('<th>Rut</th><th>Nombre</th><th></th><th></th>')

               trHead.append(thHead); */

/*                 var formTable = jQuery('<form id="form_row"></form>');
 */             var tr = jQuery('<tr></tr>');
                var tdRut = jQuery('<td>'+ persona.message.rut +'</td>');
                
                var tdNombre = jQuery('<td></td>');
                var textBoxNombre = jQuery('<input type="text" name="textRut" value="'+ persona.message.nombre +'" />');
                tdNombre.append(textBoxNombre);

                var tdButton = jQuery('<td></td>');

                var spanElement = jQuery('<span class="glyphicon1 glyphicon-thumbs-up"></span>');
                var btnEliminar = jQuery('<button class="btn_buscar_persona" id="btn_eliminar_persona" value="'+persona.message.rut+'" onClick="eliminarPersona(this.value)" >Eliminar</button>');
                var btnModificar = jQuery('<button class="btn_buscar_persona" name="btn_modificar_persona" value="'+ persona.message.rut +'" onclick="modificarPersona(this.value)" >Modificar</button>');


                spanElement.append(btnEliminar);
                spanElement.append(btnModificar);
                tdButton.append(spanElement);
                tr.append(tdRut);
                tr.append(tdNombre);
                tr.append(tdButton);
/*                 formTable.append(thHead);
                formTable.append(tr); */
                
                jQuery("#tabla__persona tbody").append(tr);
               
            } else {
                alert(persona.message);
            }
            
            jQuery('[name=rut_persona]').val('');
            jQuery('[name=nombre_persona]').val('');
            /* data.message.forEach(function(persona) {
                var tr = jQuery('<tr><td>'+ persona.rut +'</td><td>'+persona.nombre+'</td></tr>');
                jQuery("#tabla__persona").append(tr);
                
            }); */
        
        });
    }
    
});

/**
 * Agregar persona
 */
jQuery("#buscar_persona button[name=btn_agregar_persona]").click( function(e) {
    e.preventDefault();

    var rut =  jQuery('[name=rut_persona]').val();
    var nombre = jQuery('[name=nombre_persona]').val();

    rut = formateaRut(rut);

    if(rut.trim() === "" || nombre.trim() === "")
    {
        alert("No deben quedar campos vacios");
    } else {
        $.post('/api/persona', {rut: rut, nombre: nombre}, function(persona){
        
            
            jQuery("#tabla__persona tbody tr").remove();
    
            if(persona.Code === 200) {
                var tr = jQuery('<tr></tr>');
                var tdRut = jQuery('<td>'+ persona.message.rut +'</td>');
                
                var tdNombre = jQuery('<td></td>');
                var textBoxNombre = jQuery('<input type="text" name="textRut" value="'+ persona.message.nombre +'" />');
                tdNombre.append(textBoxNombre);

                var tdButton = jQuery('<td></td>');

                var spanElement = jQuery('<span class="glyphicon1 glyphicon-thumbs-up"></span>');
                var btnEliminar = jQuery('<button class="btn_buscar_persona" id="btn_eliminar_persona" value="'+persona.message.rut+'" onClick="eliminarPersona(this.value)" >Eliminar</button>');
                var btnModificar = jQuery('<button class="btn_buscar_persona" name="btn_modificar_persona" value="'+ persona.message.rut +'" onclick="modificarPersona(this.value)" >Modificar</button>');


                spanElement.append(btnEliminar);
                spanElement.append(btnModificar);
                tdButton.append(spanElement);
                tr.append(tdRut);
                tr.append(tdNombre);
                tr.append(tdButton);
/*                 formTable.append(thHead);
                formTable.append(tr); */
                
                jQuery("#tabla__persona tbody").append(tr);
            } else {
                alert(persona.message);
            } 
            
            
            jQuery('[name=rut_persona]').val('');
            jQuery('[name=nombre_persona]').val('');
            /* data.message.forEach(function(persona) {
                var tr = jQuery('<tr><td>'+ persona.rut +'</td><td>'+persona.nombre+'</td></tr>');
                jQuery("#tabla__persona").append(tr);
                
            }); */
        
        });
    }
    
})

/**
 * Elimina una persona
 * @param {*} e 
 */
function eliminarPersona(e){

    $.ajax({
        type: 'DELETE',
        url: '/api/persona',
        data: JSON.stringify({ rut: e }),
        dataType: 'json',
        contentType: 'application/json',
        success: function(){
            alert('Persona eliminada correctamente');
            jQuery("#tabla__persona tbody tr").remove();
        }
    });
}

/**
 * Llama a la api de eliminar
 * @param {*} params 
 */
function modificarPersona(params) {

    var rut = params;
    console.log(rut);
    var nombre = jQuery('[name=textRut]').val();
    console.log(nombre)

    if(nombre.trim().length <= 0) {
        alert('No debe dejar campos vacios');
    } else {

        $.ajax({
            type: 'PUT',
            url: '/api/persona',
            data: { rut: rut, nombre: nombre },
            contentType: 'application/x-www-form-urlencoded',
            success: function(data){
                alert('Persona modificada correctamente!');
                jQuery("#tabla__persona tbody tr").remove();
            }
        });  
    }
}