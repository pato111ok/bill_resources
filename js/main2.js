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

// $.fn.editable.defaults.mode = 'popup';
//    $.fn.editable.defaults.mode = 'popup';

$(function() {
    printelem();
    loadFormAjax();
});
