/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

//function loadmainpage(){
        //load content for first tab and initialize
//    $('#tabinicio').load(main_path+'/modules/inicio/vista/vista.php', function() { });
//    $('#infosystempanel').show();
    //$('#mainnavbar').bind('click', function(e) {  
//    $(document).on("click", "#mainnavbar", function(e) {          
//            $('.tabcontent').html('<img alt="Espere..." src="'+main_path+'/css/img/loading2.gif'+'">Espere...');        
//            var pattern=/#.+/gi //set a regex pattern (all the things after "#").
//            var contentID = e.target.toString().match(pattern)[0]; //find pattern       
//            if($(contentID).html().length==0){
//                var url = $(contentID).attr('rel');
//                $(contentID).load(main_path+url, function(){ });
//            }
//            $('.tabcontent').slideUp(400);
//            $(contentID).slideDown(400);
//    });
    
//    $(document).on("click", "#modulelink", function(e) {
////            var pattern=/#.+/gi //set a regex pattern (all the things after "#").
//            var contentID = $(this).attr('moduleid'); //find pattern
////            alert(contentID)
//            if($(contentID).html().length==0){
//                var url = $(contentID).attr('rel');
//                $(contentID).load(main_path+url, function(){ });
//            }
//            $('.tabcontent').slideUp(400);
//            $(contentID).slideDown(400);
//    });
//}

// var main_path = $('#main_path').val();
//alert(main_path);
// var main_path = $('#main_path').val(),
//     numdecimales = $('#numdecimales').val(),
//     ivaporcent = $('#ivaporcent').val(),
//     userid = $('#userid').val(),
//     valorcero = 0;
//     valorcero = valorcero.toFixed(numdecimales);

 var main_path = $('#main_path').val(),
     numdecimales = 2,
     ivaporcent = 12,
     userid = $('#userid').val(),
     valorcero = 0;
     valorcero = valorcero.toFixed(numdecimales);

var optprint1 = { debug: false, importCSS: true, printContainer: true, loadCSS: main_path+"resources/css/allstyles.css", removeInline: false };
        function printelem(){
            $(document).on("click", "#printbtn", function(event){
                var elem = $(this).attr('data-target');
                $("#"+elem).printThis(                        
                    optprint1
                );
            });
        }

    /*funcion para cargar url mediante ajax*/
    function loadUrlJson(url, bValid, arrdatosDatos, msgtitulo, msgsucess, msgerror){
            if(bValid){
                var data = JSON.stringify(arrdatosDatos);
                    $.ajax({
                        contentType: "application/x-www-form-urlencoded",                                
                        type: "POST",dataType: "json",
                        url: url, data: data, async:true,                                     
                            success: function(html){
                                html=$.trim(html);
                                        if(html==1){alertaExito(msgsucess, msgtitulo);}
                                        if( html==-1 ){alertaError(msgerror, msgtitulo);}
                            },
                            error: function(){
                                alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!");
                            },
                            cache: false
                    });
            }    
    }        
        
