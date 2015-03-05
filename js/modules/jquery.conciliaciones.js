/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function verChequesCustodioDialog(){
    $(document).delegate("#btnconciliacionchequescust",'click',function(){
      loadDialog("#dialogconciliaciontranf", 'max', 700,false, true,'#outputconciliaciontransf');
      $( "#dialogconciliaciontranf" ).dialog( "open" );
        
      var bValid = true,
          arrdatosDatos = {'ok' : '1'},
          msgtitulo = "Tranf. en Custodio",
          msgsuccess = "Transferencias en custodio obtenidas correctamente",
          msgerror = "Problema!! No se pudo encotrar las transferencias en custodio, contacte con admin@masterpc.com.ec",
          areacarga = "#outputconciliaciontransf";
          var url = main_path+"/modules/conciliaciones/controlador/anticipos/chequescustodioget.php";
          loadUrlJson2(url, bValid, arrdatosDatos, null, msgtitulo, msgsuccess, msgerror, areacarga);        
    });        
}

function verTarjCredCustodioDialog(){      
    $(document).delegate("#btnconciliaciontarjcreditocust",'click',function(){
      loadDialog("#dialogconciliaciontranf", 'max', 700,false, true,'#outputconciliaciontransf');
      $( "#dialogconciliaciontranf" ).dialog( "open" );
        
      var bValid = true,
          arrdatosDatos = {'ok' : '1'},
          msgtitulo = "Tranf. en Custodio",
          msgsuccess = "Tarjetas credito en custodio obtenidas correctamente",
          msgerror = "Problema!! No se pudo encotrar las tarjetas de credito en custodio, contacte con admin@masterpc.com.ec",
          areacarga = "#outputconciliaciontransf";
          var url = main_path+"/modules/conciliaciones/controlador/anticipos/tarjcredcustodioget.php";
          loadUrlJson2(url, bValid, arrdatosDatos, null, msgtitulo, msgsuccess, msgerror, areacarga);        
    });        
}

function conciliacionAnticipoTransfer(){
    $(document).delegate("#btnaprovartranf",'click',function(){
        var objThis = $(this), contacuentasplancod = objThis.attr('contacuentasplancod'),
            valorpago = objThis.attr('valor'),
            cedcliente = objThis.attr('cedcliente'),
            transfid = objThis.attr('transfid');
        
        var arrdatosDatos = {'contacuentasplancod':contacuentasplancod,'valorpago':valorpago,
                                'cedcliente':cedcliente,'transfid':transfid},
            url = main_path+"/modules/conciliaciones/controlador/anticipos/aprovaranticipotranf.php",
            msgtitulo = "Aprobacion de Anticipo",
            msgsuccess = "Anticipo Aprobado Correctamente",
            msgerror = "Problema!! No se aprobar el anticipo";

            var data = JSON.stringify(arrdatosDatos);
                $.ajax({
                    contentType: "application/x-www-form-urlencoded",                                
                    type: "POST",dataType: "json",
                    url: url, data: data, async:true,                                     
                        success: function(html){
                            html=$.trim(html);
                                if(html==1){
                                    alertaExito(msgsuccess, msgtitulo);
                                    objThis.parent('td').parent('tr').addClass('success');
                                }
                                if( html==-1 ){alertaError(msgerror, msgtitulo);}
                        },
                        error: function(){
                            alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!");
                        },
                        cache: false
                });
    });
}

/*Conciliacion de cheques en custodio*/
function conciliacionChequesCustodio(){
    $(document).delegate("#btnaprovarchequecust",'click',function(){
        var bancocod = $(this).attr('bancocod'), nrocheque = $(this).attr('nrocheque'),
            cedcliente = $(this).attr('cedcliente'), tipopagocod = $(this).attr('tipopagocod');
        
        var arrdatosDatos = {'bancocod':bancocod,'nrocheque':nrocheque,
                                'cedcliente':cedcliente,'tipopagocod':tipopagocod},
            url = main_path+"/modules/conciliaciones/controlador/anticipos/chequescustodioconciliacion.php",
            msgtitulo = "Conciliacion de Cheques",
            msgsuccess = "Conciliacion de Cheque Aprobada Correctamente",
            msgerror = "Problema!! No se aprobar la conciliacion del cheque";
        //loadUrlJson(url, bValid, arrdatosDatos, allFields_empr, msgtitulo, msgsuccess, msgerror);
        loadUrlJson(url, true, arrdatosDatos, null, msgtitulo, msgsuccess, msgerror);
    });
}

/*Conciliacion de tarjetas de credito en custodio*/
function conciliacionTCCustodio(){
    $(document).delegate("#btnaprovartarjcust",'click',function(){
        var bancocod = $(this).attr('bancocod'), valorpago = $(this).attr('valorpago'),
            cedcliente = $(this).attr('cedcliente'), tipopagocod = $(this).attr('tipopagocod'),
            fecha = $(this).attr('fecha'), hora = $(this).attr('hora');
        
        var arrdatosDatos = {'bancocod':bancocod,'valorpago':valorpago,
                                'cedcliente':cedcliente,'tipopagocod':tipopagocod, 
                                'fecha':fecha, 'hora':hora},
            url = main_path+"/modules/conciliaciones/controlador/anticipos/tarjcredcustodioconciliacion.php",
            msgtitulo = "Conciliacion de Tarjetas Credito",
            msgsuccess = "Conciliacion de Tarjeta Credito Aprobada Correctamente",
            msgerror = "Problema!! No se ha podido aprobar la conciliacion de la tarjeta de credito..";
            //loadUrlJson(url, bValid, arrdatosDatos, allFields_empr, msgtitulo, msgsuccess, msgerror);
            loadUrlJson(url, true, arrdatosDatos, null, msgtitulo, msgsuccess, msgerror);
    });
}

function changeConcilSection(){
//    $(document).delegate("#"+prefix+"btnnewpuntoventa",'click',function(){
    $(document).on("click", '#btnconciliaciontransf', function(e) {
        $('#conciltittlesection').html($(this).attr('title'));
        $('.concilmodule').slideUp(700);
        $('#conciltransfxaprovar').slideDown(700)
    }).on('click', '#btnclienteanticipoget', function(e) {
        $('#cajatittlesection').html($(this).attr('title'));
        $('.cajamodule').slideUp(700);
        $('#cajalistaanticipos').slideDown(700)
    }).on('click', '#btnregtransferencia', function(e) {
        $('#cajatittlesection').html($(this).attr('title'));
        $('.cajamodule').slideUp(700);
        $('#cajatransferencianew').slideDown(700)
    })
}

function jquery_conciliaciones(){
    changeConcilSection()
    conciliacionAnticipoTransfer();
    verChequesCustodioDialog();
    verTarjCredCustodioDialog();
    conciliacionChequesCustodio();
    conciliacionTCCustodio();
}