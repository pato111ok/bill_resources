/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function crearNuevoAnticipo(){
    $(document).on("click", '#cajanewantic_pnewanticipobtn', function(e) {
        var ptotalanticipoval = getNumericVal('#cajanewantic_ptotalanticipoval', 'float');
        if(ptotalanticipoval>0){
            $("#formclienteanticiponew").ajaxForm({
        //          target: '#outputnewanticipo'
                    dataType: 'json',
                //beforeSubmit:  validarDatosNewAnticipo,
                    success: addNewAnticipoResponse
        //          clearForm: true
            });            
        }else{
            e.preventDefault();
           alertaError('El Anticipo No Puede Ser Cero', 'Anticipo Cliente');
        }
        
    });
}

function addNewAnticipoResponse(data){
    if(data.ok >= 1){
        alertaExito('El Anticipo ha Sido Creado Correctamente', 'Anticipo Cliente');
    }
    if(data.ok == -1){
        alertaError('Problema !! sNo se pudo crear en anticipo..!!', 'Anticipo Cliente');
    }    
}
function validarDatosNewAnticipo(){
    var bValid = true, prefix = "cajanewantic_";
    var cedula = $("#"+prefix+"pcedcliente"), 
//        pefectivoval = $("#"+prefix+"pefectivoval"),
        cliente = $("#"+prefix+"cliente"),
        ptarjeta1nro = $("#"+prefix+"ptarjnro"),
        ptarjeta1fcaducidad = $("#"+prefix+"ptarjfcaducidad"),
        ptarjeta1codseguridad = $("#"+prefix+"ptarjcodseguridad"),
        pcheque1nro = $("#"+prefix+"pchequenro"),
        pcheque1nrocta = $("#"+prefix+"pchequenrocuenta"),
        pcheque1fechacobro = $("#"+prefix+"pchequefcobro"),
        ptarjeta1val = getNumericVal("#"+prefix+"ptarjcreditoval", "float"),
        pcheque1val = getNumericVal("#"+prefix+"pchequeval", "float");
        
        bValid = bValid && checkLength( cedula, cedula.attr("tittle"), cedula.attr("min"), cedula.attr("max") );
        bValid = bValid && checkLength( cliente, cliente.attr("tittle"), cliente.attr("min"), cliente.attr("max") );
        
        
//        bValid = bValid && checkLength( pefectivoval, pefectivoval.attr("tittle"), pefectivoval.attr("min"), pefectivoval.attr("max") );
        
        if(ptarjeta1val > 0){
            bValid = bValid && checkLength( ptarjeta1nro, ptarjeta1nro.attr("tittle"), ptarjeta1nro.attr("min"), ptarjeta1nro.attr("max") );
            bValid = bValid && checkLength( ptarjeta1fcaducidad, ptarjeta1fcaducidad.attr("tittle"), ptarjeta1fcaducidad.attr("min"), ptarjeta1fcaducidad.attr("max") );
            bValid = bValid && checkLength( ptarjeta1codseguridad, ptarjeta1codseguridad.attr("tittle"), ptarjeta1codseguridad.attr("min"), ptarjeta1codseguridad.attr("max") );
            var ptarjeta1nombre = $.trim($("#"+prefix+"ptarjtipo option:selected").val());
                if(ptarjeta1nombre == 0){
                    bValid = bValid && false;
                    alertaError("Es necesario que selecciones el nombre de su tarjeta de credito", "Nombre de Tarjeta de Credito");
                }
            }
            if(pcheque1val > 0){
                bValid = bValid && checkLength( pcheque1nro, pcheque1nro.attr("tittle"), pcheque1nro.attr("min"), pcheque1nro.attr("max") );
                bValid = bValid && checkLength( pcheque1nrocta, pcheque1nrocta.attr("tittle"), pcheque1nrocta.attr("min"), pcheque1nrocta.attr("max") );
                bValid = bValid && checkLength( pcheque1fechacobro, pcheque1fechacobro.attr("tittle"), 
                pcheque1fechacobro.attr("min"), pcheque1fechacobro.attr("max") );
            var pcheque1banco = $.trim($("#"+prefix+"pchequebanco option:selected").val());
                if(pcheque1banco == 0){
                    bValid = bValid && false;
                    alertaError("Es necesario que selecciones el banco de donde proviene el cheque", "Seleccione el Banco");
                }
            }
   return bValid;
}

