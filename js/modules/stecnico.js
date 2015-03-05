var progressbar = '<div class="progress"> <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%"> <span class="sr-only">45% Complete</span> </div> </div>';
function searchMarca(){
    $('#marcasearchid').typeahead({
                template:['<div class="media br-bottom">',
                      '<div class="media-body"><h4 class="media-heading">{{value}}</h4>',
                      '<p>{{descripcion}}<p></div></div>'
                              ].join(''),
                    engine: Hogan,
                    remote: main_path+'/modules/comunes/controlador/marcaA.php?q=%QUERY',
        minLength: 2                               
            })
//            .on('typeahead:selected', function(event, datum) {
//                $('#marca_id').val(datum.id);
//     });

     /*al momento de buscar ingresos realizados*/
            $('#marcasearchid2').typeahead({
                template:['<div class="media br-bottom">',
                      '<div class="media-body"><h4 class="media-heading">{{value}}</h4>',
                      '<p>{{descripcion}}<p></div></div>'
                              ].join(''),
                    engine: Hogan,
                    remote: main_path+'/modules/comunes/controlador/marcaA.php?q=%QUERY',
        minLength: 2                               
            })
            .on('typeahead:selected', function(event, datum) {
                $('#marca_id2').val(datum.id);
     });  
      
}

function selectTecnico(){
   $(document).on("change", "#tecnicoencargado", function(e) {
       var tecniconame = $('#tecnicoencargado :selected').text();
        $('#tecnico_name').val(tecniconame);
        return false;
   });
}

/*quitar un producto de la lista*/
function delProduct(){
    $(document).on("click", "#delproductbtn", function(e) {
        bloquearPantalla()
        var form = $(this).parents('form');
//        $(form).bt_validate();
        $(form).ajaxForm({dataType:  'json', success: getRespDelProduct});
    });
}
function getRespDelProduct(data, statusText, xhr, $form){
    if($.trim(data.ok) == '1'){
        var formElement = $form; 
        formElement.parents('tr').remove();
        alertaExito('El producto ha sido removido de la lista', 'Remover Producto');
    }else{
        alertaExito('No se ha podido remover el producto de la lista', 'Remover Producto');        
    }
}

function editPrefact(elem){
    $(document).on("keyup", elem, function(e) {

        var objThis = $(this), prefactid = objThis.attr('prefactid');
        var parametros = {
            "inputval" : objThis.val(),
            "prefactid" : prefactid,
            "action" : objThis.attr('action')
        };
        
        if($.trim(objThis.val()) != '0' && $.trim(objThis.val()) != 'undefined' && $.trim(objThis.val()) != ''){
            $.ajax({
                data:  parametros,
                url:   objThis.attr('data-url'),
                type:  'post',
                beforeSend: function () {
//                  $("#ajaxproccessview").html("Procesando, espere por favor...");
                    $("#ajaxproccessview").html(progressbar);
                },
                success:  function (response) {
                    $("#ajaxproccessview").html(response);
                    var cantprodfact = getNumericVal('.cantprodfact'+prefactid,'int'),
                        preciounit = getNumericVal('.preciounit'+prefactid, 'float'),
                        totxprod = cantprodfact * preciounit,
                        ivaxunit = totxprod + ((totxprod * ivaporcent) / 100);

                    $('#totxprod'+prefactid).html(totxprod.toFixed(numdecimales));
                    $('input[name=totxprod'+prefactid+']').val(totxprod.toFixed(numdecimales));
                    $('#ivaxunit'+prefactid).html(ivaxunit.toFixed(numdecimales));
                    
                    var subtotnewcompra = 0, ivafact = 0, totfact = 0;
                    $("input#totxprod").each(function(e) {
                        var total = parseFloat($(this).val());
//                        alert(total)
                        subtotnewcompra += total;
                    });
                    $('#subtotview').html(subtotnewcompra.toFixed(numdecimales)); $('#subtotfact').val(subtotnewcompra);
                    ivafact = (subtotnewcompra * ivaporcent) / 100;
                    $('#ivafactview').html(ivafact.toFixed(numdecimales)); $('#ivafact').val(ivafact);
                    totfact = subtotnewcompra + ivafact;
                    $('#totfactview').html(totfact.toFixed(numdecimales)); $('#totfact').val(totfact);
                }
            });
        }else{
            alertaError("No se puede establecer un valor nulo","");            
        }

    });
}

function historialReparacion(){
    $(document).on('click', '#openhistreparacion', function(e){
        var stequipo_id = $.trim($(this).attr('stequipo_id')),
            clientemail = $.trim($(this).attr('clientemail')),
            clientcelular = $.trim($(this).attr('clientcelular')),
            client = $.trim($(this).attr('client'));
           $( '.container-fluid' ).jsPanel({
            size: { width: 660, height: 460 },
//            theme: 'info',
            title:    'Historial Reparacion Equipo',
            
            overflow: 'auto',
            position:  { top: 0, left: 15},
//            theme: 'info', 
            theme:         'success',
            controls: { iconfont: 'bootstrap' },
//            controls: { buttons: 'closeonly', iconfont: 'font-awesome' },
            ajax: {
                url: main_path+'/modules/stecnico/view/histreparacion.php?stequipo_id='+stequipo_id+'&clientemail='+clientemail+'&clientcelular='+clientcelular+'&client='+client
            }
            });
//        return false;            
    });
}

function stecnico(){
    historialReparacion();
    editPrefact("#preciounit");
    editPrefact("#cantprodfact");
//  alert('hi..')
//  $(".pick-a-color").pickAColor();
    delProduct();
    searchMarca();
    selectTecnico();
}