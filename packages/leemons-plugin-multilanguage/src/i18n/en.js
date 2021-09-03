module.exports = {
  forms: {
    unknown_error: 'Unknown error',
    required: 'The field is required',
    email: 'Not a valid email',
    minLength: 'The field cannot be less than {limit} characters',
    maxLength: 'The field cannot be longer than {limit} characters',
    minItems: 'It must have a minimum of {limit} elements',
    maxItems: 'It must have a maximum of {limit} elements',
    format: {
      email: 'Not a valid email',
      uri: 'Not a valid url',
      numbers: 'Only numbers are allowed',
      phone: 'Invalid phone (+xx xxxxxxxxx)',
    },
  },
  request_errors: {
    permission_error:
      'A {permissionName} permit is required with one of the following {actions} actions',
  },
  page_header: {
    new: 'New',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
  },
  form_field_types: {
    view: 'View',
    edit: 'Edit',
    save: 'Save',
    text_field: 'Text field',
    rich_text: 'Rich text',
    number: 'Number',
    date: 'Date',
    email: 'Email',
    phone: 'Phone',
    link: 'Link',
    archive: 'Archive',
    multioption: 'Multioption',
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
      yes: 'Yes',
      no: 'No',
      nothing: 'No selection',
    },
  },
};
