/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var jspanel_lodaproducts;
function openLoadProductsPanel(event, elem ){
    $(document).on(event, elem, function(e){
        open_loadprodpanel();
        return false;
    });
}

function open_loadprodpanel(){
        var content = $('#searchproductview').html();
        var lodaproductsopt = {
            size: { width: '99%', height: 300 }, title:    'CARGAR PRODUCTOS', overflow: 'auto',
            position:  {bottom: 0, left: 5}, controls: { iconfont: 'bootstrap' },
            content: '<div style="margin:10px">'+content+'<br class="clr"/><div id="searchproductoutput" class="col-md-12"></div></div>'
        };        
        if (jspanel_lodaproducts){
            jspanel_lodaproducts.close();
//            alert('aqui');
            jspanel_lodaproducts = $( '.row' ).jsPanel(lodaproductsopt);
        }else{
//            alert('aca');
            jspanel_lodaproducts = $( '.row' ).jsPanel(lodaproductsopt);  
        }
}

/* establecemos campos requeridos en la forma de pago */
function forma_pago_required(){
   $(document).on("keyup", "#diferido_val_venta", function(e) {
       restar_de_efectivo();
       var diferido_val = parseFloat($(this).val());
       if(!isNaN(diferido_val) && diferido_val != ''){
           $("#diferido_cuotas").attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
//           $("#diferido_cuantas").attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
       }else{
           $("#diferido_cuotas").removeAttr('required').css('background-color','#fff');
//           $("#diferido_cuantas").removeAttr('required').css('background-color','#fff');
       }
   });

    $(document).on("keyup", "#credito_val", function(e) {
       restar_de_efectivo();
       var credito_val = parseFloat($(this).val());
       if(!isNaN(credito_val) && credito_val != ''){
           $("#credito_vence").attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
       }else{
           $("#credito_vence").removeAttr('required').css('background-color','#fff');
       }
   });
   
    $(document).on("keyup", "#anticipo_val", function(e) {
       restar_de_efectivo();
//       var anticipo_val = parseFloat($(this).val());
//       if(!isNaN(anticipo_val) && anticipo_val != ''){
//           $("#credito_vence").attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
//       }else{
//           $("#credito_vence").removeAttr('required').css('background-color','#fff');
//       }
   });
   
    $(document).on("keyup", "#ret_val", function(e) {
       restar_de_efectivo();
       var ret_val = parseFloat($(this).val());
       if(!isNaN(ret_val) && ret_val != ''){
           $(this).next('input').attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
           $(this).next('input').next('input').attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
           $(this).next('input').next('input').next('input').attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
//           $("#credito_vence").attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
       }else{
           $(this).next('input').removeAttr('required').css('background-color','#fff');
           $(this).next('input').next('input').removeAttr('required').css('background-color','#fff');
           $(this).next('input').next('input').next('input').removeAttr('required').css('background-color','#fff');
//         $("#credito_vence").removeAttr('required').css('background-color','#fff');
       }
   });
   
    $(document).on("keyup", "#cheque_val", function(e) {
       restar_de_efectivo();
       var diferido_val = parseFloat($(this).val());
       if(!isNaN(diferido_val) && diferido_val != ''){
           $(this).next('input').attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
           $(this).next('input').next('input').attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
           $(this).next('input').next('input').next('input').attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
//           $("#credito_vence").attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
       }else{
           $(this).next('input').removeAttr('required').css('background-color','#fff');
           $(this).next('input').next('input').removeAttr('required').css('background-color','#fff');
           $(this).next('input').next('input').next('input').removeAttr('required').css('background-color','#fff');
//         $("#credito_vence").removeAttr('required').css('background-color','#fff');
       }
   });

    $(document).on("keyup", "#tarjeta_val", function(e) {
       restar_de_efectivo();
       var diferido_val = parseFloat($(this).val());
       if(!isNaN(diferido_val) && diferido_val != ''){
           $(this).next('input').attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
           $(this).next('input').next('input').attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
           $(this).next('input').next('input').next('input').attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
//           $("#credito_vence").attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
       }else{
           $(this).next('input').removeAttr('required').css('background-color','#fff');
           $(this).next('input').next('input').removeAttr('required').css('background-color','#fff');
           $(this).next('input').next('input').next('input').removeAttr('required').css('background-color','#fff');
//         $("#credito_vence").removeAttr('required').css('background-color','#fff');
       }
   });
}

