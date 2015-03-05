//
//
//function alertaInfo(msj, title){
//    $('.top-right').notify({
//        message: {text: ''+title+' - '+msj}, type: 'info', fadeOut: {delay: 3500}
//    }).show();    
//}
//
//function alertaImportant(msj, title){
//    $('.top-right').notify({
//        message: {text: ''+title+' - '+msj}, type: 'warning', fadeOut: {delay: 3500}
//    }).show();  
//}
//
//function alertaExito(msj, title){
//   /* $('.top-right').notify({
//        message: {text: ''+title+' - '+msj}, type: 'success', fadeOut: {delay: 3500}
//    }).show();  */
//    $.scojs_message(msj, $.scojs_message.TYPE_OK);
//}
//
//function alertaError(msj, title){
//    /*$('.top-right').notify({
//        message: {text: ''+title+' - '+msj}, type: 'danger', fadeOut: {delay: 3500}
//    }).show();  */
//    $.scojs_message(msj, $.scojs_message.TYPE_ERROR);
//}

var progressbar = '<div class="progress"> <div class="progress-bar progress-bar-striped active"  role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%"> <span class="sr-only">45% Complete</span> </div> </div>';

function loadFormAjax(){
    $(document).on("click", '#ajaxformbtn', function(e) {
        alert('holaa');
        var outputelem = $(this).attr('data-target');
    $("#"+outputelem).html(progressbar);
        var form = $(this).parents('form');
        $(form).ajaxForm(
        {
            target: "#"+outputelem
        });
    });    
    
    $(document).on("click", '#ajaxformurl', function(e) {
    var outputelem = $(this).attr('data-target'),
        url = $(this).attr('data-url');
    $("#"+outputelem).html(progressbar);        
        var form = $(this).parents('form');
        $(form).ajaxForm({
//            beforeSubmit : validateNewBoleto,
            url: url,
            target: "#"+outputelem 
        });
//        return false;
    });    
    
    $(document).on("click", '#ajaxformbtn2', function(e) {
        var outputelem = $(this).attr('data-target');
    $("#"+outputelem).html(progressbar);
        var form = $(this).parents('form');
        $(form).ajaxSubmit({target: "#"+outputelem});
    });      
    
    return false;
}