/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*********************************************/
    function autosugest_product_name(){
         $('#product_name_autosug').typeahead({
                    template:['<div class="media br-bottom">',
                          '<div class="media-body"><h4 class="media-heading">{{value}}</h4>',
                          '<p>{{id}}<p></div></div>'
                                  ].join(''),
                        engine: Hogan,
                        remote: main_path+'ventas/product/autosugest_by_name/%QUERY',
                        minLength: 4,
                        limit: 10,
                })
                .on('typeahead:selected', function(event, datum) {
                    var url = main_path+'ajustentrada/index/insertprod';
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: { id: datum.id,qty: 1 },       
                            success: function(html){
                                $('#cotizacionescart').html(html);                    
                            },
                            error: function(){
                                alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!");
                            }              
                        }); 
                $('#product_name_autosug').val('');
         });

        $('#client_ci_autosuggest').typeahead({
                    template:['<div class="media br-bottom">',
                          '<div class="media-body"><h4 class="media-heading">{{value}}</h4>',
                          '<p>{{client_name}}<p></div></div>'
                                  ].join(''),
                        engine: Hogan,
                        remote: main_path+'cxc/client/autosugest_by_ci/%QUERY',
                        minLength: 4,
                        limit: 10,
        })
    }


    function autosugest_supplier(){
         $('#supplier_name').typeahead({
                    template:['<div class="media br-bottom">',
                          '<div class="media-body"><h4 class="media-heading">{{value}}</h4>',
                          '<p>{{ci}}<p></div></div>'
                                  ].join(''),
                        engine: Hogan,
                        remote: main_path+'compras/proveedor/autosugest/%QUERY',
                        minLength: 4,
                        limit: 10,
                })
                .on('typeahead:selected', function(event, datum) {
                    var url = main_path+'ajustentrada/index/findByCI';
                        $.ajax({
                            type: "POST",
                            url: url,
                            data: { ci: datum.ci,id: datum.id },       
                            success: function(html){
                                $('#cotizacionescart').html(html);                    
                            },
                            error: function(){
                                alertaError("Error!! No se pudo alcanzar el archivo de proceso", "Error!!");
                            }              
                        });                  
         });
    }
    
    function autosugest_supplier_load(){
         $('#supplier_name_load').typeahead({
                    template:['<div class="media br-bottom">',
                          '<div class="media-body"><h4 class="media-heading">{{value}}</h4>',
                          '<p>{{ci}}<p></div></div>'
                                  ].join(''),
                        engine: Hogan,
                        remote: main_path+'compras/proveedor/autosugest/%QUERY',
                        minLength: 4,
                        limit: 10,
                })
                .on('typeahead:selected', function(event, datum) {                    
                    $('#proveedor_id').val(datum.id);             
                    $('#proveedor_view').html(datum.value);             
                    $('#proveedor_view').css('background','#d7ebf9').css('color','#000');             
         });
    }
        
    $(function() {
        autosugest_supplier_load();
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
        
        autosugest_product_name();
        autosugest_supplier();
        printelem();
        $.loadAjaxPanel();
        loadFormAjax();   
        $.loadAjaxPanel('#loadproductsviewbtn',{ width: '99%', height: 300 },{top: 35, left: 5});
        $.loadAjaxPanel('#loadsearchprovbtn', { width: '99%', height: 300 }, {bottom: 0, left: 5});            
    });