/*funcion para cargar url mediante ajax, se envia json pero se recibe datos en texto plano*/
function loadUrlJson2(url, bValid, arrdatosDatos, msgtitulo, msgsucess, msgerror, areacarga){
    if(bValid){
        $(areacarga).html("");
        var data = JSON.stringify(arrdatosDatos);
            $.ajax({
                contentType: "application/x-www-form-urlencoded", cache: false,
                type: "POST", url: url, data: data, async:true,                                     
                    success: function(html){
                                if(html != "-1"){$(areacarga).html(html);alertaExito(msgsucess, msgtitulo);}
                                if( html=="-1" ){alertaError(msgerror, msgtitulo);}
                    },
                    error: function(){ alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!"); }
            });
    }
}
        
    function conservarValoresNoEditables(elem){
        var valprevio = 1;
        $(document).delegate(elem,'focus',function(){
            valprevio = $(this).val();
        }).delegate(elem,'change keyup keydown',function(){
            $(this).val(valprevio);
            alertaError("Usted no puede cambiar el valor de este campo", "Accion No Permitida");
            $(elem).attr("disabled", true);
        });
        return false;
    }
        
        
    function refresSectionModule(elemaction, url, areaoutput){
        $(document).on("click", elemaction, function(e) {
            var data = {'action': 'refresh'};
            $.ajax({
                type: "POST", url: url, data: data,
                success: function(html){ $(areaoutput).html(html); },
                error: function(html){ alertaError('Ocurrio un problema!!', 'Cargar Nueva Factura'); },
                dataType: 'html'
            });
        });
    }

function getNumericVal(elem,type){
    var newval,
        elemval = $.trim($(elem).val());
        elemval = elemval.replace(',',''); //para que maneje bien los miles
    if(isNaN(elemval) || elemval==''){
        newval = 0;
    }else{
        if(type == 'float'){
            newval = parseFloat(elemval);
        }
        if(type == 'int'){
            newval = parseInt(elemval);
        }
    }
    return newval;
}

function sumarValues(values, tipo){
    var totalsuma = 0;    
    if(tipo == 'float'){
        $.each(values, function(index, value) {
            totalsuma+=parseFloat(value);
        });
    }
    if(tipo == 'int'){
        $.each(values, function(index, value) {
            totalsuma+=parseInt(value);
        });
    }    
    return parseFloat(totalsuma);
//    return getMoneyFormatted(totalsuma);
}

function getNumericAttr(elem,attrname,type){
    var newval,
        elemval = $.trim($(elem).attr(attrname)); 
        elemval = elemval.replace(',',''); //para que maneje bien los miles
    if(type == 'float'){
      newval = parseFloat(elemval);
//      newval = getMoneyFormatted(newval);
    }
    if(type == 'int'){
      newval = parseInt(elemval);
    }
    return newval;    
}

function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
                    alertaError("La longitud de " + n + " debe ser entre " +
                        min + " y " + max + "." , "Validacion De Datos");
    //                     o.addClass("error") ;                       
                    o.parent('div').addClass("has-error");
                return false;
        } else {
                o.parent('div').removeClass("has-error");
    //          o.removeClass("ui-state-error");
                return true;
        }
}


function bloquearPantalla(){
        $.blockUI({
            message: $('#msgprocesando'), 
            css: { 
                top:  ($(window).height() - 400) /2 + 'px', 
                left: ($(window).width() - 400) /2 + 'px', 
                width: '400px' 
            } 
        }); 
         setTimeout($.unblockUI, 500); 
}


function bloquearInicio(){
        $.blockUI({
            message: $('#msginicio'), 
            css: { 
                top:  ($(window).height() - 600) /2 + 'px', 
                left: ($(window).width() - 600) /2 + 'px', 
                width: '600px' 
            } 
        }); 
         setTimeout($.unblockUI, 1000); 
}

function desbloquearPantalla(){
    $.unblockUI();
}


function ejectSubmitForms(){
    $(document).on("click", "#jsonresponsebtn", function(e) {
        bloquearPantalla();
        var form = $(this).parents('form');
//        $(form).bt_validate();
        $(form).ajaxForm({dataType:  'json', success: getResponseNewAction});
    });
    $(document).on("click", "#jsonresponsebtn3", function(e) {
        var form = $(this).parents('form');
//        $(form).bt_validate();
        $(form).ajaxSubmit({dataType:  'json', success: getResponseNewAction});
    });
    $(document).on("click", "#jsonresponsebtn2", function(e) {
        var objThis = $(this);
        bootbox.confirm("<h2><span class='glyphicon glyphicon-question-sign'></span>&nbsp;Seguro que desea realizar esta operacion?</h2> <h4 class='text-info'>No se podra anular los cambios</h4>", function(result) {
            if(result){
                var form = $(objThis).parents('form');
//                $(form).submit(function() {
//                    alert('holaa')
                    $(form).ajaxSubmit({dataType:  'json', success: getResponseNewAction});
//                    return false; 
//                });                
            }
        }); 
    });
    return false;
}

