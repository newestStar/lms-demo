module.exports = {
  calendar: {
    user_section: 'Usuarios',
  },
  user_data_page: {
    page_title: 'Datos del usuario',
    page_description:
      'En esta sección se configuran los campos del dataset de usuarios. Los datos de identificación son obligatorios para el funcionamiento de la plataforma y obligatorios para todos los usuarios de cualquier perfil. Los campos comunes son los que comparten todos los usuarios, pueden ser obligatorios u opcionales (son útiles para ahorrar tiempo a la hora de definir campos comunes a todos los usuarios de la plataforma como un nombre o un apellido). <br/> Por último, los perfiles tienen sus propios conjuntos de datos que pueden ser consultados en la sección de perfiles.',
    tabs: {
      system_data: 'Datos del sistema',
      common_fields: 'Campos comunes',
    },

    systemData: {
      save: 'Guardar',
      saveSuccess: 'Guardado con éxito',
      description1:
        'Campos obligatorios para crear cuentas de usuario (no se pueden editar o eliminar)',
      description2: 'Campos incluidos en el sistema Leemons que se pueden configurar',
      table: {
        name: 'Nombre',
        description: 'Descripción',
        type: 'Tipo',
        actions: 'Acciones',
        makeMandatory: 'Hacer obligatorio',
        disableField: 'Deshabilitar',
      },
      tableItems: {
        email: {
          name: 'Email',
          description: 'Identificador único',
          type: 'Email',
        },
        password: {
          name: 'Contraseña',
          description: '8 caracteres, 1 número, 1 mayúscula, 1 carácter especial',
          type: 'Password',
        },
        name: {
          name: 'Nombre',
          description: 'Cadena, 26 caracteres regulares (sin caracteres especiales)',
          type: 'String',
        },
        surname: {
          name: 'Apellido',
          description: 'Cadena, 26 caracteres regulares (sin caracteres especiales)',
          type: 'String',
        },
        birthday: {
          name: 'Fecha de nacimiento',
          description: 'dd/mm/yyyy',
          type: 'Date',
        },
        surname2: {
          name: '2do. Apellido',
          description: 'Cadena, 26 caracteres regulares (sin caracteres especiales)',
          type: 'String',
        },
        avatar: {
          name: 'Avatar',
          description: 'Formato: PNG, JPG, tamaño 400x400px, máximo 500kb)',
          type: 'Image',
        },
      },
    },
    basic: {
      description: 'Configuración de campos generales',
      table: {
        name: 'Nombre',
        description: 'Descripción',
        type: 'Tipo',
        actions: 'Acciones',
      },
      edit: 'Editar',
      delete: 'Borrar',
    },
    dataset: {
      description: 'Configuración de campos generales',
      filter_by_center: 'Filtrar por centro',
      add_field: 'Añadir campo',
      no_data_in_table: 'Aun no hay datos',
      deleted_done: 'Elemento del dataset borrado con éxito',
    },
    remove_modal: {
      title: '¿Eliminar el elemento?',
      message: 'Esta acción no puede deshacerse',
      cancel: 'No',
      action: 'Eliminar',
    },
  },
  welcome_page: {
    page_title: 'Administración de usuarios',
    page_description:
      'Primeros pasos para configurar correctamente la administración de usuarios.',
  },
  hero_bg: {
    text: '"¡No sé el significado de la mitad de esas largas palabras y, además, no creo que tú tampoco lo sepas!"',
    author: 'Alice in Wonderland <br/> Lewis Carrol',
  },
  list_profiles: {
    page_title: 'Perfiles',
    page_description:
      'Los perfiles de usuario pemriten gestionar los permisos de las aplicaciones. Cada vez que se instala un nuevo plugin es necesario configurar los permisos para cada perfil existente.',
    name: 'Nombre',
    overview: 'Resumen',
    actions: 'Acciones',
    view: 'Ver',
  },
  detail_profile: {
    profile_name: 'Nombre del perfil',
    description: 'Descripción del perfil',
    leemon: 'Leemon',
    permissions_all: 'Todos',
    permissions: 'Permisos',
    select_permissions: 'Seleccione un Leemon para asignar permisos',
    dataset: 'Dataset',
    save_done: 'Perfil creado',
    update_done: 'Perfil actualizado',
    translations: 'Traducciones',
    translations_warning: 'Es necesario guardar el perfil para almacenar las traducciones',
    options_modal: {
      title: 'Traducción',
      description:
        'Traducciones de la información del perfil a los idiomas del sistema',
      accept: 'Aceptar',
      cancel: 'Cancelar',
      profile_name: 'Nombre del perfil',
      profile_description: 'Descripción del perfil',
    },
    dataset_tab: {
      description: 'Campos adicionales para este perfil',
      filter_by_center: 'Filtrar por centro',
      add_field: 'Añadir campo',
      no_data_in_table: 'Aun no hay datos',
      deleted_done: 'Elemento del dataset borrado con éxito',
      table: {
        name: 'Nombre',
        description: 'Descripción',
        type: 'Tipo',
        actions: 'Acciones',
        edit: 'Editar',
        delete: 'Borrar',
      },
    },
    remove_modal: {
      title: '¿Quieres eliminar el elemento?',
      message: 'Esta acción no puede deshacerse',
      cancel: 'No',
      action: 'Eliminar',
    },
  },
  login: {
    title: 'Acceder a mi cuenta',
    email: 'Email',
    password: 'Contraseña',
    remember_password: 'No recuerdo mi contraseña',
    log_in: 'Entrar',
    not_registered: 'No estoy registrado',
    form_error: 'El email o la contraseña no son correctas',
  },
  registerPassword: {
    title: 'Crear mi contraseña',
    password: 'Contraseña',
    repeatPassword: 'Repetir contraseña',
    setPassword: 'Establecer contraseña',
    repeatPasswordPlaceholder: 'Contraseña',
    passwordPlaceholder: 'Repitir contraseña',
    passwordMatch: 'Las contraseñas no coinciden',
    tokenError:
      'El código para configurar la contraseña ha caducado o no es valido, contactar con el centro.',
  },
  selectProfile: {
    title: 'Hola, {name}',
    number_of_profiles:
      'Tienes {profiles} perfiles en Leemons, por favor selecciona con el que quieres acceder',
    several_centers:
      'Tienes varios centros y perfiles en Leemons, por favor selecciona con los que quieres para acceder.',
    use_always_profile: 'Usar siempre esta configuración para acceder rápidamente',
    change_easy:
      'Puede cambiar fácilmente de perfil haciendo clic en el avatar en la barra lateral de la aplicación',
    log_in: 'Entrar',
    choose_center: 'Seleccionar un centro',
  },
  list_users: {
    pageTitle: 'Listado de usuarios',
    centerLabel: 'Centro',
    profileLabel: 'Perfil',
    searchLabel: 'Buscar',
    nameHeader: 'Nombre',
    surnameHeader: 'Apellidos',
    emailHeader: 'Email',
    birthdayHeader: 'Fecha de nacimiento',
    phoneHeader: 'Teléfono',
    actionsHeader: 'Acciones',
    usersTab: 'Usuarios',
    clearFilter: 'Limpiar filtro',
    view: 'Ver',
    show: 'Mostrar',
    goTo: 'Ir a',
  },
  create_users: {
    male: 'Hombre',
    female: 'Mujer',
    pageTitle: 'Crear usuarios',
    centerLabel: 'Centro',
    profileLabel: 'Perfil',
    emailHeader: 'Email',
    passwordHeader: 'Contraseña',
    emailHeaderRequired: 'El correo electrónico es necesario',
    emailHeaderNotEmail: 'El correo electrónico no es válido',
    nameHeader: 'Nombre',
    nameHeaderRequired: 'El nombre es necesario',
    surnameHeader: 'Apellido',
    surnameHeaderRequired: 'El apellido es necesario',
    genderHeader: 'Genero',
    genderHeaderRequired: 'Genero es necesario',
    birthdayHeader: 'Fecha de nacimiento',
    birthdayHeaderRequired: 'La fecha de nacimiento es necesaria',
    avatarHeader: 'Avatar',
    avatarHeaderRequired: 'El avatar es necesario',
    secondSurnameHeader: 'Segundo apellido',
    secondSurnameHeaderRequired: 'El segundo apellido es necesario',
    tagsHeader: 'Etiquetas',
    tableAdd: 'Añadir',
    tableRemove: 'Eliminar',
    userAlreadyHaveThisConfig: 'Este usuario ya existe en ese centro con este perfil',
    userEmailAlreadyAdded: 'Ya existe un usuario con este email',
    tagsForAllUsers: 'Etiquetas para todos los usuarios',
    save: 'Guardar',
    usersAddedSuccessfully: 'Usuarios añadidos con éxito',
  },
  needDatasetDataModal: {
    goPageButton: 'Ir a la página',
  },
  userDataDatasetPage: {
    pageTitle: 'Datos de usuario',
    pageDescription: 'Añadir datos necesarios',
    save: 'Guardar',
    saveSuccess: 'Datos guardados con éxito',
  },
  detailUser: {
    selectCenter: 'Seleccionar un centro',
    selectProfile: 'Seleccionar un perfil',
    noResults: 'No hay resultados con los criterios indicados',
    preferredGenderLabel: 'Pronombre de género preferido',
    personalInformationLabel: 'Información personal',
    recoveryLink: 'Enviar enlace de recuperación',
    otherInformationLabel: 'Otra información',
    tags: 'Tags',
    addTag: 'Añadir tag',
    edit: 'Editar',
    save: 'Guardar',
    cancel: 'Cancelar',
    saveSuccess: 'Datos guardados con éxito',
  },
};
