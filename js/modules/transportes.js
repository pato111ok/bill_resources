function selectDestino(){
   $(document).on("change", "#destinoruta", function(e) {
       var continuar = true;
//        if(!$("#selectedruta").is(':checked')) {
//             e.preventDefault();
//             alertaError('DEBE SELECCIONAR LA RUTA','');
//             continuar = false;
//        }
        if($('#newbolclientid').length > 0){
           if($('#newbolclientid').val() != '' && $('#newbolclientid').val() != 'undefined'){
               continuar = true;
           }else{
               continuar = false;
               $('#cedula_new_client').focus();               
           }
        }else{
            continuar = false;
            $('#cedula_new_client').focus();
        }
        
        if(continuar){
            var form = $(this).parents('form');
            $(form).ajaxSubmit({
                url: main_path+'/modules/trans/controlador/destinofind.php',
//            target:     '#findbusout'
                dataType:  'json', 
                success: getSelectDestino
            });
        }else{
            alertaError('PRIMERAMENTE SELECCIONE EL CLIENTE','');
            $('#cedula_new_client').focus();
        }                
//        return false;
   });
   
}

function getSelectDestino(data){
//   alert(data.error);
   if(data.error == 0){
       var costo = parseFloat(data.costo);
           costo = costo.toFixed(numdecimales);
        $('#destinopasajero').val(data.destino);
        calcularTotalBoleto(data.costo);
        alertaExito(data.message,'');
        $('.btnasiento').focus();
   }
   if(data.error == 1){
        alertaError(data.message,'');
   }
}

function calcularTotalBoleto(costo){
        $('#costo_a_destino').val(costo);
//        $('#costo_a_destino_real').val(costo); //nunca aplica descuento x tipo de cliente
        var cantidad_boletos = $("input[name='asiento[]']:checked").length,
            costo_a_destino = getNumericVal('#costo_a_destino','float'),
            total = costo_a_destino * cantidad_boletos;
        $('#viewcostotot').html(total.toFixed(numdecimales));    
}

function validateNewBoleto(){
        var continuar = true,    
            horasalida = $('#horasalida').val(),
            bus = $('#bus').val();
        if(horasalida == '' || horasalida == 'undefined' || bus == '' || bus == 'undefined'){
            continuar = false;
        }
       
       if(continuar){
            var hsalida = $('#newbolhsalida').val(),
                pasa = true,
                asiento = $("input[name='asiento[]']:checked").length;
                asiento = parseInt(asiento);

            if(asiento <= 0){
                 alertaError('DEBE SELECCIONAR EL ASIENT0','');
                 pasa = pasa && false;
//                 return true;
            }else{
                pasa = pasa && true;
            }           

//            if(!$("#selectedruta").is(':checked')) {
//                 alertaError('DEBE SELECCIONAR LA RUTA','');
//                 pasa = pasa && false;
//            } else {
//                pasa = pasa && true;
//            }

            if(!$('#newbolclientid').length){
                 alertaError('DEBE SELECCIONAR UN CLIENTE','');            
                 pasa = pasa && false;
            }else{
                pasa = pasa && true;           
            }
            if(hsalida == '' || hsalida == 'undefined'){
                 alertaError('DEBE INGRESAR LA HORA DE SALIDA','');            
                 pasa = pasa && false;                 
            }else{
                pasa = pasa && true;           
            }  

           if(pasa){
            $('#namenewclient').val('');
            $('#apellidosnewclient').val('');
            $('#cedula_new_client').val('');
//               $('#newboletobtn').hide();
//               $('#activateboletonewout').show();
//                $('#clientboletooutput').html('<span class="text-danger"><i class="glyphicon glyphicon-user"></i>&nbsp;<strong>Seleccione el cliente</strong></span>');
           }

       }else{
            alertaError('Seleccione la hora de salida y el numero del bus','');
       }
     return pasa;             
}