function getResponseNewAction(data){
    if(data.ok > 0){
       /* $('.top-right').notify({
        message: {text: 'El proceso se ha completado correctamente'}, type: 'success', fadeOut: {delay: 3500}
        }).show();*/
        $.scojs_message('El proceso se ha completado correctamente', $.scojs_message.TYPE_OK);
        desbloquearPantalla();
    }else{
       /* $('.top-right').notify({
        message: {text: 'No se ha podido completar el proceso!'}, type: 'warning', fadeOut: {delay: 3500}
        }).show();*/
        // e.preventDefault();
        $.scojs_message('No se ha podido completar el proceso', $.scojs_message.TYPE_ERROR);
        desbloquearPantalla();
    }
}

function alertaInfo(msj, title){
    $('.top-right').notify({
        message: {text: ''+title+' - '+msj}, type: 'info', fadeOut: {delay: 3500}
    }).show();    
}

function alertaImportant(msj, title){
    $('.top-right').notify({
        message: {text: ''+title+' - '+msj}, type: 'warning', fadeOut: {delay: 3500}
    }).show();  
}

function alertaExito(msj, title){
    $.scojs_message(msj, $.scojs_message.TYPE_OK);
}

function alertaError(msj, title){
    /*$('.top-right').notify({
        message: {text: ''+title+' - '+msj}, type: 'danger', fadeOut: {delay: 3500}
    }).show();  */
    $.scojs_message(msj, $.scojs_message.TYPE_ERROR);
}


function ejectSubmitFormsHtmlOutput(elem, outputelem){
    $(document).on("click", elem, function(e) {
    $(outputelem).html('<img alt="Espere..." src="'+main_path+'/css/img/loading2.gif'+'">Espere...');        
        var form = $(this).parents('form');
        $(form).ajaxForm({target: outputelem});
    });    
    return false;
}

function ejectSubmitFormsHtmlOutput2(elem, outputelem, event){
    if(!event || event == 'undefined'){
        event = 'click';
    }
    $(document).on(event, elem, function(e) {
        $(outputelem).html('<img alt="Espere..." src="'+main_path+'/css/img/loading2.gif'+'">Espere...');                
        var form = $(this).parents('form');
        $(form).ajaxSubmit({target: outputelem});
    });
    return false;
}

function remove_wait_msg(){
    $('#'+outputelem).next('div #msg_wait').remove()
}

function processJson(data) { 
    // 'data' is the json object returned from the server 
//    alert(data.html); 
    $('#clientslistout').html(data.html);
}

