/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// var main_path = $('#main_path').val(),
//     numdecimales = $('#numdecimales').val(),
//     ivaporcent = $('#ivaporcent').val(),
//     userid = $('#userid').val(),
//     valorcero = 0;
//     valorcero = valorcero.toFixed(numdecimales);

    var opttable350 = {
        iVote: -1,
        "sScrollY": "350px",
        "bPaginate": false,
        "bRetrieve": true
    };
    var opttable250 = {
        "sScrollY": "250px",
        "bPaginate": false
    };
    var opttable150 = {
        "sScrollY": "150px",
        "bPaginate": false
    };
    
//    var optprint1 = { debug: false, importCSS: true, printContainer: true, loadCSS: main_path+"/css/allstyles.css", removeInline: false };
    
// $.fn.editable.defaults.mode = 'popup';
//    $.fn.editable.defaults.mode = 'popup';

//  window.onbeforeunload = confirmExit;
//  function confirmExit()
//  {
//    return "Ha intentado salir de esta pagina. Si ha realizado algun cambio en los campos sin hacer clic en el boton Guardar, los cambios se perderan. Seguro que desea salir de esta pagina? ";
//  }

$(function() {
    loadFormAjax();
});



