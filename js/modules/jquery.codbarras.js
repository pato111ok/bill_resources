/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/*Para archivar la factura de venta*/
function getProductosToCodBarras(){
    $(document).delegate("#btn_productfindtocodbarras",'click',function(){
        $('#codbarrasformbuscaprod').bt_validate();
//        bloquearPantalla();
        $('#codbarrasformbuscaprod').ajaxForm({
          target: '#outputproductsfindcodbarras'
//        dataType:  'json' 
//        ,beforeSubmit: validateDataJForm
//        ,success:   desbloquearPantalla()
        });
    });
   return false;
}

function generarCodBarraProducto(){
//    $(".codbarras_btngenbarras").live("click", function(){
    $(document).delegate(".codbarras_btngenbarras",'click',function(){        
//        bloquearPantalla();        
        var codproduct = $(this).attr("cod"), itemname = $(this).attr("itemname"),
            barcodecant = $("#codbarras_cantidad"+codproduct).val(), dataString = "codproduct="+codproduct+"&barcodecant="+barcodecant;
            $.ajax({
                    contentType: "application/x-www-form-urlencoded",
                    type: "POST",
                    dataType: "json",
                    data: dataString,
                    url: main_path+"/modules/codbarras/controlador/generatiketsitem.php",
                    async:false,
                    success: function(html){
                    /*************************************************************/
                    $("#areavistabarrasprodgeneradas").html("");
                                var btype = "code39",
                                    renderer = "css",
                                    settings = {
                                        output:renderer,bgColor: "#fff",
                                        color: "#000",barWidth: "2",
                                        barHeight: "20",moduleSize: $("#moduleSize").val(),
                                        posX: $("#posX").val(),posY: $("#posY").val(),
                                        addQuietZone: $("#quietZoneSize").val(),showHRI: false
                                    };
                                    var cont = 0;
                                $.each(html, function(index, value) {
                                    $("#areavistabarrasprodgeneradas").append('<div id="newparabarras'+cont+'" style="float:left"></div>');
                                    $("#newparabarras"+cont)
                                    .append(itemname+"<br/>PVP.<br/>Cod: "+codproduct+"<br/>");
                                    $("#newparabarras"+cont).show().barcode(value, btype, settings);
                                    cont = cont+1 ;
                            });    
//                            desbloquearPantalla();
                    /*************************************************************/
                    },
                    error: function(){
                        alertaError('Ha ocurrido un problema, por favor intente luego de refrescar la pagina con Ctrol + F5, o contacte con el administrador del sistema', "ERROR!!");
//                        desbloquearPantalla();
                    }
            });
    });

//        $('#btn_printbarcodeproducts').live('click',function(){
        $(document).delegate("#btn_printbarcodeproducts",'click',function(){
            var cods = $.trim($('#areavistabarrasprodgeneradas').html());
                if(cods != ''){
                    $.jPrintArea("#areavistabarrasprodgeneradas");
                }else{
                    alertaInfo('Primero debe buscar el producto del cual desea generar codigo de barras', 'Impresion Codigos Barra');
                }
            
        });
}

function jquery_codbarras(){   
    getProductosToCodBarras();
    generarCodBarraProducto();
}