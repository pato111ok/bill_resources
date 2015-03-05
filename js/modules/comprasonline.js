/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function addShopingcartPedidoTemp(clickelem, formid){
    $(document).on("click", clickelem, function(e) {
        var codprod = $.trim($(this).attr('codprod'));
        $(formid+codprod).ajaxForm({
          dataType:  'json'  ,success: addShopingcartPedidoTempResponse
        });
    });   
    return false;   
}

function addShopingcartPedidoTempResponse(data){
    if(data.ok == '1'){alertaExito('El producto ha sido agregado correctamente su carrito de compras', '<span class="glyphicon glyphicon-shopping-cart"></span>&nbsp;Agregar Producto');        
    }else if(data.ok == '-1'){
        alertaError('No se pudo agregar, compruebe que no se encuentre ya en su carrito', '<span class="glyphicon glyphicon-shopping-cart"></span>&nbsp;Agregar Producto');
    }else if(data.ok == '-2'){
//        alert(main_path+"/login/vista/loginfailed.php");
        window.location.href = main_path+"/login/vista/logintoshopping.php";
        document.location.href = main_path+"/login/vista/logintoshopping.php";
    }
}

function quitarProdShopingcartPedidoTemp(){
    var prefix = 'comprasonline_';
   $(document).delegate('#'+prefix+'quitarproddetallebtn','click',function(){
       var codprod = $(this).attr('codprod'), objThis = $(this),       
        data = {'pcodprod': codprod}, url = main_path+'/modules/comprasonline/controlador/shoppingcartpedidostempdelete.php';
        $.ajax({
            type: "POST", url: url, data: data,
            success: function(html){
                if(html.ok == '1'){
                    alertaExito('El producto ha sido removido de la lista', 'Quitar Producto');                    
                    objThis.parent("div").parent("div").next('br.clr').remove();       
                    objThis.parent("div").parent("div").remove();      
                    calcularSubtotalBrutoNewPedido();
                    calcularSubtotalNetoPedido();
                }else{
                    alertaImportant('No fue posible quitar el producto de la lista', 'Quitar Producto');
                }
            },
            error: function(html){alertaImportant('Ocurrio un problema!!', 'Quitar Producto');},
            dataType: 'json'
        });
   });
}

function cambiarProdShopingcartPedidoTempCantProd(){
    var prefix = 'comprasonline_';   
   $(document).delegate('#'+prefix+'cantidad','keyup',function(){
       var codprod = $(this).attr('codprod');
       $(this).parent('div').removeClass('has-success');
       $(this).parent('div').addClass('has-error');
       $('.'+prefix+'cambiarcantprodbtn'+codprod).removeClass('btn-default').addClass('btn-danger');
   });

   $(document).delegate('#'+prefix+'cambiarcantprodbtn','click',function(){
        var codprod = $(this).attr('codprod'), pcant = $('.comprasonline_cantidad'+codprod).val(),objThis = $(this),
        data = {'pcodprod' : codprod, 'pcant' : pcant}, url = main_path+'/modules/comprasonline/controlador/shoppingcartpedidoscambiarcatnprod.php';
        $.ajax({
            type: "POST", url: url, data: data,
            success: function(html){
                if(html.ok == '1'){
                    alertaExito('La cantidad ha cambiado', 'Cambiar Cantidad');                    
                     $('.'+prefix+'cantidad'+codprod).parent('div').removeClass('has-error').addClass('has-success');
                     objThis.removeClass('btn-danger').addClass('btn-success');
                     calcularTotalxProd(codprod);
                     calcularSubtotalBrutoNewPedido();
                     calcularSubtotalNetoPedido()
                }else{
                    alertaImportant('No fue posible quitar el producto de la lista', 'Cambiar Cantidad');
                }
            },
            error: function(html){alertaImportant('Ocurrio un problema!!', 'Cambiar Cantidad');},
            dataType: 'json'
        });
        
   });
}

/*recorre los valores totales por producto para obtener nuevamente
 *el subtotal despues de realizar alguna accion*/
function calcularSubtotalBrutoNewPedido(){
    var subtbrutonewcompra = 0, prefix = 'comprasonline_';
        $("input#"+prefix+"ppreciototalprod").each(function(e) {
            var total = parseFloat($(this).val());
            subtbrutonewcompra+=total;
        });
    $('#'+prefix+'psubtotalbruto').val(subtbrutonewcompra.toFixed(numdecimales));
    $('#'+prefix+'subtotalbruto').html(subtbrutonewcompra.toFixed(numdecimales));

/*tarifa 12 es igaul al subtotal bruto porque todos los productos son tarifa doce*/
    $('#'+prefix+'tardocenetotxt').html(subtbrutonewcompra.toFixed(numdecimales));
    $('#'+prefix+'tardocebruto').val(subtbrutonewcompra.toFixed(numdecimales));
    $('#'+prefix+'tardoceneto').val(subtbrutonewcompra.toFixed(numdecimales));
//    $('#'+prefix+'subtotalbruto').html(subtbrutonewcompra.toFixed(numdecimales));
}

