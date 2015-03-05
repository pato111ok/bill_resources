/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* establecemos campos requeridos en la forma de pago */
function forma_pago_required(){
   
    $(document).on("keyup", "#cxp_anticipo_val", function(e) {
       restar_de_efectivo();
//       var anticipo_val = parseFloat($(this).val());
//       if(!isNaN(anticipo_val) && anticipo_val != ''){
//           $("#credito_vence").attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
//       }else{
//           $("#credito_vence").removeAttr('required').css('background-color','#fff');
//       }
   });
   
    $(document).on("keyup", "#cheque_val", function(e) {
       restar_de_efectivo();
       var cheque_val = parseFloat($(this).val());
       if(!isNaN(cheque_val) && cheque_val != ''){
           $(this).next('input').attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
           $(this).next('input').next('input').attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
           $(this).next('input').next('input').next('input').attr('required','true').css('background-color','#cd0a0a').css('color','#fff');
       }else{
           $(this).next('input').removeAttr('required').css('background-color','#fff');
           $(this).next('input').next('input').removeAttr('required').css('background-color','#fff');
           $(this).next('input').next('input').next('input').removeAttr('required').css('background-color','#fff');
       }
   });

    $(document).on("keyup", "#tarjeta_val", function(e) {
       restar_de_efectivo();
       var tarjeta_val = parseFloat($(this).val());
       if(!isNaN(tarjeta_val) && tarjeta_val != ''){
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
    var total_venta = getNumericVal('#cxp_total_pago','float');
    var anticipo_val = getNumericVal('#cxp_anticipo_val','float');

    var tarjeta_val = 0;
    $("input#tarjeta_val").each(function(e) {
        var val = parseFloat($(this).val());
        if(!isNaN(val) && val != ''){            
            tarjeta_val += val;
        }
    });
    var cheque_val = 0;
    $("input#cheque_val").each(function(e) {
        var val = parseFloat($(this).val());
        if(!isNaN(val) && val != ''){            
            cheque_val += val;            
        }
    });   


    var new_efectivo_val = total_venta - anticipo_val - tarjeta_val - cheque_val;
    if(new_efectivo_val < 0){
        alertaError('El efectivo recibido no puede estar en negativo');
    }
    $('#cxp_efectivo_val').val(new_efectivo_val.toFixed(numdecimales));
}