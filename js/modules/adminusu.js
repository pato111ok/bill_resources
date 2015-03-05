/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/*Asignar capaciaddes al usuario*/
function asignarCapacidadesUsuario(){
    $(document).delegate("#btnadminusuaddcapacidad", 'click', function(){
        var prefix = "adminusu_",
            cedusu = $.trim($(this).attr("cedusu")),
            capacidades = [];
        prefix = prefix+cedusu;
        
        $("input#"+prefix+"capacidadesnoasign:checked").each(function() {
            capacidades.push($(this).val());
        });                
        var arrdatosDatos = [], bValid=true; //se vacia el array
/******************************************/        
        arrdatosDatos = {'adminemprlistausu_capacidad' : capacidades,'adminemprlistausu_cedusu': cedusu, 'pactiontype':'asignarcapacidad'};
                               
        var url = main_path+"/modules/administracion/controlador/usuario/asignacapacidadesusu.php",
            msgtitulo = "Asignar Capacidad",
            msgsuccess = "La asignacion de capacidades ha sido correcta",
            msgerror = "Problema!! No se agregar las capacidades al usuario";
        
        if(capacidades.length<=0){
            bValid = false; msgerror = "Seleccione al menos una capacidad para agregar";
            alertaImportant(msgerror, msgtitulo);
        }
        
        if(bValid){
            var data = JSON.stringify(arrdatosDatos);
                $.ajax({
                    contentType: "application/x-www-form-urlencoded",
                    cache: false, type: "POST", dataType: "json", url: url, data: data, async:true,
                        success: function(html){
                            if(html==1){
                                alertaExito(msgsuccess, msgtitulo);
                                var capacidadasignada;
                                    $("#"+prefix+"capacidadesnoasign:checked").each(function() {
                                        capacidadasignada = $(this).parent('label');
                                        $("#"+prefix+"asignadas").append(capacidadasignada);
                                    });
                            }
                            if( html=='-1' ){ alertaError(msgerror, msgtitulo); }
                        },
                        error: function(){ alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!"); }
                });
        }    
/******************************************/
        return false;
    });
    return false;
}


/*Quitar capaciaddes al usuario*/
function quitarCapacidadesUsuario(){
    $(document).delegate("#btnadminusuremovecapacidad", 'click', function(){        
        var prefix = "adminusu_";
        var cedusu = $.trim($(this).attr("cedusu")), capacidades = [];        
        prefix = prefix+cedusu;        

        $("input#"+prefix+"capacidadesasign:checked").each(function() {
            capacidades.push($(this).val());
        });        
        var arrdatosDatos = [], bValid=true; //se vacia el array
/******************************************/        
        arrdatosDatos = {'adminemprlistausu_capacidad' : capacidades,'adminemprlistausu_cedusu': cedusu, 'pactiontype':'quitarcapacidad'};                               
        var url = main_path+"/modules/administracion/controlador/usuario/asignacapacidadesusu.php",
            msgtitulo = "Quitar Capacidad",
            msgsuccess = "Se ha removido la capacidad correctamente",
            msgerror = "Problema!! No se puede quitar las capacidades al usuario";

        if(capacidades.length<=0){
            bValid = false; msgerror = "Seleccione al menos una capacidad para quitar";
            alertaImportant(msgerror, msgtitulo);
        }
        if(bValid){
                        var data = JSON.stringify(arrdatosDatos);
                            $.ajax({
                                contentType: "application/x-www-form-urlencoded",
                                cache: false, type: "POST", dataType: "json",
                                url: url, data: data, async:true,
                                    success: function(html){
                                               if(html==1){                                  
                                                    alertaExito(msgsuccess, msgtitulo);
                                                    var capacidadasignada;                                    
                                                        $("#"+prefix+"capacidadesasign:checked").each(function() {
//                                                            $(this).attr("id", prefix+"capacidadesnoasign");
                                                            capacidadasignada = $(this).parent('label');
                                                            $("#"+prefix+"noasignadas").append(capacidadasignada);                    
                                                        });                                                    
                                                }
                                                if( html=='-1' ){ alertaError(msgerror, msgtitulo); }                                                                                                                                              
                                    },
                                    error: function(){ alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!"); }
                            });
        }    

/******************************************/
        return false;
    });
    return false;
}


function adminusu(){
    asignarCapacidadesUsuario();
    quitarCapacidadesUsuario();
   ejectSubmitFormsHtmlOutput("#adminusu_btnbuscarusu",  '#adminusu_outputbusqueda');    
}

