 /*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function labelFormatter(label, series) {
//  return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "</div>";
//  alert(series.toSource())
    return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + series.data[0][1] + ' USD<br/>'+Math.round(series.percent) +"%</div>";
}

function changeReportsSection(){
//    $(document).delegate("#"+prefix+"btnnewpuntoventa",'click',function(){
    $(document).delegate('#btn_chartreportgastos','click',function(){
        $('#reportstittlesection').html($(this).attr('title'));
        $('.reportsmodule').slideUp(700);
        $('#reportgastos').slideDown(700)
    }).delegate('#btn_chartreportactivos','click',function(){
        $('#reportstittlesection').html($(this).attr('title'));
        $('.reportsmodule').slideUp(700);
        $('#reportactivos').slideDown(700);
    })
}

function getGastos(){
    $(document).delegate('#btnreportschartgastos','click',function(){
//        $("#btnreportschartgastos").live("click",function() {
            var placeholder = $("#reportschartgastos"), 
                repgastosfdesde = $('#repgastosfdesde').val(), 
                repgastosfhasta = $('#repgastosfhasta').val(), 
                repgastosokgrid = $('#repgastosokgrid').is(":checked"),
                data = {'tipo': 1, 'repgastosfdesde': repgastosfdesde, 'repgastosfhasta': repgastosfhasta, 'repactivosokgrid':repgastosokgrid};
            $.ajax({
                url: main_path+"/modules/reportes/controlador/gastosget.php",
                data: data, type: "POST", async: false,
                success: function (result) {
                    data = eval('(' + result + ')');     
/***************************************************************/
                    placeholder.unbind();
                    $("#title").text("Default pie chart");
                    $("#description").text("The default pie chart with no options set.");
                    $.plot(placeholder, data, {
                            series: {
                                pie: {
                                    show: true,radius: 1, // innerRadius: 0.3,
                                    label: {
                                        show: true, radius: 3/4, formatter: labelFormatter,
                                        background: {opacity: 0.5}
                                    }
                                }
                            },
                            legend: {show: true}
                    });
/***************************************************************/
                },
                error: function (xhr, txt, err) {
                    alert("error connecting to data: " + xhr);
                }
            });
            
            if(repgastosokgrid){
                data = {'tipo': 2, 'repgastosfdesde': repgastosfdesde, 'repgastosfhasta': repgastosfhasta, 'repactivosokgrid':repgastosokgrid};
                $.ajax({
                    url: main_path+"/modules/reportes/controlador/gastosget.php",
                    data: data, type: "POST", async: false,
                    success: function (html) {
                        $('#reportsgridgastos').html(html);
                    },
                    error: function (xhr, txt, err) {
                        alert("error connecting to data: " + xhr);
                    }
                });                  
            }
        });
}

function getActivos(){
    $(document).delegate('#btnreportschartactivos','click',function(){    
//        $("#btnreportschartactivos").live("click",function() {
            var placeholder = $("#reportschartactivos"), 
                repactivosfdesde = $('#repactivosfdesde').val(),
                repactivosfhasta = $('#repactivosfhasta').val(),
                repactivosokgrid = $('#repactivosokgrid').is(":checked"), 
                data = {'tipo' : 1, 'repactivosfdesde' : repactivosfdesde, 'repactivosfhasta' : repactivosfhasta, 'repactivosokgrid' : repactivosokgrid};
                
            $.ajax({
                url: (main_path+"/modules/reportes/controlador/activosget.php"),
                data: data, type: "POST", async: false,
                success: function (result) {
                    data = eval('(' + result + ')');                      
                    placeholder.unbind();
                    $("#title").text("Default pie chart");
                    $("#description").text("The default pie chart with no options set.");
                    $.plot(placeholder, data, {
                            series: {
                                pie: {
                                    show: true,radius: 1, // innerRadius: 0.3,
                                    label: {
                                        show: true, radius: 3/4, formatter: labelFormatter,
                                        background: {opacity: 0.5}
                                    }
                                }
                            },
                            legend: {show: true}
                    });
                },
                error: function (xhr, txt, err) {
                    alert("error connecting to data: " + xhr);
                }
            });
            
            if(repactivosokgrid){
                data = {'tipo' : 2, 'repactivosfdesde' : repactivosfdesde, 'repactivosfhasta' : repactivosfhasta, 'repactivosokgrid' : repactivosokgrid}
                $.ajax({
                    url: main_path+"/modules/reportes/controlador/activosget.php",
                    data: data, type: "POST", async: false,
                    success: function (html) {
                        $('#reportsgridactivos').html(html);
                    },
                    error: function (xhr, txt, err) {
                        alert("error connecting to data: " + xhr);
                    }
                });                
            }
            
        });
}

function chartreports(){
    changeReportsSection()
    getGastos()
    getActivos()
    
}