function crearBoleto(){
    
   $('input').on('keyup', null, 'f9', function(){
        var outputelem = 'newboletoprintbtn';
    var loadingbar = '<div class="progress"> <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%"> <span class="sr-only">45% Complete</span> </div> </div>';
    $("#"+outputelem).html(loadingbar);        
        var form = '#formnewboleto';
        $(form).ajaxSubmit({
            beforeSubmit : validateNewBoleto,
            target: "#"+outputelem 
        });
        return false;
    });
    
   $(document).on('keyup', null, 'f9', function(){
        var outputelem = 'newboletoprintbtn';
    var loadingbar = '<div class="progress"> <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%"> <span class="sr-only">45% Complete</span> </div> </div>';
    $("#"+outputelem).html(loadingbar);        
        var form = '#formnewboleto';
        $(form).ajaxSubmit({
            beforeSubmit : validateNewBoleto,
            target: "#"+outputelem 
        });
        return false;
    });     
    
    $(document).on("click", '#newboletobtn', function(e) {
    var outputelem = $(this).attr('data-target');
    var loadingbar = '<div class="progress"> <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%"> <span class="sr-only">45% Complete</span> </div> </div>';
    $("#"+outputelem).html(loadingbar);        
        var form = $(this).parents('form');
        $(form).ajaxForm({
            beforeSubmit : validateNewBoleto,
            target: "#"+outputelem 
        });
//        return false;
    });     
}

function anularFactura(){
    $(document).on("keypress", 'form#formanularfact', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault(); /* prevent native submit*/
        } 
        return false;
    });
    $(document).on("click", "#anularfactbtn", function(e) {
        var objThis = $(this);
        bootbox.confirm("<h2><span class='glyphicon glyphicon-question-sign'></span>&nbsp;Seguro que desea anula la factura?</h2> <h4 class='text-info'>No se podra deshacer los cambios</h4>", function(result) {
            if(result){
                var form = $(objThis).parents('form');                
                $(form).ajaxSubmit({dataType:  'json', success: getResponseAnularFactura});
            }
        });
        return false;
    });
}

function getResponseAnularFactura(data){
    if(data.ok > 0){
        alertaExito('La factura ha sido anulada correctamente', 'Anular Factura');
        $("#anularfactmodal"+data.fact).parents('tr').addClass('text-muted danger');
    }else if(data.ok == -2){
        alertaError('Solamente puede anular facturas archivadas en el mismo dia de la anulacion, y que no hayan sido anuladas previamente','Anular Factura');
    }else{
        alertaError('No se ha podido completar la anulacion de la factura!','Anular Factura');    
    }
}

