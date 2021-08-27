module.exports = {
  forms: {
    unknown_error: 'Error desconocido',
    required: 'El campo es necesario',
    email: 'No es un email valido',
    minLength: 'El campo no puede ser menor de {limit} caracteres',
    maxLength: 'El campo no puede ser mayor de {limit} caracteres',
    minItems: 'Tiene que tener mínimo {limit} elementos',
    maxItems: 'Tiene que tener máximo {limit} elementos',
    format: {
      email: 'No es un email valido',
      uri: 'No es una url valida',
      numbers: 'Solo se permiten números',
      phone: 'Teléfono invalido (+xx xxxxxxxxx)',
    },
  },
  request_errors: {
    permission_error:
      'Es necesario el permiso "{permissionName}" con alguna de las siguientes acciones "{actions}"',
  },
  page_header: {
    new: 'Nuevo',
    cancel: 'Cancelar',
    save: 'Guardar',
    edit: 'Editar',
  },
  form_field_types: {
    view: 'Ver',
    edit: 'Editar',
    save: 'Guardar',
    text_field: 'Campo de texto',
    rich_text: 'Texto enriquecido',
    number: 'Numero',
    date: 'Fecha',
    email: 'Email',
    phone: 'Teléfono',
    link: 'Enlace',
    archive: 'Archivo',
    multioption: 'Multiples opciones',
    checkbox: 'Checkbox',
    select: 'Select',
    boolean: 'Boolean',
    multioption_types: {
      dropdown: 'Dropdown (+chips)',
      checkboxs: 'Checkboxes',
      radio: 'Radio buttons',
    },
    boolean_types: {
      checkbox: 'Checkbox',
      radio: 'Radio buttons',
      switcher: 'Switcher',
    },
    boolean_initial_status: {
      yes: 'Si',
      no: 'No',
      nothing: 'No hay selección',
    },
  },
};
