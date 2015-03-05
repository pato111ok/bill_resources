/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    
/* refresca la lista de productos despues de insertar uno nuevo */
    var refresh_cart_insert_prod = function (datum) {
        var url = main_path+'ajustesalida/index/insertprod/time/'+$.now();
            $.ajax({
                type: "POST",
                url: url,
                data: { id: datum.ci, qty: 1 },       
                success: function(html){
                    $('#cotizacionescart').html(html);                    
                },
                error: function(){
                    alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!");
                }              
            });  
            $('#product_name_autosug').val('');
    };
    
    $(function() {
        $.autosugest_search('#product_name_autosug');                 
    });