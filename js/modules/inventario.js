/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function getProductoAjEntradaxID(){
        $(document).on("click", "#invajentradaitemxidgetbtn", function(e) {            
            var form = $(this).parents('form');
            $(form).ajaxForm({
                success: getRespNewProdAjEntradaDetalle, clearForm: true
            });
        });
    return false;    
}

function getRespNewProdAjEntradaDetalle(data){
    if($.trim(data)!=''){
        $('#ajusteentrada_areadetallefact').append(data);
        calcularTotalNewAjEntrada();
    }else{
        alertaInfo('No se ha encontrado el producto que busca o se ha dado de baja', 'Agregar Producto');
    }
}

function calcularTotalNewAjEntrada(){
    var totalnewajuste = 0;
        $("input#invajentradacostototal").each(function(e) {
            var total = parseFloat($(this).val());
            totalnewajuste+=total;
        });        
    $('#ajusteentrada_totalfact').val(totalnewajuste.toFixed(numdecimales));
}

/******************************************************************************/
function quitarProductoDeAjEntrada(){
   $(document).delegate('#quitarprodajentradabtn','click',function(){
           $(this).parent("div").parent("div").remove();
           calcularTotalNewAjEntrada()
   });
}
/******************************************************************************/

/*Para archivar el ajuste de entrada*/
function agregarNewAjusteEntrada(){
   var prefix = "ajusteentrada_";
   $(document).on("keypress", 'form#'+prefix+'formnewajustentrada', function(e) {
        if (e.keyCode == 13) {e.preventDefault(); /* prevent native submit*/}
   });

//    $(document).delegate("#"+prefix+"btnaddajustentrada",'click',function(){
//        $('#'+prefix+'formnewajustentrada').ajaxForm({
//             success: responseagregarNewAjusteEntrada
//        });
//    });
    return false;
}

//function responseagregarNewAjusteEntrada(data){
//    if($.trim(data) != '-1'){
//        $('#invajentradanewoutput').html(data);
//        $('#ajusteentrada_btnnewajustentrada').removeClass('hide');        
//        $('#ajusteentrada_btnaddajustentrada').addClass('hide');        
//    }else{
//        alertaImportant('No se pudo agregar la factura de venta, verifique los datos', 'Nueva Venta');
//        $('#ventasnewfactoutput').html('<div class="alert alert-warning">Verifique que los datos ingresados sean correctos</div>');        
//    }
//}

function findProductToAjustEntrada(){
    var prefix = 'ajusteentrada_';
    $(document).delegate('#'+prefix+'btnfinditems','click',function(){
        var clavebusqueda = $.trim($("#"+prefix+"txtfinditems").val());
        
        var arrdatosDatos = [], bValid=true; //se vacia el array
/******************************************/
        arrdatosDatos = {'clavebusqueda': clavebusqueda};
        var areapresent = "#"+prefix+"outputitems";        
        var url = main_path+"/modules/inventario/controlador/ajustes/finditems.php";
        loadUrlJson2(url, true, arrdatosDatos, null, "Buscar Productos", "Datos Encontrados", "Error", areapresent);
/******************************************/
        return false;
    });
    return false;
}

/**********************/
function anularAjusteEntrada(){
    var cod, objThis;            
    $(document).delegate("#ajentrada_anularaj",'click',function(){
        objThis = $(this);
            cod = objThis.attr('cod')
            var arrdatosDatos = [], bValid=true,
                url = main_path+'/modules/inventario/controlador/ajustes/ajustentradaanular.php';
                arrdatosDatos = {'cod': cod};
                    var data = JSON.stringify(arrdatosDatos);
                    $.ajax({url: url,type: "POST", cache: false,dataType: "json", data: data,
                            success: function(data){
                                if(data.ok=='1'){
                                    alertaExito('El ajuste de entrada ha sido anulado correctamente', 'Anulacion de Ajuste Entrada');
                                }
                                objThis.parent('td').parent('tr').remove();
                            },
                            error: function(data){alertaError('Problema!! No se pudo anular el ajuste de entrada', 'Anulacion de Ajuste Entrada');},
                        contentType: "application/json"
                    });
            $( this ).dialog( "close" );
    });
}
/*********************/
function limpiarParaNuevoAjusteEntrada(){
    $(document).on("click", '#ajusteentrada_btnnewajustentrada', function(e) {
        e.preventDefault();
        var data = {'action': 'refresh'}, url = main_path+'/modules/inventario/vista/ajustes/ajusteentrada.php';
        $.ajax({
            type: "POST", url: url, data: data,
            success: function(html){$('#inventariosajentrada').html(html);},
            error: function(html){alertaImportant('Ocurrio un problema!!', 'Cargar Nuevo Ajuste Entrada');},
            dataType: 'html'
        });
    });
}

function changeInventariosSection(){
//    $(document).delegate("#"+prefix+"btnnewpuntoventa",'click',function(){
    $(document).delegate('#btninventariosreports','click',function(){
        $('#inventariostittlesection').html($(this).attr('title'));
        $('.inventariosmodule').slideUp(700);
        $('#inventariosreportinven').slideDown(700)
    }).delegate('#btninventarioskardex','click',function(){
        $('#inventariostittlesection').html($(this).attr('title'));
        $('.inventariosmodule').slideUp(700);
        $('#inventarioskardex').slideDown(700)
    }).delegate('#btnajusteentrada','click',function(){
        $('#inventariostittlesection').html($(this).attr('title'));
        $('.inventariosmodule').slideUp(700);
        $('#inventariosajentrada').slideDown(700)
    }).delegate('#btn_ajentrlist','click',function(){
        $('#inventariostittlesection').html($(this).attr('title'));
        $('.inventariosmodule').slideUp(700);
        $('#inventariosajentradalist').slideDown(700)
    })

}

function calcularTotalXProdAjEntrada(clickelem){
    $(document).delegate(clickelem,'keyup',function(){
        var codprod = $(this).attr('codprod'),
            cant = parseFloat($('.invajentradacantidad'+codprod).val()),
            costounit = parseFloat($('.invajentradacostounit'+codprod).val()),
            newtotalxprod = cant * costounit;            
            $('.invajentradacostototal'+codprod).val(newtotalxprod.toFixed(numdecimales));            
            calcularTotalNewAjEntrada()
    })
}

function inventario(){
   ejectSubmitFormsHtmlOutput("#inv_productsearchbtn",  "#inv_productsearchoutput");    
   ejectSubmitFormsHtmlOutput("#inventario_reportesbtngetinventarioxbodega",  "#inventario_reportesoutputinventarioxbodega");
   ejectSubmitFormsHtmlOutput("#invkardexgetbtn",  "#invkardexgetoutput");
   ejectSubmitFormsHtmlOutput("#btnfindajentrlist",  "#outputajentrlist");
    limpiarParaNuevoAjusteEntrada()

    findProductToAjustEntrada();
    agregarNewAjusteEntrada();    
//    verDetalleAjEntrada();    
    quitarProductoDeAjEntrada();
    anularAjusteEntrada();    
    changeInventariosSection()    
    getProductoAjEntradaxID()
    calcularTotalXProdAjEntrada('#invajentradacostounit')
    calcularTotalXProdAjEntrada('#invajentradacantidad')
}
