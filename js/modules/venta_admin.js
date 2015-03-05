/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function autosugest_client_search_venta(){
     $('#client_name_search_venta').typeahead({
                template:['<div class="media br-bottom">',
                      '<div class="media-body"><h4 class="media-heading">{{value}}</h4>',
                      '<p>{{ci}}<p></div></div>'
                              ].join(''),
                    engine: Hogan,
                    remote: main_path+'ventas/clients/autosugest/%QUERY',
                    minLength: 4                               
            })
            .on('typeahead:selected', function(event, datum) {
                $('#client_id').val(datum.ci);
     });
     
    $(document).on("keyup", "#client_name", function(e) {
        var supp_name = $(this).val();
        if( supp_name === '' || supp_name === 'undefined' ){
             $('#client_id').val('');
        }
    });     
}

    $(function() {
          autosugest_client_search_venta();
    });