function selectRuta(){
    $(document).on("change", "#selectedruta", function(e) {
        var objThis = $(this),
            continuar = true,
            horasalida = $('#horasalida').val(),
            bus = $('#bus').val();

        if(horasalida == '' || horasalida == 'undefined' || bus == '' || bus == 'undefined'){
            continuar = false;
        }
        if(continuar){
            var form = $(this).parents('form');
            $(form).ajaxSubmit({
                url: main_path+'/modules/trans/controlador/findbus.php',
                dataType:  'json', 
                success: getSelectRuta
            });  
            var destinopasajero = objThis.attr('rutaname').split("-");
            $('#destinopasajero').val($.trim(destinopasajero[1]));
            $('.btnasiento').focus();
        }else{
            alertaError('Seleccione la hora de salida y el numero del bus','');
//            $("input:radio").removeAttr("checked");
//            $("input[id='selectedruta']:checked").removeAttr("checked");
//            $('#selectedruta').parent('label').removeClass("active");
//            objThis.parents('label').addClass("active").siblings().removeClass("active");                   
        }
//        return false;
    });

    $(document).on("keyup", "#bus", function(e) {
        var objThis = $(this),
            continuar = true,
            horasalida = $('#horasalida').val(),
            bus = $('#bus').val();

        if(horasalida == '' || horasalida == 'undefined' || bus == '' || bus == 'undefined'){
            continuar = false;
        }
        if(continuar){
            var form = $(this).parents('form');
            $(form).ajaxSubmit({
                url: main_path+'/modules/trans/controlador/findbus.php',
                dataType:  'json', 
                success: getSelectRuta
            });
//            var destinopasajero = $("input[id='selectedruta']:checked").attr('rutaname');
//            destinopasajero = destinopasajero.split("-");
//            $('#destinopasajero').val($.trim(destinopasajero[1]));   
//            $('.combobox').val('');
//            $('.btnasiento').focus();
        }else{
            alertaError('Seleccione la hora de salida y el numero del bus','');
        }
        return false;
    });

    $(document).on("keyup", "#horasalida", function(e) {
        var objThis = $(this),
            continuar = true,
            horasalida = $('#horasalida').val(),
            bus = $('#bus').val();

        if(horasalida.length < 5 || horasalida == '' || horasalida == 'undefined' || bus == '' || bus == 'undefined'){
            continuar = false;
        }
//        alert(continuar)
        if(continuar){
            var form = $(this).parents('form');
            $(form).ajaxSubmit({
                url: main_path+'/modules/trans/controlador/findbus.php',
                dataType:  'json', 
                success: getSelectRuta
            });  
            
            var destinopasajero = $("input[id='selectedruta']:checked").attr('rutaname');
            destinopasajero = destinopasajero.split("-");
            $('#destinopasajero').val($.trim(destinopasajero[1]));   
            $('.combobox').val('');
            $('.btnasiento').focus();
        }else{
            alertaError('Seleccione la hora de salida y el numero del bus','');
            /* buses desactivados si esta mal escrita la hora */
            $('.btnasiento').attr('disabled','disabled');
            $('.btnasiento').parent('label').removeClass('btn-success');
            $('.btnasiento').parent('label').addClass('btn-default');
            $('.btnasiento').parent('label').addClass('active');              
        }
        return false;
    });
}

function getSelectRuta(data){
//    alert(data.error);    
    
    $('.btnasiento').removeAttr('disabled');
    $('.btnasiento').parent('label').removeClass('btn-danger');                
    $('.btnasiento').parent('label').addClass('btn-success');
    $('.btnasiento').parent('label').removeClass('active');    
    
        if(data.error == 0){
            var i = parseInt(data.numbuses)+1,
                aocupados = data.aocupado,
                arrocupados = aocupados.split(',');
//            alert(aocupados)
            for( i; i <= 50; i++){
                $('#asiento'+i).attr('disabled','disabled');
                $('#asiento'+i).parent('label').removeClass('btn-success');
                $('#asiento'+i).parent('label').addClass('btn-default');
                $('#asiento'+i).parent('label').addClass('active');
            }
//                $('.btnasiento').attr('disabled','disabled');
//                $('.btnasiento').parent('label').removeClass('btn-success');
//                $('.btnasiento').parent('label').addClass('btn-default');
//                $('.btnasiento').parent('label').addClass('active');                        
                        

            $.each( arrocupados, function( key, value ) {
                if(value != 100){
                    $('#asiento'+value).attr('disabled','disabled');
                    $('#asiento'+value).parent('label').removeClass('btn-default');
                    $('#asiento'+value).parent('label').addClass('btn-danger');                     
                }               
                $("input[id='asiento"+value+"']:checked").removeAttr("checked");
                
            }); 
            
            var punit = parseFloat(data.punit).toFixed(numdecimales);
            $('#costo_a_destino_real').val(punit);
           
            getPreciosTipoCliente();            
            calcularTotalBoleto(punit);
            
            $('#rutanameout').html('<span class="text-success">'+data.rutaname+'&nbsp;<i class="glyphicon glyphicon-ok"></i></span>');
        }
        if(data.error == 1){
            alertaError(data.message,'');            
            $('#rutanameout').html('<span class="text-danger">'+data.rutaname+'&nbsp;<i class="glyphicon glyphicon-remove"></i></span>');
//            $("input[id='selectedruta']:checked").removeAttr("checked");
//            $('#selectedruta').parent('label').removeClass("active");
            if($.trim(data.errortype) == 'bus'){
                $('#bus').val('');
            }
            if($.trim(data.errortype) == 'hsalida'){
                $('#horasalida').val('');
            }
            
            /* buses desactivados si es que no se encontro turnos */
            $('.btnasiento').attr('disabled','disabled');
            $('.btnasiento').parent('label').removeClass('btn-success');
            $('.btnasiento').parent('label').addClass('btn-default');
            $('.btnasiento').parent('label').addClass('active');             
            
        }        


}

