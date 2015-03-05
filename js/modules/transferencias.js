/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var jspanel_lodaproducts_transf;
function openLoadProductsPanel(event, elem ){
    $(document).on(event, elem, function(e){
        open_loadprodpanel();
        return false;
    });     
}

function open_loadprodpanel(){
        var content = $('#searchproductview').html();
        var lodaproductsopt = {
            size: { width: '99%', height: 300 }, title:    'CARGAR PRODUCTOS TRANSFERENCIAS', overflow: 'auto',
            position:  {top: 30, left: 5}, controls: { iconfont: 'bootstrap' },
            content: '<div style="margin:10px">'+content+'<br class="clr"/><div id="searchproductoutput"></div></div>'
        };        
        if (jspanel_lodaproducts_transf){
            jspanel_lodaproducts_transf.close();
//            alert('aqui');
            jspanel_lodaproducts_transf = $( '#container-fluid' ).jsPanel(lodaproductsopt);
        }else{
//            alert('aca');
            jspanel_lodaproducts_transf = $( '#container-fluid' ).jsPanel(lodaproductsopt);  
        }
}

/* Cuando se cambia el valor de porcentaje en recargos */
function control_stock(){
   $(document).on("keyup", '#qty_productslist', function(e) {
       var new_val = parseFloat($(this).val()),
           stock_bod = parseFloat($(this).attr('stock_bod'));
            
            if(isNaN(new_val) || new_val==''){ new_val = 0; }
            if(isNaN(stock_bod) || stock_bod==''){ stock_bod = -1; }
            
           if(new_val > stock_bod){
                $(this).val('1');
                alertaError('No puede agregar una cantidad mayor al stock');
           }
   });
   $(document).on("keyup", '#qty_cartlist', function(e) {       
       var new_val = parseFloat($(this).val()),
           stock_bod = parseFloat($(this).attr('stock_bod'));
           
           if(new_val > stock_bod){
                $(this).val('1');
                alertaError('No puede agregar una cantidad mayor al stock');
           }else{
               if(!isNaN(new_val) && new_val!=''){ 
                    $(this).next('span').children('button').removeAttr('disabled','disabled').removeClass('btn-default').addClass('btn-success');               
               }
           }
   });
}

function transferencias(){
     control_stock();
//     alert('holaaa');
     openLoadProductsPanel('click','#loadproductsviewbtn');        
}