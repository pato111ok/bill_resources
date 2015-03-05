/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

 var main_path = $('#main_path').val(),
     numdecimales = $('#numdecimales').val(),
     ivaporcent = $('#ivaporcent').val(),
     userid = $('#userid').val(),
     valorcero = 0;
     valorcero = valorcero.toFixed(numdecimales);

    var opttable250 = {
        "sScrollY": "250px",
        "bPaginate": false
    };
    var opttable150 = {
        "sScrollY": "150px",
        "bPaginate": false
    };
// $.fn.editable.defaults.mode = 'popup';
//    $.fn.editable.defaults.mode = 'popup';

//  window.onbeforeunload = confirmExit;
//  function confirmExit()
//  {
//    return "Ha intentado salir de esta pagina. Si ha realizado algun cambio en los campos sin hacer clic en el boton Guardar, los cambios se perderan. Seguro que desea salir de esta pagina? ";
//  }

$(function() {
//       $(document).on("click", "#destinoruta", function(e) {
//       alert('hola');
//       var destinoname = $(this).val(),
//           costo = $(this).attr('costo');
//           alert(costo)
//           $('#destinopasajero').val(destinoname);
//           $('#costo_a_destino').val(costo);
//        return false;
//   }); 

    $('#fullwindowbtn').fullscreen();
    bloquearInicio();

    printelem();
    
    $('.combobox').combobox();

    $("[data-toggle=tooltip]").tooltip({'html':'true', 'placement':'auto'});
    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
    
    /*Autosuggest*/
    $('.typeahead.input-sm').siblings('input.tt-hint').addClass('hint-small');
    $('.typeahead.input-lg').siblings('input.tt-hint').addClass('hint-large');     
    
    $(document).on("mousedown", "input.number", function(e) {
        $(".number").numeric();
    });
    
    $(document).on("mousedown", "input.integer", function(e) {
//        $(".integer").numeric(false, function() { alert('Solo se permiten enteros'); this.value = "1"; this.focus(); });
        $(".integer").numeric(false, function() {this.value = "1";this.focus();});
    });
    $(document).on("mousedown", "input.positive", function(e) {
//        $(".positive").numeric({ negative: false }, function() { alert("No negative values"); this.value = ""; this.focus(); });
        $(".positive").numeric({negative: false}, function() {this.value = "";this.focus();});
    });
    $(document).on("mousedown", "input.positive-integer", function(e) {
//        $(".positive-integer").numeric({ decimal: false, negative: false }, function() { alert("Positive integers only"); this.value = ""; this.focus(); });
        $(".positive-integer").numeric({decimal: false, negative: false}, function() {this.value = "";this.focus();});
    });

    
    $(document).on("mouseover", "#quitarprodnewfactventabtn", function(e) {
        var codprod = $(this).attr('codprod');
        $('.quitarprodnewfactventabtn'+codprod).tooltip('show')
    });    

//  $.fn.editable.defaults.mode = 'inline';
    $(".alert").alert()
//    $('#username2').editable();    
    $('#username2').editable();
    
    $(document).on("mousedown", "input.datepicker", function(e) {
        $('.datepicker').datepicker({
            format: "yyyy-mm-dd",
//            viewMode: "years", 
//            minViewMode: "months",
            language: "es"
        });
    });
    
    $(document).on("mousedown", "input.datepicker2", function(e) {
        $('.datepicker2').datepicker({
            format: "mm/yyyy",
//            viewMode: "years", 
            minViewMode: "months",
            language: "es"
        });
    });
    
    
    
//$("#datepicker").datepicker( {
//    format: "mm-yyyy",
//    viewMode: "months", 
//    minViewMode: "months"
//});
    
    
//    $('#bt_form').bt_validate();
    
//    $(document).delegate('#username2','click',function(e){ 
//    $(document).on("click", "#username2", function(event){
////       e.stopPropagation();
//            $('#username2').editable();       
//    });

//    $(document).on("click", "#printfinalistasbtn", function(event){
//        $.jPrintArea("#puntajetodascandidatas");    
//    });
//    $(document).on("click", "#printpuntajefinalistasbtn", function(event){
//        $.jPrintArea("#puntajefinalistasreport");    
//    });
    

    ejectSubmitForms();
    loadFormAjax();

    /*Obtener los modulos q se van a cargar*/        
    if ($('#modulesload').length){
        var modulesload = $('#modulesload').val();
//        alert(modulesload);
        arrmodulesload = modulesload.split(',');
        /*carga unicamente los modulos necesarios y la funcion ejectSubmitForms();*/
        for (a in arrmodulesload ) {
            window[arrmodulesload[a]]();
        }    
    }

/* admin usu */               
    ejectSubmitFormsHtmlOutput("#newsupplierbtn",  "#newsupplieroutput");     
    
    /*comunes*/
    ejectSubmitFormsHtmlOutput("#newclientbtn",  "#newclientoutput");     

    $('#rootwizard').bootstrapWizard({onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;
            var $percent = ($current/$total) * 100;
//            alert($percent)
            $('#rootwizard').find('.bar').css({width:$percent+'%'});
    }});

  $('#frame').sly({
    horizontal: 1,
    
    itemNav: 'forceCentered',
    smart: 1,
    activateOn: 'click',
    
    scrollBy: 1,
    
    mouseDragging: 1,
    swingSpeed: 0.2,
    
    scrollBar: $('.scrollbar'),
    dragHandle: 1,
    
    speed: 600,
    startAt: 1
  });
    
    
/*************** Para presentacion en forma de arbol *******/    
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
        }
        e.stopPropagation();
    });
/*************** FIN Para presentacion en forma de arbol *******/    
    
});



