/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* Cuando se cambia el valor de porcentaje en recargos */
function recdescporcent(elemevent,elempush){
   $(document).on("keyup", elemevent, function(e) {
        $(this).prev('span').children('button').removeAttr('disabled').removeClass('btn-default').addClass('btn-success');        
        var subtotal_bruto = getNumericVal('#subtotal_bruto','float'),
            recporcent = getNumericVal(elemevent,'float'),
            recval = (subtotal_bruto * recporcent) /100;
        $(elempush).val(recval.toFixed(numdecimales));
   });
}
/* Cuando se cambia el valor de porcentaje en recargos */
function recdescval(elemevent,elempush){
   $(document).on("keyup", elemevent, function(e) {
        $(this).prev('span').children('button').removeAttr('disabled').removeClass('btn-default').addClass('btn-success');        
        var subtotal_bruto = getNumericVal('#subtotal_bruto','float'),
            recval = getNumericVal(elemevent,'float'),
            recporcent = parseFloat((recval * 100)/subtotal_bruto);
        $(elempush).val(recporcent.toFixed(numdecimales));       
   });
}

/* evita que se suban los formularios al dar enter en una caja de texto */
//function preventSubmitForms(elemevent){
//   $(document).on("keyup", elemevent, function(e) {
//      
//   });
//}

function calcularFechaVencimientoFactCompra(){
//    var prefix = 'compraspurchasenew_';
    $(document).on('click', '#diasvence', function(e){
        var fechaemision = $('#pfechaemisionfact').val();
        if($('#pfechaemisionfact').length > 0 && fechaemision != ''){
            var diassuma = parseInt($('#diasvence option:selected').val()),
                date = Date.parse($('#pfechaemisionfact').val());
    //            currentdate = Date.parse($('#currentdate').val()),
                new_date = date.add(diassuma).days();       
            $("#fvencefact").val(new_date.toString('yyyy-MM-dd'));
            $('#fvencefact').css('color','#419641').css('font-weight','bold').css('border','solid 1px #419641');
        }else{
            alertaError('Seleccione la fecha de emision de la factura');
            $('#fvencefact').css('color','#FF0000').css('font-weight','bold').css('border','solid 1px #FF0000');
        }
    });
}

/*Cuando se selecciona que la compra es gasto*/
function esGastoSelected(){
   $(document).on("change", "input#pesgasto", function(e) {
     /* alert('hola...'); */
     if($(this).is(":checked")) {
         $("#pesactivofijo").removeAttr("checked");
	 	$("#gastosaccountsview").show();
	 	$("#pcentroscostoid").show();                
	 	$("#pcontacuentasplancodinventario").hide();
	 	$("#pcontacuentasplancodactivofijo").hide();
                $("#pdepartamentoid").hide();    
	 }else{
		$("#gastosaccountsview").hide();
                $("#pcentroscostoid").hide();                
		$("#pcontacuentasplancodinventario").show();
	 }
         return false;
   });

   $(document).on("change", "input#pesactivofijo", function(e) {
     if($(this).is(":checked")) {
         $("#pesgasto").removeAttr("checked");
            $("#pcontacuentasplancodactivofijo").show();
            $("#pdepartamentoid").show();
            $("#gastosaccountsview").hide();
            $("#pcontacuentasplancodinventario").hide();
            $("#pcentroscostoid").hide();
	 }else{
            $("#pcontacuentasplancodinventario").show();
            $("#pcentroscostoid").show();                
            $("#pdepartamentoid").hide();                
            $("#pcontacuentasplancodactivofijo").hide();
	 }
         return false;
   });
}
/*********************************************/
    function autosugest_product_name(){
         $('#product_name_autosug').typeahead({
                    template:['<div class="media br-bottom">',
                          '<div class="media-body"><h4 class="media-heading">{{value}}</h4>',
                          '<p>{{id}}<p></div></div>'
                                  ].join(''),
                        engine: Hogan,
                        remote: main_path+'ventas/product/autosugest_by_name/%QUERY',
                        minLength: 4,
                        limit: 10,
                })
                .on('typeahead:selected', function(event, datum) {
                    var url = main_path+'nota_credito/index/insertprod';
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: { id: datum.id,qty: 1 },       
                            success: function(html){
                                $('#cotizacionescart').html(html);                    
                            },
                            error: function(){
                                alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!");
                            }              
                        }); 
                $('#product_name_autosug').val('');
         });

        $('#client_ci_autosuggest').typeahead({
                    template:['<div class="media br-bottom">',
                          '<div class="media-body"><h4 class="media-heading">{{value}}</h4>',
                          '<p>{{client_name}}<p></div></div>'
                                  ].join(''),
                        engine: Hogan,
                        remote: main_path+'cxc/client/autosugest_by_ci/%QUERY',
                        minLength: 4,
                        limit: 10,
        })
    }

function nota_credito(){
    autosugest_product_name();
    $.loadAjaxPanel('#ajaxpanelbtnproducts', { width: '99%', height: 550 }, {top: 30, left: 5});
    $.loadAjaxPanel('#ajaxpanelbtnproductget', { width: '99%', height: 550 }, {top: 30, left: 5});    
    $.loadAjaxPanel('#ajaxpanelbtnproductsload', { width: '99%', height: 550 }, {top: 30, left: 5});    
    $.loadAjaxPanel('#loadsearchprovbtn', { width: '99%', height: 300 }, {bottom: 0, left: 5});
    esGastoSelected();
    calcularFechaVencimientoFactCompra();
    recdescporcent("#recporcent",'#recval');
    recdescporcent("#desdporcent",'#descval');
    
    recdescval('#recval',"#recporcent");
    recdescval('#descval',"#desdporcent");
    
    $.loadAjaxPanel('#loadproductsviewbtn',{ width: '99%', height: 300 },{bottom: 0, left: 5});
//    $.loadAjaxPanel('#ajaxpanelbtn',{ width: '99%', height: 300 },{bottom: 0, left: 5});
}