function loadFormAjax(){
    $(document).on("click", '#ajax_json_btn', function(e) {
//        $(this).attr('disabled','disabled').removeClass('btn-primary').addClass('btn-default');
//        var outputelem = $(this).attr('data-target');
//    $("#"+outputelem).html('<div id="msg_wait"><hr class="clr"><img src="'+main_path+'resources/img/loading83.gif" alt="Eespere.."/></div>');
        var form = $(this).parents('form');
//                        alert('hola');
        $(form).ajaxForm({ 
            // dataType identifies the expected content type of the server response 
            dataType:  'json', 

            // success identifies the function to invoke when the server response 
            // has been received 
            success:   processJson 
        }); 
    });
    
    $(document).on("click", '#ajaxformbtn', function(e) {
        var disabled = true;
        var outputelem = $(this).attr('data-target');
        var nodisabled = $(this).attr('no-disabled');
     
        if(nodisabled != null && nodisabled != 'undefined' && nodisabled != '' ){
            disabled = false;
        }
        if(disabled){
            $(this).attr('disabled','disabled').removeClass('btn-primary').addClass('btn-default');            
        }
        
        var progress_bar = '<div class="progress"> <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%"> <span class="sr-only">45% Complete</span> </div></div>';
        
        $("#"+outputelem).html('<div id="msg_wait"><hr class="clr"/>Procesando, espere un momento'+progress_bar+'</div>');
            var form = $(this).parents('form');
            $(form).ajaxForm(
            {
                target: "#"+outputelem,
            });
        });
    
    $(document).on("click", '#ajaxformurl', function(e) {
        $(this).attr('disabled','disabled').removeClass('btn-primary').addClass('btn-default');
        var outputelem = $(this).attr('data-target'),
            url = $(this).attr('data-url');
        var loadingbar = '<div class="progress"> <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%"> <span class="sr-only">45% Complete</span> </div> </div>';
        $("#"+outputelem).html(loadingbar);        
            var form = $(this).parents('form');
            $(form).ajaxForm({
    //            beforeSubmit : validateNewBoleto,
                url: url,
                target: "#"+outputelem 
            });
    });    
    
    $(document).on("click", '#ajaxformbtn2', function(e) {
        $(this).attr('disabled','disabled').removeClass('btn-primary').addClass('btn-default');        
        var form = $(this).parents('form'),outputelem = $(this).attr('data-target');
        if(outputelem != '' && outputelem != 'undefined' || outputelem != null){
            $("#"+outputelem).html('<img alt="Espere..." src="'+main_path+'/css/img/loading2.gif'+'">Espere...');
                $(form).ajaxSubmit({target: "#"+outputelem});            
        }else{
            $(form).ajaxSubmit();            
        }
        return false;
    }); 
    
    $(document).on("click", "#ajaxformbtn3", function(e) {
        $(this).attr('disabled','disabled').removeClass('btn-primary').addClass('btn-default');             
        var objThis = $(this);
        var outputelem = $(this).attr('data-target');        
        bootbox.confirm("<h2><span class='glyphicon glyphicon-question-sign'></span>&nbsp;Seguro que desea realizar esta operacion?</h2> <h4 class='text-info'>No se podra anular los cambios</h4>", function(result) {
            if(result){
                var form = $(objThis).parents('form');
                $(form).ajaxSubmit({target: "#"+outputelem});
            
            }
        }); 
    });    
    
    /* 
     * cargamos mediante ajax sin necesidad que este dentro de un form 
     * lo unico q el elemento debe tener es el atributo data-id
     * sobre el cual se ejecutara una funcion desde php
    */
       $(document).on("click", "#ajaxidbtn", function(e) {
           var rowid = $(this).attr('rowid'),
               url = $(this).attr('data-url'),
               datatarget = $(this).attr('data-target');
            $.ajax({
                type: "POST",
                url: url,
                data: { rowid: rowid },       
                success: function(html){
                    $(datatarget).html(html);
                },
                error: function(){
                    alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!");
                }              
            });
            return false;
       });
    /* 
        * igual que el anterior, solo que este comprueba si ya tiene
        * algo en el div, no hace la llamada ajax
    */
       $(document).on("click", "#ajaxidbtn2", function(e) {
           var rowid = $(this).attr('rowid'),
               url = $(this).attr('data-url'),
               datatarget = $(this).attr('data-target');
               var htmltarget = $.trim($(datatarget).html());
               if(htmltarget == '' || htmltarget == 'undefined' || htmltarget == null){
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: { rowid: rowid },       
                        success: function(html){
                            $(datatarget).html(html);
                        },
                        error: function(){
                            alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!");
                        }              
                    });                   
               }

//            .done(function( msg ) {
//                alert( "Data Saved: " + msg );
//            });           
       });
    
    /* este no reemplaza el contenido, sino que lo adjunta al que ya existe */
       $(document).on("click", "#ajax_append_btn", function(e) {
           var rowid = $(this).attr('rowid'),
               url = $(this).attr('data-url'),
               datatarget = $(this).attr('data-target'),
               append_to = $(this).attr('myself');
               
               if(append_to != 'undefined'){
                   datatarget = $(this).parents(datatarget);
               }
                   
            $.ajax({
                type: "POST",
                url: url,
                data: { rowid: rowid },       
                success: function(html){
                    $(datatarget).append(html);
                },
                error: function(){
                    alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!");
                }              
            });
            return false;
       });    
    
    return false;
}

