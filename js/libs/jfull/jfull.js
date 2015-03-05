/************************************************************************************************/
/*																								*/
/*                                 LICENCIA CREATIVE COMMONS                       				*/
/*                           Attribution - ShareAlike 3.0 Unported               				*/
/*                                                                								*/
/*   AUTHOR: Pablo Luaces Presas                                    							*/
/*   EMAIL: pablo.luaces@gmail.com																*/
/*   KEY: PLPES79452830113190485  																*/
/*                                                                								*/
/*   Este cÃ³digo tiene copyright(C) del autor, para usarlo o deberÃ¡ dejar esta licencia  tal	*/
/*   cual. Si desea  modificarlo siÃ©ntase  libre pero tendrÃ¡ que  anexar su licencia a esta,	*/
/*	 nunca reemplazarla.    																	*/
/*																								*/
/*   Si altera o transforma esta obra, o genera una obra derivada,  sÃ³lo puede  distribuir la	*/
/*   obra  generada bajo una licencia idÃ©ntica a Ã©sta. 											*/
/*									  															*/
/*   Puede leer el texto legal de la licencia en esta direcciÃ³n:								*/
/*  																							*/
/*   http://creativecommons.org/licenses/by-sa/3.0/legalcode									*/
/*																								*/
/*   O un resumen de la misma aquÃ­: http://creativecommons.org/licenses/by-sa/3.0				*/
/*																								*/
/************************************************************************************************/
jQuery.fn.extend({fullscreen:function(e){$("<style>.hidden { display: none; }</style>").appendTo("head");isTouchDevice=function(){var e=document.createElement("div");e.setAttribute("ongesturestart","return;");return typeof e.ongesturestart==="function"};var n=$(this);var r={mode:"all",noSupportText:"Pulsa F11 para pantalla completa",elementId:""};var e=$.extend(r,e);var t=e.elementId==""?document.body:document.getElementById(e.elementId);if(isTouchDevice()||e.mode=="html5")n.addClass("hidden");
if(t.webkitRequestFullScreen||t.mozRequestFullScreen){if(e.mode=="html5")n.toggleClass("hidden");n.on("click",function(){if(t.requestFullscreen)t.requestFullScreen();else if(t.webkitRequestFullScreen)t.webkitRequestFullScreen();else if(t.mozRequestFullScreen)t.mozRequestFullScreen()});$(document).on("fullscreenchange mozfullscreenchange webkitfullscreenchange",function(){n.toggleClass("hidden");$("#"+e.elementId).toggleClass("fullscreen")})}else{n.text(e.noSupportText);$(document).on("keyup",function(e){if(e.which==
122)n.toggleClass("hidden")})}}});