function selectAsiento(){
    $(document).on("click", ".btnasiento", function(e) {
        var costo = getNumericVal('#costo_a_destino','float');
        calcularTotalBoleto(costo.toFixed(numdecimales));
//            getPreciosTipoCliente();
//        return false;
    });

}

function cambiarPUnit(){
    $(document).on("keyup", "#costo_a_destino", function(e) {
//        var costo = getNumericVal('#costo_a_destino','float');
        
        var cantidad_boletos = $("input[name='asiento[]']:checked").length,
            costo_a_destino = getNumericVal('#costo_a_destino','float'),
            total = costo_a_destino * cantidad_boletos;
        $('#viewcostotot').html(total.toFixed(numdecimales));            
        
//        calcularTotalBoleto(costo.toFixed(numdecimales));
//        return false;
    });    
}

function loadClient(){
    $(document).on("click", '#loadclientbtn', function(e) {
      var btn = $(this), outputelem = $(this).attr('data-target');
      var loadingbar = '<div class="progress"> <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%"> <span class="sr-only">45% Complete</span> </div> </div>';        
//            $("#"+outputelem).html('<img alt="Espere..." src="'+main_path+'/css/img/loading2.gif'+'">Cargando Cliente...');        
            $("#"+outputelem).html(loadingbar);
        var form = $(this).parents('form');
        $(form).ajaxForm({
            target: "#"+outputelem,
            success: getPreciosTipoCliente
        });
        
        $("#formnewboleto").ajaxSubmit({
            url: main_path+'/modules/trans/controlador/findbus.php',
            dataType:  'json', 
            success: getSelectRuta
        });         
//        return false;        
    });

    $(document).on("keyup", '#cedula_new_client', function(e) {
        e.preventDefault(); /* prevent native submit*/       
        var numcedula = $("#cedula_new_client").val();
        if (numcedula.length == 10 || numcedula.length == 13) {
            var btn = $(this), outputelem = $(this).attr('data-target');
            var loadingbar = '<div class="progress"> <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%"> <span class="sr-only">45% Complete</span> </div> </div>';                    
//                $("#"+outputelem).html('<img alt="Espere..." src="'+main_path+'/css/img/loading2.gif'+'">Cargando Cliente...');        
                $("#"+outputelem).html(loadingbar);        
            var form = $(this).parents('form');
            $(form).ajaxSubmit({
//                url: main_path+'/modules/trans/controlador/findclient.php',
                target: "#"+outputelem,
                success: getPreciosTipoCliente
            });

            $("#formnewboleto").ajaxSubmit({
                url: main_path+'/modules/trans/controlador/findbus.php',
                dataType:  'json', 
                success: getSelectRuta
            });
            
            var destinopasajero = $("input[id='selectedruta']:checked").attr('rutaname');
            destinopasajero = destinopasajero.split("-");
            $('#destinopasajero').val($.trim(destinopasajero[1])); 
            $('.btnasiento').focus();            
        }
//        return false;        
    });  
    
    $(document).on("focusout", '#apellidosnewclient', function(e) {
            var outputelem = $(this).attr('data-target');
                $("#"+outputelem).html('<img alt="Espere..." src="'+main_path+'/css/img/loading2.gif'+'">Cargando Cliente...');        
            var form = $(this).parents('form');
            $(form).ajaxSubmit({
                target: "#"+outputelem,
                success: getPreciosTipoCliente
            });
//        return false;            
    }); 

    $(document).on("keyup", '#namenewclient', function(e) {
        if (e.keyCode == 32) {
            $( "#apellidosnewclient" ).focus();            
        }
//        return false;        
    }); 
}

