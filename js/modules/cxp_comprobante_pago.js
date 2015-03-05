/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    var load_cta_contable = function (datum) {
        $('#cta_debito').html(datum.value);
        $('#cta_debito').removeAttr('style');        
        $('#cta_debito').attr('style','background:#d7ebf9; font-weight: bold;color:#000; font-size:20px');
        $('#cta_contable_debito').val(datum.ci);       
    };
    
    var load_client = function (datum) {
        $('#view_client').html(datum.value);
        $('#view_client').removeAttr('style');        
        $('#view_client').attr('style','background:#d7ebf9; font-weight: bold;color:#000; font-size:20px');
        $('#view_client').val(datum.id);       
    };
    
    $(function() {
//        autosugest_supplier();
        $.load_autosugest('#cta_contable_autosug', load_cta_contable, 4, 10, 'id');        
        $.load_autosugest('#client_autosug', load_client, 4, 10, 'id');        
//        printelem();
////        $.loadAjaxPanel();
////        loadFormAjax();   
////        $.load_datepicker();
////        $.loadAjaxPanel('#loadproductsviewbtn',{ width: '99%', height: 300 },{top: 35, left: 5});
////        $.loadAjaxPanel('#loadsearchprovbtn', { width: '99%', height: 300 }, {bottom: 0, left: 5});            
//        
//        $(document).on("mousedown", "input.number", function(e) {
//            $(".number").numeric();
//        });
//        $(document).on("mousedown", "input.integer", function(e) {
//            $(".integer").numeric(false, function() {this.value = "1";this.focus();});
//        });
//        $(document).on("mousedown", "input.positive", function(e) {
//            $(".positive").numeric({negative: false}, function() {this.value = "";this.focus();});
//        });
//        $(document).on("mousedown", "input.positive-integer", function(e) {
//            $(".positive-integer").numeric({decimal: false, negative: false}, function() {this.value = "";this.focus();});
//        });              
    });