function toggleOtrasFormasPagoAnticipo(){
    var prefixnewanticipo = 'cajanewantic_';
    $(document).delegate("#"+prefixnewanticipo+"btnotrasformaspagoanticipo",'click',function(){
        $("#"+prefixnewanticipo+"otrasformaspago").toggle();
    });
}

/********************************************************/
function buscarClienteParaNewAnticipo(){
    var prefix = 'cajanewantic_';    
//    $(document).delegate('#'+prefix+'btnbuscaclient','click',function(){
    $(document).on("click", '#'+prefix+'btnbuscaclient', function(e) {
            $('#formfindclientnewanticipo').ajaxForm({
                    success: buscaClientNewAnticipoResponse,
                    clearForm: true
            });
    }).delegate('#cajanewtransf_btnbuscaclient','click',function(){
            $('#formfindclienttransferencianew').ajaxForm({
//                    dataType: 'json', 
//                    beforeSubmit:  validateDataJForm,
                    target: '#cajanewtransf_clientnewtransfindoutput',
                    success: buscaClientNewTransfResponse,
                    clearForm: true
            });
    });
}
function buscaClientNewAnticipoResponse(data){
    var prefix = "cajanewantic_";
    if($.trim(data) != '-1'){
        $('#cajanewantic_clientfindoutput').html(data);
    }else{
        alertaError("Ocurrio un problema al obtener el cliente ...!!", "Busqueda de Cliente");
    }
}
function buscaClientNewTransfResponse(data){
    var prefix = "cajanewtransf_";
    if($.trim(data) != '-1'){
//        $("#"+prefix+"pcedcliente").val(data.cedula);
//        $("#"+prefix+"cliente").val(data.apellidos+' '+data.nombres);
        $('#cajanewtransf_clientnewtransfindoutput').html(data);
    }else{
        alertaError("Ocurrio un problema al obtener el cliente ...!!", "Busqueda de Cliente");
    }
}
/********************************************************/

function calcularTotalAnticipo(elemval){
    $(document).delegate(elemval, 'keyup change', function(){
        var prefix = 'cajanewantic_',
            pefectivoval = getNumericVal('#'+prefix+'pefectivoval', 'float'),
            ptarjcreditoval = getNumericVal('#'+prefix+'ptarjcreditoval', 'float'),
            pchequeval = getNumericVal('#'+prefix+'pchequeval', 'float'),
            ptransfval = getNumericVal('#'+prefix+'ptransfval', 'float'),
            arrTotalAnticipo = [pefectivoval,ptarjcreditoval,pchequeval,ptransfval],
            totalAnticipo = sumarValues(arrTotalAnticipo, 'float');    
            $('#'+prefix+'ptotalanticipoval').val(totalAnticipo.toFixed(numdecimales));
            $('#cajatotanticiposview').html(totalAnticipo.toFixed(numdecimales));
    });
}

function crearNuevaTransferencia(){
    $(document).on("click", '#cajanewtransf_newtransfbtn', function(e) {
        $("#formregtransferencia").ajaxForm({
    //      target: '#outputregtransferencia'
            dataType: 'json',
//            beforeSubmit:  validateDataJForm,
            success: getResponseNewAction,
            clearForm: true
        });
    });
}

function caja(){
    crearNuevaTransferencia()
    crearNuevoAnticipo()
    toggleOtrasFormasPagoAnticipo();
    buscarClienteParaNewAnticipo();
    
    calcularTotalAnticipo('#cajanewantic_pefectivoval');
    calcularTotalAnticipo('#cajanewantic_ptarjcreditoval');
    calcularTotalAnticipo('#cajanewantic_pchequeval');
    calcularTotalAnticipo('#cajanewantic_ptransfval');   
    
    
    ejectSubmitFormsHtmlOutput("#consultcajabtn2",  "#consultcajaoutput2");    
    ejectSubmitFormsHtmlOutput("#consultcajabtn3",  "#consultcajaoutput3");
    
    ejectSubmitFormsHtmlOutput("#clientanticipobtn",  "#clientanticipooutput");    
    ejectSubmitFormsHtmlOutput("#reganticipobtn",  "#reganticipo");  
    ejectSubmitFormsHtmlOutput("#addanticipobtn",  "#addanticipooutput");      
    ejectSubmitFormsHtmlOutput("#anticiposlistbtn",  "#anticiposlistoutput");
    ejectSubmitFormsHtmlOutput("#anularcompringbtn",  "#anularcompringoutput");         
    ejectSubmitFormsHtmlOutput("#cerrarcajabtn",  "#cerrarcajaoutput");  
    
}