/* Cuando se registra otras formas de pago, el efectivo se va restando */
function restar_de_efectivo(){
    var total_venta = getNumericVal('#total_venta','float');
    var anticipo_val = 0;
    var credito_val = 0;
    var diferido_val_venta = getNumericVal('#diferido_val_venta','float');

    if($('#anticipo_val').length > 0){
        anticipo_val = getNumericVal('#anticipo_val','float');
    }
    if($('#credito_val').length > 0){
        credito_val = getNumericVal('#credito_val','float');
    }

    var tarjeta_val = 0;
        if($('#tarjeta_val').length > 0){
            $("input#tarjeta_val").each(function(e) {
                var val = parseFloat($(this).val());
                if(!isNaN(val) && val != ''){            
                    tarjeta_val += val;
                }
            });            
        }

    var cheque_val = 0;
        if($('#cheque_val').length > 0){
            $("input#cheque_val").each(function(e) {
                var val = parseFloat($(this).val());
                if(!isNaN(val) && val != ''){            
                    cheque_val += val;            
                }
            });              
        }    
        
    /* lo que dejan en retenciones */
    var ret_val = 0;
        if($('#ret_val').length > 0){
            $("input#ret_val").each(function(e) {
                var val = parseFloat($(this).val());
                if(!isNaN(val) && val != ''){            
                    ret_val += val;            
                }
            });              
        }    
 
    if($('#efectivo_val').length > 0){
        var new_efectivo_val = total_venta - anticipo_val - credito_val - diferido_val_venta - tarjeta_val - cheque_val - ret_val;
        if(new_efectivo_val < 0){
            alertaError('El efectivo recibido no puede estar en negativo');
        }
        $('#efectivo_val').val(new_efectivo_val.toFixed(numdecimales));        
    }else{
//        var efectivo_recibido = $('#efectivo_val').val();
        /* Si al inicio no se carga el total de la factua en efectivo, se carga entonces a credito */
        var new_credito_val = total_venta - anticipo_val - diferido_val_venta - tarjeta_val - cheque_val - ret_val;
        if( new_credito_val < 0 ){
            alertaError('El efectivo recibido no puede estar en negativo');
        }
        $('#credito_val').val(new_credito_val.toFixed(numdecimales));
    }

}

/* Cuando se cambia el valor de porcentaje en recargos */
function recdescporcent(elemevent,elempush){
   $(document).on("keyup", elemevent, function(e) {
        $(this).prev('span').children('button').removeAttr('disabled').removeClass('btn-default').addClass('btn-success');        
        var subtotal_bruto = getNumericVal('#subtotal_bruto','float'),
            recporcent = getNumericVal(elemevent,'float'),
            recval = (subtotal_bruto * recporcent) /100;
//        $(elempush).val(recval.toFixed(numdecimales));
        $(elempush).val(recval);
   });
}
/* Cuando se cambia el valor de porcentaje en recargos */
function recdescval( elemevent, elempush ){
   $(document).on("keyup", elemevent, function(e) {
        $(this).prev('span').children('button').removeAttr('disabled').removeClass('btn-default').addClass('btn-success');        
        var subtotal_bruto = getNumericVal('#subtotal_bruto','float'),
            recval = getNumericVal(elemevent,'float'),
            recporcent = parseFloat((recval * 100)/subtotal_bruto);
//        $(elempush).val(recporcent.toFixed(numdecimales));       
        $(elempush).val(recporcent);       
   });
}
/* Cuando se cambia el valor de porcentaje en recargos */
function control_stock(){
   $(document).on("keyup", '#qty_productslist', function(e) {
       var new_val = parseFloat($(this).val()),
           stock_bod = parseFloat($(this).attr('stock_bod'));
            
            if(isNaN(new_val) || new_val==''){ new_val = 0; }
            if(isNaN(stock_bod) || stock_bod==''){ stock_bod = -1; }
            
           if(new_val > stock_bod){
                $(this).val('1');
                alertaError('No puede agregar una cantidad mayor al stock');
           }
   });
   $(document).on("keyup", '#qty_cartlist', function(e) {       
       var new_val = parseFloat($(this).val()),
           stock_bod = parseFloat($(this).attr('stock_bod'));
           
           if(new_val > stock_bod){
                $(this).val('1');
                alertaError('No puede agregar una cantidad mayor al stock');
           }else{
               if(!isNaN(new_val) && new_val!=''){ 
                    $(this).next('span').children('button').removeAttr('disabled','disabled').removeClass('btn-default').addClass('btn-success');               
               }
           }
   });
}