function calcularTotalxProd(codprod){
   var prefix = 'comprasonline_',
//       bodegaid = $('#ventasnewventa_pselectedbodegaidtofact').val(),
//       cantidadmax = getStockXBodega(codprod, bodegaid),   
       cantidad = parseFloat($('.'+prefix+'cantidad'+codprod).val()),
       costounitfinal = parseFloat($('.'+prefix+'ppreciounit'+codprod).val());
       
//       if(cantidadmax < cantidad){
//           cantidad = cantidadmax;
//           $('.ventasnewfactcantidad'+codprod).val(cantidadmax)
//       }

       var totalxprod = cantidad * costounitfinal;
       
       $('.'+prefix+'ppreciototalprod'+codprod).val(totalxprod.toFixed(numdecimales));
       $('.'+prefix+'costototalprod'+codprod).html(totalxprod.toFixed(numdecimales));              
}

/*calcular subtotalneto*/
function calcularSubtotalNetoPedido(){
    var prefix = 'comprasonline_', subtotalnetofact = 0, ivafactval = 0, totalfact = 0,
        descporcentfact = parseFloat($('#'+prefix+'descporcentfact').val()),
        recporcentfact = parseFloat($('#'+prefix+'recargoporcentfact').val()),
        subtotalbrutofact = parseFloat($('#'+prefix+'psubtotalbruto').val()),
        tottarifadocebruto = getNumericVal('#'+prefix+'tardocebruto', 'float'),
        tottarifadoceneto = 0;
        
    var descvalfacttardoce = parseFloat((tottarifadocebruto * descporcentfact)/100),
        recvalfacttardoce = parseFloat((tottarifadocebruto * recporcentfact)/100),
        descvalfactttotal = parseFloat((subtotalbrutofact * descporcentfact)/100),
        recvalfactttotal = parseFloat((subtotalbrutofact * recporcentfact)/100);

        tottarifadoceneto = tottarifadocebruto - descvalfacttardoce + recvalfacttardoce;
     
        subtotalnetofact = tottarifadoceneto;
        ivafactval = (tottarifadoceneto * ivaporcent) / 100,
        totalfact = subtotalnetofact + ivafactval;
            
        $('#'+prefix+'tardoceneto').val(tottarifadoceneto.toFixed(numdecimales));
        $('#'+prefix+'tardocenetotxt').html(tottarifadoceneto.toFixed(numdecimales));    
        
        $('#'+prefix+'descvalfact').val(descvalfactttotal.toFixed(numdecimales));
        $('#'+prefix+'recargovalfact').val(recvalfactttotal.toFixed(numdecimales));
        
        $('#'+prefix+'psubtotalneto').val(subtotalnetofact.toFixed(numdecimales));
        $('#'+prefix+'subtotalneto').html(subtotalnetofact.toFixed(numdecimales));
        
        $('#'+prefix+'pivaval').val(ivafactval.toFixed(numdecimales));
        $('#'+prefix+'ivaval').html(ivafactval.toFixed(numdecimales));
        
        $('#'+prefix+'ptotalfact').val(totalfact.toFixed(numdecimales));
        $('#'+prefix+'totalfact').html(totalfact.toFixed(numdecimales));       
}

function cambiarDescRecPorcentFactVenta(elem){
    var prefix = 'comprasonline_';
    $(document).delegate("#"+prefix+elem, 'keyup', function(){
        var objThis = $(this), totalfact = getNumericVal("#"+prefix+"ptotalfact", "float");
        if(totalfact > 0){
//            calcTotIceImpuestosFactVenta()
//            calcularTotalTarifCeroFactVenta()            
              calcularSubtotalNetoPedido();
        }else{
            alertaImportant('Debe agregar productos en la factura', 'Aplicar Descuentos');
            objThis.val(valorcero);
        }
    });
}
/*cuando se cambia el campo de valor de dscuento en la factura de compra*/
function changeDescRecValInFactVenta(elemva, elemporcent){
    var prefix = 'comprasonline_';    
    $(document).delegate("#"+prefix+elemva, 'keyup', function(){
        var objThis = $(this), totalfact = getNumericVal("#"+prefix+"ptotalfact", "float");
        if(totalfact > 0){
            var valdesc = $(this).val(),
                subtotalfact = $('#'+prefix+'psubtotalbruto').val(),
                descuentoporcent = parseFloat((valdesc * 100)/subtotalfact);
                
//                alert(descuentoporcent);
                $('#'+prefix+elemporcent).val(descuentoporcent.toFixed(numdecimales))
//                calcTotIceImpuestosFactVenta()
//                calcularTotalTarifCeroFactVenta()  
                  calcularSubtotalNetoPedido();
        }else{
            alertaImportant('Debe cargar productos en la factura', 'Aplicar Descuento');
            objThis.val(valorcero);
        }

        return false;        
    });
}

