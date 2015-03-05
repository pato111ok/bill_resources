/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//function getPuntoVentaUser(prefix, elem, cedsupplier, codcomprobante, pemision, establecimiento, nroautorizacion, fvenceautorizacion, secinicial, secultima){
//     $(document).delegate("#"+prefix+elem, 'change', function(){
//        var pempleado = $("#"+prefix+cedsupplier+" option:selected").val(),
//            ptipocompr = $("#"+prefix+codcomprobante+" option:selected").val(),
//            ppemision = $("#"+prefix+pemision).val(),
//            pestablecimiento = $("#"+prefix+establecimiento).val();
////    alert(pempleado);    
///**********************************************/
//        var arrdatosDatos = [], bValid=true; //se vacia el array
///******************************************/
//        arrdatosDatos = {'pempleado': pempleado,'ptipocompr': ptipocompr
//                         ,'ppemision': ppemision,'pestablecimiento': pestablecimiento};
//                var data = JSON.stringify(arrdatosDatos);
//                $.ajax({
//                    url: main_path+"/modules/administracion/controlador/empresa/puntoventaget.php",
//                    type: "POST", cache: false, dataType: "json", data: data,
//                        success: function(html){
////                            alert(html.numaut)
//                            $("#"+prefix+nroautorizacion).parent('div').addClass('has-success');
//                            $("#"+prefix+nroautorizacion).val(html.numaut).parent('div').removeClass("has-error").addClass("has-success");
//                            $("#"+prefix+fvenceautorizacion).val(html.fvenceaut).parent('div').removeClass("has-error").addClass("has-success");
//                            $("#"+prefix+secinicial).val(html.secinicial).parent('div').removeClass("has-error").addClass("has-success");
//                            $("#"+prefix+secultima).val(html.secultima).parent('div').removeClass("has-error").addClass("has-success");
//                        },
//                        error: function(html){
//                            $("#"+prefix+nroautorizacion).val('').parent('div').removeClass("has-success").addClass("has-error");
//                            $("#"+prefix+fvenceautorizacion).val('').parent('div').removeClass("has-success").addClass("has-error");
//                            $("#"+prefix+secinicial).val('').parent('div').removeClass("has-success").addClass("has-error");
//                            $("#"+prefix+secultima).val('').parent('div').removeClass("has-success").addClass("has-error");
//                        },
//                    contentType: "application/json"
//                });
//     });
//     return false;
//}

function getProductParaDescuentos(){
    $(document).delegate("#admindesc_itemxidgetbtn",'click',function(){
        $('#admindesc_itemxidgetform').ajaxForm({success: getRespProductParaDescuentos, clearForm: true});
    });
    return false;
}
function getRespProductParaDescuentos(data){
    if($.trim(data)!=''){$('#admindesc_areaprodparadescuento').html(data);
    }else{alertaError('No se ha encontrado el producto que busca o se ha dado de baja', 'Buscar Producto');}
}

function aplicarDescuentoProducto(){
    $(document).delegate("#admindesc_aplicardescuentosbtn",'click',function(){
        var pbodegaid = $('#admindesc_pbodegaid option:selected').val();
        if(pbodegaid != 0){
//            $('#admindesc_aplicardescuentosprodform').ajaxForm({
//                dataType:  'json', 
//                success: getResponseNewAction});            
        }else{ 
            $('#admindesc_pbodegaid').parent('div').addClass('has-error');
            alertaError('Seleccione la bodega', 'Aplicar Descuento');
            $(document).on('submit', 'form#admindesc_aplicardescuentosprodform', function(e) {
                e.preventDefault();
            });
        }

    });
    return false;
}

function getDescuentosStockBodega(){
    $(document).delegate("#admindesc_pbodegaid",'change',function(){
        var pbodegaid = $('#admindesc_pbodegaid option:selected').val(),
            pcodprod = $('#admindesc_pcodprod').val(),
            url = main_path+'/modules/administracion/controlador/stckbodegadescuentosget.php',
            data = {'pbodegaid':pbodegaid,'pcodprod':pcodprod}; 
        if(pbodegaid != 0){
            $.ajax({
                contentType: "application/x-www-form-urlencoded",                                
                type: "POST", dataType: "json",
                url: url, data: data, async:true,                                     
                    success: function(html){
                        if(html.ok=='-1'){
                            alertaError('No se puede aplicar descuentos a la bodega seleccionada, puede ser que la bodega no contenga el producto seleccionado', 'Descuentos Por Bodega')
                        }else{
                            $('#admindesc_pdescmaxporcentbod').val(html.descuentomaxporcent);
                            $('#admindesc_pdescmaxporcentbodunico').val(html.descuentomaxporcentunico);                            
                        }
                    },
                    error: function(){alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!");},
                    cache: false
            });
        }else{
//            $('#admindesc_pbodegaid').parent('div').addClass('has-error');
            alertaError('Seleccione la bodega', 'Aplicar Descuento');
        }

    });
    return false;
}


function searchBancotoEdit(){
		$('#pcodbancoid').typeahead({
		    template:['<div class="media br-bottom">',
    			  '<div class="media-body"><h4 class="media-heading">{{value}}</h4>',
    			  '<p>{{direccion}}<p></div></div>'
				  ].join(''),
			engine: Hogan,
			remote: main_path+'/modules/administracion/controlador/bancosA.php?q=%QUERY',
            minLength: 2                               
		})
		.on('typeahead:selected', function(event, datum) {
		    $('#pcodbancoval').val(datum.id);
         });
}

function adminempre(){
    $.loadAjaxPanel('#ajaxeditBodegas');
    $.loadAjaxPanel('#ajaxpanelbtnproducts');
    $.loadAjaxPanel('#ajaxpanelbtnproductssearch');
    $.loadAjaxPanel('#ajaxpanelbtnproductget');
    $.loadAjaxPanel('#ajaxpanelbtnproductsload');
    searchBancotoEdit();
    ejectSubmitFormsHtmlOutput("#searchclientbtn",  "#searchclientoutput");    
    ejectSubmitFormsHtmlOutput("#adminempr_btnsucursales",  '#adminempr_areasucursalesempr');  

    ejectSubmitFormsHtmlOutput("#getbodegasbtn",  '#getbodegasoutput');      
    
    getDescuentosStockBodega();
    aplicarDescuentoProducto();
    getProductParaDescuentos();
    
/* CONTABLE - Tareas con la configuracion de las cuentas contables*/ 
    ejectSubmitFormsHtmlOutput("#comprascontnewtipocompr_btnaddtipocomprobante",  "#comprascontnewtipocompr_outputaddproduct");    
    ejectSubmitFormsHtmlOutput2("#configplancuentas_contaplancuentasgetbtn",  "#configplancuentas_contaplancuentasgetoutput");    
    ejectSubmitFormsHtmlOutput2("#configplancuentas_contaplancuentasaddbtn",  "#configplancuentas_contaplancuentasaddoutput");
    ejectSubmitFormsHtmlOutput2("#configplancuentas_btnedit",  "#configplancuentas_contaplancuentasaddoutput");
    ejectSubmitFormsHtmlOutput2("#pcontacuentasplancod",  "#admin_bancosgetoutput" , 'click');

    
/* FIN CONTABLE*/    
}