function control_price_min(){
   $(document).on("keyup", '#price_cartlist', function(e) {
       var new_val = parseFloat($(this).val()),
           price_min = parseFloat($(this).attr('price_min'));

            if(isNaN(new_val) || new_val==''){
                new_val = 0;
            }
            if(isNaN(price_min) || price_min==''){
                price_min = 0;
            }

           if(new_val < price_min){
//                $(this).val(price_min);
                alertaError('No puede vender por debajo del precio minimo');
                $(this).next('span').children('button').attr('disabled','disabled');
                $(this).next('span').children('button').attr('disabled','disabled');
           }else{
               alertaExito('El precio ingresado si es permitido');
               $(this).next('span').children('button').removeAttr('disabled','disabled').removeClass('btn-default').addClass('btn-success');
           }
   });
}

/* Cuando se cambia la bodega seleccionada */
function change_bodega(){
   $(document).on("change", "#bodega_id_loadprodpanel", function(e) {
       var selected_bod = $(this).val();
    /*********************************************************************/
        $("#bodega_id_loadprodpanel option:selected").removeAttr("selected");
        // Select the option you want to select
        $("#bodega_id_loadprodpanel option[value='"+selected_bod+"']").attr("selected", "selected");
    /*********************************************************************/
    
    var url = $(this).attr('data-url');
        $.ajax({
            type: "POST",
            url: url,
            data: { bodegaid: selected_bod },       
            success: function(html){
                $('#messages_info_out').html(html);                    
            },
            error: function(){
                alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!");
            }              
        });
    /*********************************************************************/

   });
}

/* Cuando se cambia el tipo de precio de venta en la factura */
function recalcular_precios(){
   $(document).on("change", "#tipoprecio_factdata", function(e) {
       var selected_price = $(this).val();
    /*********************************************************************/    
    var url = $(this).attr('data-url'),
        datatarget = $(this).attr('data-target');
        if(url){
           //  datatarget = $(this).attr('data-target');
            $.ajax({
                type: "POST",
                url: url,
                data: { price_tipo: selected_price },       
                success: function(html){
                    $(datatarget).html(html);
                    alertaExito('Los precios han sido actualizados','Actualizacion de Precios');
                },
                error: function(){
                    alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!");
                }              
            });                
        }else{
            alertaError('Ya no se puede cambiar de bodega','No se puede cambiar de bodega');
        }
    /*********************************************************************/

   });
}

//function venta(){

$(function() {
     forma_pago_required();
     recalcular_precios();
     control_price_min();
     control_stock();
     change_bodega();
     openLoadProductsPanel('click','#loadproductsviewbtn');
    
    $.loadAjaxPanel('#ajaxpanelbtnproducts', { width: '99%', height: 550 }, {top: 30, left: 5});
    $.loadAjaxPanel('#ajaxpanelbtnproductget', { width: '99%', height: 550 }, {top: 30, left: 5});    
    $.loadAjaxPanel('#ajaxpanelbtnproductsload', { width: '99%', height: 550 }, {top: 30, left: 5});    
    $.loadAjaxPanel('#loadsearchprovbtn', { width: '99%', height: 300 }, {bottom: 0, left: 5});    

    recdescporcent("#recporcent",'#recval');
    recdescporcent("#desdporcent",'#descval');    
    recdescval('#recval',"#recporcent");
    recdescval('#descval',"#desdporcent");    
});

//    window.onbeforeunload = confirmExit;
//    function confirmExit()
//    {
//      return "Ha intentado salir de esta pagina. Si ha realizado algun cambio en los campos sin hacer clic en el boton Guardar, los cambios se perderan. Seguro que desea salir de esta pagina? ";
//    }
//}