function loadTableSorter(){
//$(function() {

  $.extend($.tablesorter.themes.bootstrap, {
    // these classes are added to the table. To see other table classes available,
    // look here: http://twitter.github.com/bootstrap/base-css.html#tables
    table      : 'table table-bordered',
    header     : 'bootstrap-header', // give the header a gradient background
    footerRow  : '',
    footerCells: '',
    icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
    sortNone   : 'bootstrap-icon-unsorted',
    sortAsc    : 'icon-chevron-up glyphicon glyphicon-chevron-up',     // includes classes for Bootstrap v2 & v3
    sortDesc   : 'icon-chevron-down glyphicon glyphicon-chevron-down', // includes classes for Bootstrap v2 & v3
    active     : '', // applied when column is sorted
    hover      : '', // use custom css here - bootstrap class may not override it
    filterRow  : '', // filter row class
    even       : '', // odd row zebra striping
    odd        : ''  // even row zebra striping
  });

  // call the tablesorter plugin and apply the uitheme widget
  $(".tablesorter").tablesorter({
    // this will apply the bootstrap theme if "uitheme" widget is included
    // the widgetOptions.uitheme is no longer required to be set
    theme : "bootstrap", widthFixed: true, headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!
    // widget code contained in the jquery.tablesorter.widgets.js file
    // use the zebra stripe widget if you plan on hiding any rows (filter widget)
    widgets : [ "uitheme", "filter", "zebra" ],
    widgetOptions : {
      // using the default zebra striping class name, so it actually isn't included in the theme variable above
      // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
      zebra : ["even", "odd"],
      // reset filters button
      filter_reset : ".reset"
      // set the uitheme widget to use the bootstrap theme class names
      // this is no longer required, if theme is set
      // ,uitheme : "bootstrap"
    }
  })
  .tablesorterPager({
    // target the pager markup - see the HTML block below
    container: $(".ts-pager"),
    // target the pager page select dropdown - choose a page
    cssGoto  : ".pagenum",
    // remove rows from the table to speed up the sort of large tables.
    // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
    removeRows: false,
    // output string - default is '{page}/{totalPages}';
    // possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
    output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'
  });

//});
}

    $.autosugest_search = function(elem) {
        var url = $(elem).attr('data-url'),
            callback_function = $(elem).attr('callback'),
            minLength = $(elem).attr('min-length'),
            limit = $(elem).attr('limit'),
            id = $(elem).attr('value-id');
        
        if(minLength == null || minLength == '' || minLength == 'undefined'){
            minLength = 4;
        }
        if(limit == null || limit == '' || limit == 'undefined'){
            limit = 10;
        }
        if(id == null || id == '' || id == 'undefined'){
            id = 'ci';
        }
         $(elem).typeahead({
                    template:['<div class="media br-bottom">',
                          '<div class="media-body"><strong class="media-heading">{{value}}</strong>',
                          '<p>{{ci}}<p></div></div>'
                                  ].join(''),
                        engine: Hogan,
                        remote: url,
                        minLength: minLength,
                        limit: limit,
                })
                .on('typeahead:selected', function(event, datum) {
                    window[callback_function](datum);
                });
    }
    

    $.load_autosugest = function(elem, callback_function, minLength, limit, id){
        var url = $(elem).attr('data-url');
        if(minLength == null || minLength == '' || minLength == 'undefined'){
            minLength = 4;
        }
        if(limit == null || limit == '' || limit == 'undefined'){
            limit = 10;
        }
        if(id == null || id == '' || id == 'undefined'){
            id = 'ci';
        }
         $(elem).typeahead({
                    template:['<div class="media br-bottom">',
                          '<div class="media-body"><h4 class="media-heading">{{value}}</h4>',
                          '<p>{{ci}}<p></div></div>'
                                  ].join(''),
                        engine: Hogan,
                        remote: url,
                        minLength: minLength,
                        limit: limit,
                })
                .on('typeahead:selected', function(event, datum) {
                    callback_function(datum);
                });
    }
    
