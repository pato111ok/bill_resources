/**
 * Bootstrap validate
 * English lang module
 */

$.bt_validate.fn = {
  'required' : function(value) { return (value  != null) && (value != '')},
  'email' : function(value) { return /^[a-z0-9-_\.]+@[a-z0-9-_\.]+\.[a-z]{2,4}$/.test(value) },
  'www' : function(value) { return /^(http:\/\/)|(https:\/\/)[a-z0-9\/\.-_]+\.[a-z]{2,4}$/.test(value) },
  'date' : function(value) { return /^[\d]{2}\/[\d]{2}\/[\d]{4}$/.test(value) },
  'time' : function(value) { return /^[\d]{2}:[\d]{2}(:{0,1}[\d]{0,2})$/.test(value) },
  'datetime' : function(value) { return /^[\d]{2}\/[\d]{2}\/[\d]{4} [\d]{2}:[\d]{2}:{0,1}[\d]{0,2}$/.test(value) },
  'number' : function(value) { return /^[\d]+$/.test(value) },
  'float' : function(value) { return /^([\d]+)|(\d]+\.[\d]+)$/.test(value) },
  'equal' : function(value, eq_value) { return (value == eq_value); },
  'min' : function(value, min) { return Number(value) >= min },
  'max' : function(value, max) { return Number(value) <= max },
  'between' : function(value, min, max) { return (Number(value) >= min) && (Number(value) <= max)},
  'length_min' : function(value, min) { return value.length >= min },
  'length_max' : function(value, max) { return value.length <= max },
  'length_between' : function(value, min, max) { return (value.length >= min) && (value.length <= max)}
}

$.bt_validate.text = {
  'required' : 'El valor no puede estar vacio',
  'email' : 'El email no es valido',
  'www' : 'The value is not valid http string',
  'date' : 'The value is not valid date',
  'time' : 'The value is not valid time',
  'datetime' : 'The value is not valid datetime',
  'number' : 'The value is not valid number',
  'float' : 'The value is not valid floating point number',
  'equal' : 'The value must be equal to "%1"',
  'min' : 'El valor debe ser igual o superior a %1',
  'max' : 'El valor debe ser igual o menor que %1',
  'between' : 'El valor debe estar entre %1 y %2',
  'length_min' : 'La longitud del valor debe ser igual o superior a %1',
  'length_max' : 'La longitud del valor debe ser igual o menor a %1',
  'length_between' : 'La longitud del valor debe ser entre %1 y %2'
}