function getPreciosTipoCliente(){
//    $('#namenewclient').val('');
//    $('#apellidosnewclient').val('');
    var punit = getNumericVal('#costo_a_destino_real','float'),
        descpunit = getNumericVal('#clientdescid','float'); // puede haber descuento de acuerdo al tipo de cliente
    if(descpunit > 0){
        var desc = (punit * descpunit)/100;
        punit = punit - desc;
    }
    $('#costo_a_destino').val(punit);
    calcularTotalBoleto(punit);   
    $(".combobox").focus();    
    $("input[name='observaciones']").val('');
}

function accesorapido(){
    // e.g. replace '$' sign with 'EUR'
    $(document).on('keyup', null, 'h', function(){
//      $('#horasalida').val('');
      $('#horasalida').focus();return false;
    });
    $(document).on('keyup', null, 'b', function(){
//      $('#bus').val('');
      $('#bus').focus();return false;
    });
    $(document).on('keyup', null, 'd', function(){
//      $('#bus').val('');
      $('.combobox').focus();return false;      
    });

    $(document).on('keyup', null, 'shift+e', function(e){
//  var value = String.fromCharCode(e.keyCode);
        selectEncomienda();
        return false;
    });
    $('input').on('keyup', null, 'shift+e', function(e){
        selectEncomienda(); return false;
    });

    $(document).on('keyup', null, 'shift+n', function(e){ 
        $('#cedula_new_client').focus(); return false;
    });
    $(document).on('keyup', null, 'f1', function(e){
        $('#cedula_new_client').focus(); return false;
    });
    $('input').on('keyup', null, 'f1', function(e){ 
        $('#cedula_new_client').focus(); return false;
    });
    $('input').on('keyup', null, 'up', function(e){ 
        $('#cedula_new_client').focus(); return false;
    });
    $(document).on('keyup', null, 'shift+a', function(e){
        for( i = 1; i <= 50; i++){
            if(!$('#asiento'+i).is(':disabled')) {
                $('#asiento'+i).prop('checked',true);
                $('#asiento'+i).focus();
                break;
            }
        }
            var costo = getNumericVal('#costo_a_destino','float');
            calcularTotalBoleto(costo.toFixed(numdecimales));        
            $('input[name="observaciones"]').focus();    
            $('input[name="observaciones"]').val('');        
//        return false;
    });
    $('input').on('keyup', null, 'shift+a', function(e){
        for( i = 1; i <= 50; i++){
            if(!$('#asiento'+i).is(':disabled')) {
                $('#asiento'+i).prop('checked',true);
                $('#asiento'+i).focus();
                break;
            }
        }
            var costo = getNumericVal('#costo_a_destino','float');
            calcularTotalBoleto(costo.toFixed(numdecimales));        
            $('input[name="observaciones"]').focus();    
            $('input[name="observaciones"]').val('');            
//        return false;
    });
    $(document).on('click', '#opencalcbtn', function(e){
           $( '.container-fluid' ).jsPanel({
            size: { width: 360, height: 460 },
//            theme: 'info',
            title:    'CALCULADORA',
            
            overflow: 'hidden',
            position:  { top: 0, left: 15},
            theme: 'info', controls: { iconfont: 'bootstrap' },
//            controls: { buttons: 'closeonly', iconfont: 'font-awesome' },
            ajax: {
                url: main_path+'/modules/comunes/vista/calculadora/calculadora.php'
            }
            });
//        return false;            
    });
}

function selectEncomienda(){
    if($("#asiento100").is(':checked')) {
        $("#asiento100").prop("checked",false);
    }else{
        $("#asiento100").prop("checked",true);
    }
    var costo = getNumericVal('#costo_a_destino','float');
    calcularTotalBoleto(costo.toFixed(numdecimales));        
    $('input[name="observaciones"]').focus();    
    $('input[name="observaciones"]').val('');
}

function transportes(){
    accesorapido();
    loadClient();
    cambiarPUnit();
    selectAsiento();
    selectRuta();
    anularFactura();
    selectDestino();   
    crearBoleto();        
}