$.loadAjaxPanel = function(elemclick,sizeopt,positionopt){
    var jspanel_all, elemclickgeneric = '#ajaxpanelbtn',
            defsize = { width: '98%', height: 600 }, defposition = {top: 0, left: 10};
    if(!elemclick) {
        elemclick = elemclickgeneric;
    }
    if(!sizeopt) {
        sizeopt = defsize;
    }
    if(!positionopt) {
        positionopt = defposition;
    }
    $(document).on('click', elemclick, function(e){
        var url = $.trim($(this).attr('data-url')),
        title = $.trim($(this).attr('title')),
        elemoutput = $.trim($(this).attr('data-target'));
                
        var modal = false,
        size = sizeopt;
        if($.trim($(this).attr('modal')).length > 0){
           if($.trim($(this).attr('modal')) == 'true'){
                modal = true;
           }
        }
        if($.trim($(this).attr('data-width')).length > 0 && $.trim($(this).attr('data-height')).length > 0){
           size = { width: $.trim($(this).attr('data-width')), height: parseInt($.trim($(this).attr('data-height'))) };
        }
        
        var options ={
             bootstrap: "success",
            modal: modal,
            size: size,
            theme: 'info',
            title:    title,            
            overflow: 'auto',
            position:  positionopt,
            controls: { buttons:  true, iconfont: 'bootstrap' },
                ajax: {
                    url: url
                }
            };
            
        if (jspanel_all){
            jspanel_all.close();
            jspanel_all = $( "#"+elemoutput ).jsPanel(options);
//            alertaExito('El panel ya se encuentra abierto');
        }else{
            jspanel_all = $( "#"+elemoutput ).jsPanel(options);
        }
//        return false;
    });    
    
//    $(document).on('keyup', null, 'esc', function(e){
//        jspanel_all.close();
//        return false;         
//    });
}


$.load_datepicker = function(){
    $(document).on("mousedown", "input.datepicker", function(e) {
//alert('hola');
        $('.datepicker').datepicker({
            format: "yyyy-mm-dd",
            language: "es"
        });
        
        $('.datepicker2').datepicker({
            format: "mm/yyyy",
//            viewMode: "years", 
            minViewMode: "months",
            language: "es"
        });          
    }); 
}

$.show_hide_html = function(){
    $(document).on("click", "#show_hide_btn", function(e) {
        var outputelem = $(this).attr('data-target');
        var rowid = $(this).attr('rowid');

        if( rowid ) {
            if( $(outputelem+rowid).is(":visible") ){
                $(outputelem+rowid).hide();
            }else{
                $(outputelem+rowid).show();
            }
        }else{
            
            if( $(outputelem).is(":visible") ){
//                alert(outputelem);
                $(outputelem+'*').hide();
            }else{
//                alert(outputelem);
                $(outputelem+'*').show();
            }  
        }            
    });     
}


    $(function() {
        $(document).on("mousedown", "input.number", function(e) {
            $(".number").numeric();
        });
        $(document).on("mousedown", "input.integer", function(e) {
            $(".integer").numeric(false, function() {this.value = "1";this.focus();});
        });
        $(document).on("mousedown", "input.positive", function(e) {
            $(".positive").numeric({negative: false}, function() {this.value = "";this.focus();});
        });
        $(document).on("mousedown", "input.positive-integer", function(e) {
            $(".positive-integer").numeric({decimal: false, negative: false}, function() {this.value = "";this.focus();});
        });        
        $('.combobox').combobox();
        
        $.load_datepicker();
        $.loadAjaxPanel();
        loadFormAjax();
        printelem();
        $.show_hide_html();
        
    });
    
//    $( document ).ajaxStart(function() {
//        $('#ajaxformbtn').attr('disabled','disabled').removeClass('btn-primary').addClass('btn-default');
//        $('#ajaxformbtn2').attr('disabled','disabled').removeClass('btn-primary').addClass('btn-default');
//        $('#ajaxformbtn3').attr('disabled','disabled').removeClass('btn-primary').addClass('btn-default');
//        $('#ajaxformurl').attr('disabled','disabled').removeClass('btn-primary').addClass('btn-default');
//    });
    
    $( document ).ajaxStop(function() {
        $('button#ajaxformbtn').each(function() {
            $(this).removeAttr('disabled').removeClass('btn-default').addClass('btn-primary');
        });
        $('button#ajaxformbtn2').each(function() {
            $(this).removeAttr('disabled').removeClass('btn-default').addClass('btn-primary');
        });
        $('button#ajaxformbtn3').each(function() {
            $(this).removeAttr('disabled').removeClass('btn-default').addClass('btn-primary');
        });
        $('button#ajaxformurl').each(function() {
            $(this).removeAttr('disabled').removeClass('btn-default').addClass('btn-primary');
        });
    });
/*FIN funciones de archivo anterior llamado comunesbillingsoft.js*/