function addShopingcartPedidoAceptado(){
    var prefix = 'comprasonline_';

   $(document).on("keypress", 'form#'+prefix+'addpedidoaceptadoform', function(e) {if (e.keyCode == 13) {e.preventDefault(); /* prevent native submit*/}});
    
    $(document).on("click", '#'+prefix+'addpedidoaceptadobtn', function(e) {
        bloquearPantalla();
        $('#'+prefix+'addpedidoaceptadoform').ajaxForm({
//          dataType: 'json'  
          success: addShopingcartPedidoAceptadoResponse
        });
    });   
    return false;   
}

function addShopingcartPedidoAceptadoResponse(data){
//    alert(data)
    if(data.ok != '-1'){
        var prefix = 'comprasonline_', msgconfirpedidoexito = $('#msgconfirpedidoexito').val(), msgconfirpedidoerror = $('#msgconfirpedidoerror').val();
        alertaExito('El pedido ha sido creado correctamente, el procesamiento de este pedido es de 24 horas', '<span class="glyphicon glyphicon-shopping-cart"></span>&nbsp;Nuevo Pedido');
        $('#'+prefix+'pedidoaddoutput').html(data);
        var pedidoid = $('#'+prefix+'newpedidoaceptadoid').val();        
        $('#'+prefix+'areauserpedidostemp').html('<div class="alert alert-success" style="min-height:400px">'+msgconfirpedidoexito+'</div>');
//        alert(pedidoid)
        verDetallePedidoAceptado(pedidoid)
        desbloquearPantalla()
    }else{
        alertaError('No se pudo completar el pedido, compruebe q los datos ingresados sean correctos o contacte con el administrador', '<span class="glyphicon glyphicon-shopping-cart"></span>&nbsp;Nuevo Pedido');
        desbloquearPantalla()        
    }
}

/******* Ver el detalle del pedido*/
function verDetallePedidoAceptado(pedidoid){

//        bloquearPantalla();
      var bValid = true, prefix = 'comprasonline_',
          arrdatosDatos = {"pedidoid":pedidoid},
          msgtitulo = "Pre-Factura",
          msgsuccess = "Datos de Pre-Factura",
          msgerror = "Problema!! No se encontro el detalle del pedido para presentar la pre-factura, contacte con admin@masterpc.com.ec",
          areacarga = "#"+prefix+"areadetpedidoacept";
          var url = main_path+"/modules/comprasonline/controlador/vistadetallepedidoaceptado.php";
        loadUrlJson2(url, bValid, arrdatosDatos, msgtitulo, msgsuccess, msgerror, areacarga);
        
        $('#'+prefix+'detpedidomodal').modal('show')
          
        $('#comprasonlineprefactareaprint').printThis({
              debug: false,             // * show the iframe for debugging
              importCSS: true,          // * import page CSS
              printContainer: true,     // * grab outer container as well as the contents of the selector
              loadCSS: main_path+"/css/bootstrap.min.css",// * path to additional css file
              pageTitle: "Pre-Factura, Master PC",            // * add title to print page
              removeInline: false       // * remove all inline styles from print elements
        });    
}

function updateEstadoPedidoAceptado(){
   var prefix = 'comprasonline_';    
   $(document).delegate('#'+prefix+'cambiarestpedbtn','click',function(){
        var pedidoestado = $(this).attr('pedidoestado'), 
            pedidoid = $(this).attr('pedidoid'), objThis = $(this),
        data = {'pid' : pedidoid,'pestado' : pedidoestado, 'pactiontype':'updateestado'}, url = main_path+'/modules/comprasonline/controlador/pedidoaceptadoactions.php';
        $.ajax({
            type: "POST", url: url, data: data,
            success: function(html){
                if(html.ok == '1'){
                     alertaExito('Estado del pedido cambiado correctamente', 'Cambiar Estado');
                     $('.'+prefix+'cambiarestpedbtn').removeClass('active');
                     objThis.addClass('active');
                }else{
                    alertaImportant('No fue posible cambiar de estado al pedido', 'Cambiar Estado');
                }
            },
            error: function(html){alertaImportant('Ocurrio un problema!!', 'Cambiar Estado');},
            dataType: 'json'
        });
   });
}

function printPrefactPedidoAceptado(){
   var prefix = 'comprasonline_';    
   $(document).delegate('#'+prefix+'printpedidoprefactbtn','click',function(){
       var pedidoid = $(this).attr('pedidoid');
       verDetallePedidoAceptado(pedidoid);
   });
}

function comprasonline(){
    addShopingcartPedidoTemp('#shoppingcartaddprodbtn', '#shoppingcartaddprodform'); /*vista en lista*/
    addShopingcartPedidoTemp('#shoppingcartaddprodbtn2', '#shoppingcartaddprodform2'); /*vista en bloquer (iconos)*/
    quitarProdShopingcartPedidoTemp();
    cambiarProdShopingcartPedidoTempCantProd();
    cambiarDescRecPorcentFactVenta('recargoporcentfact');
    cambiarDescRecPorcentFactVenta('descporcentfact');
    
    changeDescRecValInFactVenta('recargovalfact', 'recargoporcentfact');
    changeDescRecValInFactVenta('descvalfact', 'descporcentfact');
    
    addShopingcartPedidoAceptado();
    updateEstadoPedidoAceptado();
    printPrefactPedidoAceptado();
  

}