module.exports = {
  welcome_page: {
    page_title: 'Portafolio académico',
    page_description:
      'Portafolio permite trasladar fielmente la estructura organizativa de los programas del centro a Leemons. Esta herramienta permite crear programas educativos, etapas, cursos, grupos y asignaturas. Un vez configurados, a través del árbol de portafolio, se podrán asignar estudiantes y profesores, definir segmentos y aplicar reglas de funcionamiento.',
    hide_info_label: '¡Entendido!. No mostrar más una vez finalizada la configuración.',
    step_profiles: {
      title: 'Conectar perfiles',
      description:
        'Es necesario conectar los perfiles de la aplicación Portafolio con los existentes en el sistema (solo será necesario indicar esta información una vez).',
      btn: 'Conectar perfiles',
    },
    step_programs: {
      title: 'Crear programas',
      description:
        'Primaria, secundaria, bachillerato, grado, master... aquí se crean los programas que ofrece el centro de estudios.',
      btn: 'Crear programas',
    },
    step_subjects: {
      title: 'Añadir asignaturas',
      description:
        'Carga manual o en bloque del portafolio de asignaturas para cada programa y curso.',
      btn: 'Añadir asignaturas',
    },
    step_tree: {
      title: 'Gestionar portafolio académico',
      description:
        'Permite definir el tipo de árbol más conveniente para gestionar el centro educativo (assignar estudiantes, editar infromación o crear grupos segmentados).',
      btn: 'Crear árbol',
    },
  },
  programs_page: {
    page_title: 'Programas formativos',
    page_description:
      'Primaria, secundaria, bachillerato, grado, master... aquí se crean los programas que ofrece el centro de estudios. Para centros que no cuentan con etapas tradicionales (p.e. primaria, secundaria...), solo será necesario crear programas o cursos.',
    errorNoEvaluationSystems:
      'No hay sistemas de evaluación definidos. Es necesario tener al menos un sistema de evaluación para continuar.',
    errorNoEvaluationSystemsGoTo: 'Ir a sistemas de evaluación',
    common: {
      select_center: 'Seleccionar centro',
      add_program: 'Crear nuevo programa',
      create_done: 'Programa creado con éxito',
      update_done: 'Programa actualizado con éxito',
    },
    setup: {
      title: 'Configurar nuevo programa',
      editTitle: 'Editar programa',
      basicData: {
        step_label: 'Información básica',
        labels: {
          title: 'Información básica',
          name: 'Nombre del programa',
          color: 'Color:',
          image: 'Imagen:',
          abbreviation: 'Abreviatura',
          evaluationSystem: 'Sistema de evaluación',
          creditSystem: 'Utilizar sistema de créditos',
          creditsTitle: 'Créditos y horas totales',
          credits: 'Créditos',
          totalHours: 'Horas totales',
          oneStudentGroup: 'Este programa solo tiene un grupo de estudiantes',
          groupsIDAbbrev: 'Código de abreviatura de grupos',
          maxGroupAbbreviation: 'Longitud máxima de abreviatura',
          maxGroupAbbreviationIsOnlyNumbers: 'Numérico',
          privacy: 'Privacidad',
          hideStudentsToStudents: 'Ocultar el listado de usuarios al perfil de estudiante',
          buttonNext: 'Siguiente',
        },
        descriptions: {
          maxGroupAbbreviation:
            'Configuración de ID para crear más de un grupo de estudiantes (clases) por asignatura.',
        },
        placeholders: {
          name: 'Mi programa formativo',
          abbreviation: 'PROGxxxx',
        },
        helps: {
          abbreviation: '(máx 8 caracteres)',
          maxGroupAbbreviation: '(p.e. G01, G02, G03…)',
        },
        errorMessages: {
          name: {
            required: 'Campo necesario',
          },
          abbreviation: {
            required: 'Campo necesario',
          },
          evaluationSystem: {
            required: 'Campo necesario',
          },
          maxGroupAbbreviation: {
            required: 'Campo necesario',
          },
        },
      },
      coursesData: {
        step_label: 'Cursos',
        labels: {
          title: 'Cursos',
          oneCourseOnly: 'Este programa tiene un solo curso',
          hideCoursesInTree: 'Ocultar cursos en el árbol (no anidar la asignaturas por curso)',
          moreThanOneAcademicYear:
            'Existen asignaturas que se ofertan en varios cursos simultáneamente',
          maxNumberOfCourses: 'Número de cursos',
          courseCredits: 'Créditos por curso',
          courseSubstage: 'Subetapas',
          haveSubstagesPerCourse: 'No hay subetapas',
          substagesFrequency: 'Frecuencia',
          numberOfSubstages: 'Número de subetapas',
          subtagesNames: 'Nombre de las subetapas',
          useDefaultSubstagesName: 'Usar nombre y abreviatura por defecto',
          abbreviation: 'Abreviatura',
          maxSubstageAbbreviation: 'Longitud máxima de abreviatura',
          maxSubstageAbbreviationIsOnlyNumbers: 'Numérico',
          buttonNext: 'Siguiente',
          buttonPrev: 'Anterior',
          cycles: 'Ciclos',
          haveCycles: 'Hay ciclos o agrupaciones de cursos',
          cycleName: 'Nombre del ciclo',
          cycleNameRequired: 'Se requiere el nombre del ciclo',
          cycleCourses: 'Cursos incluidos',
          cycleCoursesRequired: 'Campo requerido',
          add: 'Añadir ciclo',
          remove: 'Eliminar',
          edit: 'Editar',
          aceptar: 'Aceptar',
          cancelar: 'Cancelar',
        },
        placeholders: {
          substagesFrequency: 'Seleccionar frecuencia',
        },
        errorMessages: {
          abbrevationOnlyNumbers: 'Sólo se admiten números',
          maximunSubstageAbbreviation: 'Maximo {n} caracteres',
          useDefaultSubstagesName: {
            required: 'Campo necesario',
          },
          maxNumberOfCourses: {
            required: 'Campo necesario',
          },
          courseCredits: {
            required: 'Campo necesario',
          },
          substagesFrequency: {
            required: 'Campo necesario',
          },
          numberOfSubstages: {
            required: 'Campo necesario',
          },
          maxSubstageAbbreviation: {
            required: 'Campo necesario',
          },
        },
      },
      subjectsData: {
        step_label: 'Asignaturas',
        labels: {
          title: 'Asignaturas',
          standardDuration: 'Duración estándar de las asignaturas',
          allSubjectsSameDuration:
            'Todas las asignaturas tienen la misma duración que la subetapa evaluable (p.e. un trimestre)',
          numberOfSemesters: 'Número de semestres',
          periodName: 'Nombre del periodo',
          numOfPeriods: 'Número de periodos',
          substagesFrequency: 'Frecuencia',
          knowledgeAreas: 'Abreviatura de Áreas de conocimiento',
          haveKnowledge: 'El programa tiene áreas de conocimiento',
          maxKnowledgeAbbreviation: 'Longitud de la abreviatura de área:',
          maxKnowledgeAbbreviationIsOnlyNumbers: 'Numérico',
          subjectsIDConfig: 'Código de abreviatura de asignatura ',
          subjectsFirstDigit: 'Primer dígito',
          subjectsDigits: 'Dígito',
          buttonNext: 'Guardar programa',
          buttonPrev: 'Anterior',
          buttonAdd: 'Crear',
          buttonRemove: 'Eliminar',
        },
        helps: {
          maxKnowledgeAbbreviation: '(p.e.: LENG, ENG, HIST…)',
        },
        errorMessages: {
          periodName: {
            required: 'Campo necesario',
          },
          numOfPeriods: {
            required: 'Campo necesario',
          },
          substagesFrequency: {
            required: 'Campo necesario',
          },
        },
      },
      frequencies: {
        year: 'Anual',
        semester: 'Semestral',
        quarter: 'Cuatrimestral',
        trimester: 'Trimestral',
        month: 'Mensual',
        week: 'Semanal',
        day: 'Diario',
      },
      firstDigits: {
        course: 'Curso',
        none: 'Ninguno',
      },
    },
  },
  subject_page: {
    page_title: 'Configuración de asignaturas',
    page_description:
      'Define primero los tipos de asignaturas (troncal, optativa...) y las áreas de conocimiento (si aplican a tu programa).',
    centerLabel: 'Centro formativo',
    centerPlaceholder: 'Seleccionar centro',
    programLabel: 'Programa',
    programPlaceholder: 'Seleccionar programa',
    addKnowledgeDone: 'Área de conocimiento creada con éxito',
    addSubjectTypeDone: 'Tipo de asignatura creada con éxito',
    subjectCreated: 'Asignatura creada con éxito',
    groupCreated: 'Grupo creado con éxito',
    classCreated: 'Clase creada con éxito',
    classUpdated: 'Clase actualizada',
    goTree: 'Ver árbol',
    knowledge: {
      title: 'Áreas de conocimiento',
      name: 'Nombre',
      nameRequired: 'Campo necesario',
      abbreviation: 'Abrev.',
      abbreviationRequired: 'Campo necesario',
      color: 'Color',
      colorRequired: 'Campo necesario',
      icon: 'Icono',
      creditsCourse: 'Cr. curso',
      creditsProgram: 'Cr. programa',
      maxLength: 'Longitud máxima: {max}',
      onlyNumbers: 'Numérico',
    },
    subjectTypes: {
      title: 'Tipos de asignatura',
      name: 'Nombre',
      nameRequired: 'Campo necesario',
      creditsCourse: 'Créditos por curso',
      creditsProgram: 'Créditos por programa',
      groupVisibility: 'Visibilidad del grupo',
      groupVisibilityLabel: 'No mostrar grupos',
    },
    subjects: {
      addSubject: 'Añadir asignatura',
      newTitle: 'Nueva asignatura',
      title: 'Asignaturas',
      course: 'Curso/s',
      id: 'Código',
      idRequired: 'Campo necesario',
      courseRequired: 'Campo necesario',
      subject: 'Asignatura',
      noSubjectsFound: 'No se han encontrado asignaturas',
      subjectRequired: 'Campo necesario',
      knowledge: 'Knowledge',
      knowledgeRequired: 'Campo necesario',
      subjectType: 'Tipo',
      subjectTypeRequired: 'Campo necesario',
      credits: 'Creditos',
      color: 'Color',
      colorRequired: 'Campo necesario',
      group: 'Grupo',
      groupRequired: 'Campo necesario',
      substage: 'Sub-etapa',
      seats: 'Plazas disponibles',
      classroom: 'Clase',
      schedule: 'Horario de clase',
      teacher: 'Profesor',
      description: 'Descripción',
      maxInternalIdLength: 'Máximo {max} dígitos',
      groupAny: 'Debe tener {max} caracteres',
      groupNumbers: 'Debe tener {max} dígitos',
    },
    tableActions: {
      add: 'Añadir',
      remove: 'Eliminar',
      edit: 'Editar',
      accept: 'Aceptar',
      cancel: 'Cancelar',
    },
    programTreeType: {
      title: 'Configurar vista del árbol de {name}',
      description1:
        'Permite definir la vista del árbol para adaptarlo a las características del programa formativo. Esta configuración se puede editar siemrpe que sea necesario.',
      note: 'NOTA:',
      description2:
        'A continuación se muestran los esquemas que encajan con la configuración previa. La “visibilidad de grupo” (de la configuración del tipo de aisgnatura), se mantendrá independientemente del tipo de esquema elegido.',
      opt1Label: 'Clase primero',
      opt1DescriptionCycle:
        'Programa > Ciclo > Curso > Grupo > Tipo > Área de conocimiento > Asignatura',
      opt1DescriptionNoCourseCycle:
        'Program > Ciclo > Grupo > Tipo > Área de conocimiento > Asignatura',
      opt2DescriptionCycle:
        'Programa > Ciclo > Curso > Grupo > Área de conocimiento > Tipo > Asignatura',
      opt2DescriptionNoCourseCycle:
        'Program > Ciclo > Grupo > Área de conocimiento > Tipo > Asignatura',
      opt3DescriptionCycle: 'Programa > Ciclo > Curso > Tipo > Área de conocimiento > Asignatura',
      opt3DescriptionNoCourseCycle: 'Programa > Ciclo > Tipo > Área de conocimiento > Asignatura',

      opt1Description: 'Programa > Curso > Grupo > Tipo > Área de conocimiento > Asignatura',
      opt1DescriptionNoCourse: 'Program > Grupo > Tipo > Área de conocimiento > Asignatura',
      opt2Label: 'Clase + Área primero',
      opt2Description: 'Programa > Curso > Grupo > Área de conocimiento > Tipo > Asignatura',
      opt2DescriptionNoCourse: 'Program > Grupo > Área de conocimiento > Tipo > Asignatura',
      opt3Label: 'Asignatura primero',
      opt3Description: 'Programa > Curso > Tipo > Área de conocimiento > Asignatura',
      opt3DescriptionNoCourse: 'Programa > Tipo > Área de conocimiento > Asignatura',
      opt4Label: 'Esquema libre',
      opt4Description: 'Programa > Tipo > Área de conocimiento > Asignatura',
    },
  },
  profiles_page: {
    page_title: 'Portafolio académico - Conectar perfiles',
    page_description:
      'Es necesario conectar los perfiles de la aplicación Portafolio con los existentes en el sistema (solo será necesario indicar esta información una vez). Es importante revisar cuidadosamente los permisos de cada perfil, ya que una vez conectados, esta acción no podrá deshacerse.',
    save: 'Guardar',
    profileSaved: 'Perfiles guardados con éxito',
    profiles: 'Perfiles',
    teacher: 'profesor',
    teacherDescription: 'Reponsable de impartir una asignatura en un programa o curso.',
    teacherRequired: 'Campo necesario',
    student: 'Estudiante',
    studentDescription:
      'Una vez asignado a una clase, estudia las asignaturas de un programa o curso con un profesor determinado.',
    studentRequired: 'Campo necesario',
  },
  tree_page: {
    configTreeView: 'Configurar vista del árbol',
    page_title: 'Arbol de portafolio',
    page_description:
      'En el arbol de Portafolio es posible This is your Portfolio Tree, you can edit, duplicate or create new elements for your program. You also can assign students at any level (all subjects under it will inherit this task).',
    centerLabel: 'Seleccionar centro',
    programLabel: 'Seleccionar programa',
    programUpdated: 'Programa actualizado con éxito',
    courseUpdated: 'Curso actualizado con éxito',
    groupUpdated: 'Grupo actualizado con éxito',
    groupDuplicated: 'Grupo duplicado con éxito',
    subjectRemoved: 'Asignatura eliminada con éxito',
    knowledgeUpdated: 'Área actualizada con éxito',
    subjectTypeUpdated: 'Tipo de asignatura actualizado con éxito',
    subjectUpdated: 'Asignatura actualizada con éxito',
    classUpdated: 'Clase actualizada con éxito',
    cycleUpdated: 'Ciclo actualizado con éxito',
    lassCreated: 'Clase creada con éxito',
    treeEdit: 'Editar',
    treeRemove: 'Eliminar',
    treeDuplicate: 'Duplicar',
    groupsRemoved: 'Grupo eliminado de clases',
    classRemoved: 'Clase eliminada',
    groupCreated: 'Grupo creado con éxito',
    subjectTypeCreated: 'Tipo de asignatura creado con éxito',
    knowledgeCreated: 'Área de conocimiento creada con éxito',
    newgroups: 'Nuevo grupo',
    newsubjectType: 'Nuevo tipo de asignatura',
    newclass: 'Nueva clase',
    newknowledges: 'Nueva área',
    newsubject: 'Nueva asignatura',
    cycleTreeType: {
      title: 'Configuración ciclo',
      name: 'Nombre:',
      save: 'Guardar',
    },
    addUsers: {
      title: 'Asignar estudiantes',
      description: 'Asignar estudiantes a todas las clases de este nivel.',
      note: 'NOTE:',
      noteDescription:
        'Los estudiantes seleccionados serán asignados a cada clase. Para consultar o editar los estudiantes de una clase concreta, acceder al detalle de la misma.',
      byTag: 'Buscar por etiqueta',
      byData: 'Buscar por datos del usuario',
      addTag: 'Añadir etiqueta',
      emailHeader: 'Email',
      nameHeader: 'Nombre',
      surnameHeader: 'Apellido/s',
      birthdayHeader: 'Fecha de nacimiento',
      studentsFound: 'Se han encontrado {{count}} estudiantes',
      selected: '{{count}} seleccionados',
      studentsError:
        '{{count}} estudiantes ya están en todas las clases y no se pueden añadir de nuevo',
      studentsWarning:
        '{{count}} estudiantes ya están en alguna clase pero pueden ser añadidos al resto de clases.',
      seatsError1: 'Las siguientes clases ya están completas:',
      seatsError2: 'Acceder a cada clase de forma individual para añadir o eliminar estudiantes.',
      seatsClassError: '- {{className}} ({{seats}} plazas disponibles)',
      addStudent: 'Añadir estudiante',
      userAlreadySelected: 'Estudiante ya seleccionado',
      removeUser: 'Eliminar',
      managersLabel: 'Responsables de referencia',
    },
    program: {
      title: 'Configuración del programa',
      nameLabel: 'Nombre:',
      abbreviationLabel: 'Abreviatura:',
      abbreviationHelper: '8 caract. máx',
      creditsLabel: 'Creditos totales:',
      nameRequired: 'Campo necesario',
      abbreviationRequired: 'Campo necesario',
      creditsRequired: 'Campo necesario',
      visitProgramDescription: 'Para configuración avanzada ver:',
      visitProgramLabel: '“Programas educativos”',
      save: 'Guardar',
    },
    course: {
      title: 'Configuración del curso',
      numberLabel: 'Número:',
      nameLabel: 'Alias:',
      nameHelper: 'p.e. “Primer curso”',
      creditsLabel: 'Créditos mínimos:',
      visitProgramDescription: 'Para configuración avanzada ver:',
      visitProgramLabel: '“Programas educativos”',
      save: 'Guardar',
    },
    group: {
      titleNew: 'Nuevo grupo',
      duplicateTitle: 'Duplicar grupo',
      duplicateWarning:
        'Al duplicar, el nuevo grupo heredará la configuración básica de las asignaturas anidadas en el grupo de origen (como el tipo o el área de conocimiento), excepto las plazas disponibles así como los alumnos y profesores asignados - que será necesario definir -.',
      title: 'Configuración de grupo',
      abbreviationLabel: 'Abreviatura:',
      abbreviationHelper: '3 caract. máx',
      aliasLabel: 'Alias:',
      aliasHelper: 'p.e. “Grupo principal”',
      aliasRequired: 'Campo necesario',
      groupAny: 'Debe tener {max} caracteres',
      groupNumbers: 'Debe tener {max} dígitos',
      save: 'Guardar',
      assignSubjects: {
        title: 'Asignar asignaturas',
        description1:
          'Se crearán  nuevas clases para las asignaturas seleccionadas, posterioremeste se podrán modificar sus propiedades y asignar estudiantes.',
        notes: 'NOTA:',
        description2:
          'Usar "Duplicar" Para crear un nuevo grupo copiando las propiedades de uno existente (excepto estudiantes y profesores asignados).',
      },
    },
    subjectType: {
      titleNew: 'Nuevo tipo de asignatura',
      title: 'Configuración',
      nameLabel: 'Nombre:',
      nameRequired: 'Campo necesario',
      crCourse: 'Créditos por curso:',
      crProgram: 'Créditos por programa:',
      nested: 'No anidar grupos',
      save: 'Guardar',
      assignSubjects: {
        title: 'Asignar asignaturas',
        description:
          'Se asignará el área de conocimiento a las asignaturas seleccionadas. Esta acción se puede realizar manualmente en el árbol, arrastrando la asignatura dentro de un tipo.',
      },
    },
    knowledge: {
      titleNew: 'Nueva área de conocimiento',
      title: 'Configuración',
      nameLabel: 'Nombre:',
      nameRequired: 'Campo necesario',
      abbreviationLabel: 'Abreviatura:',
      abbreviationHelper: '{max} caracteres',
      abbreviationRequired: 'Campo necesario',
      colorLabel: 'Color:',
      colorRequired: 'Campo necesario',
      crCourse: 'Créditos por curso:',
      crProgram: 'Créditos por programa:',
      maxLength: 'Longitud máxima: {max}',
      save: 'Guardar',
      assignSubjects: {
        title: 'Asignar asignaturas',
        description:
          'Se asignará el área de conocimiento a las asignaturas seleccionadas. Esta acción se puede realizar manualmente en el árbol, arrastrando la asignatura dentro de un área de conocimiento.',
      },
    },
    class: {
      title: 'Configuración de asignatura',
      subjectNameLabel: 'Nombre:',
      subjectNameRequired: 'Campo necesario',
      subjectTypeRequired: 'Campo necesario',
      knowledgeRequired: 'Campo necesario',
      subjectType: 'Tipo',
      knowledge: 'Área de conocimiento',
      classrooms: 'Clases',
      newClassroom: 'Crear nueva clase',
      save: 'Guardar',
      courseLabel: 'Curso:',
      groupLabel: 'Grupo:',
      substageLabel: 'Sub-etapa:',
      imageSubjectLabel: 'Imagen:',
      imageLabel: 'Imagen (Sustituye a la imagen de asignatura):',
      iconLabel: 'Icono:',
      seatsLabel: 'Plazas disponibles:',
      knowledgeLabel: 'Área de conocimiento:',
      colorLabel: 'Color:',
      scheduleLabel: 'Horario de clase:',
      addressLabel: 'Dirección o ubicación física del aula:',
      virtualUrlLabel: 'Aula virtual (enlace de video-llamada):',
      notValidUrl: 'URL no válida',
      teacherLabel: 'Profesor principal:',
      associateTeachersLabel: 'Profesores colaboradores:',
      teacherDescription: 'Asignar profesor tutor a esta clase',
      studentsLabel: 'Estudiantes:',
      addStudents: 'Añadir estudiantes',
      addStudentsDescription: 'Añadir estudiantes a esta clase',
      cancelAddStudents: 'Cancelar',
      studentsAddedSuccessfully: 'Estudiantes asignados con éxito',
      noStudentsYet: 'Sin estudiantes',
      findStudents: 'Buscar',
      changeTeacherButtonLabel: 'Cambiar',
      newClass: 'Nueva clase',
      basicInformation: 'Información básica',
      groupsOfClasse: 'Grupos de clase',
      studentsEnrolled: 'Matriculados actualmente',
      saveChanges: 'Guardar cambios',
      removeSubject: 'Eliminar asignatura',
      removeClassroom: 'Eliminar clase',
      attention: 'Atención',
      groupAny: 'Debe tener {max} caracteres',
      groupNumbers: 'Debe tener {max} dígitos',
      enrollStudents: 'Matricular estudiantes',
      currentlyEnrolled: 'Matriculados actualmente',
      subjectChangeCourse:
        'Su modelo de árbol indica que sus cursos son estructurantes, es decir, que las asignaturas se anidan dentro de los niveles de curso. Al hacer un cambio de curso, la asignatura desaparecerá del nivel del curso actual y se trasladará al nuevo curso seleccionado.',
      subjectChangeCourseButton: 'Cambiar de todas formas',
      removeSubjectButton: 'Eliminar de todas formas',
      cancelClassroomButton: 'Cancelar',
      show: 'Mostrar',
      goTo: 'Ir a',
      removeSubjectDescription:
        '<strong>No se recomienda esta acción si ya existen contenidos o asignaciones asociadas a esta asignatura.</strong> <br/><br/> Al eliminar una asignatura se archivarán todos los grupos de clase asociados a ella y todas las actividades creadas o asignadas que usan esta asignatura, así como las evaluaciones relacionadas con ella. <br/><br/> También pueden producirse errores en la edición de actividades relacionadas.',
      removeClassDescription:
        '<strong>No se recomienda esta acción si ya existen contenidos o asignaciones asociadas a esta clase.</strong> <br/><br/> Al eliminar una clase se archivarán todas las actividades creadas o asignadas que usan esta clase, así como las evaluaciones relacionadas con ella. <br/><br/> También pueden producirse errores en la edición de actividades relacionadas.',
    },
  },
  selectSubjectsByTable: {
    subjectTypeLabel: 'Tipo:',
    knowledgeLabel: 'Área de conocimiento:',
    subjectLabel: 'Buscar asignatura:',
    tableId: 'Código',
    tableName: 'Nombre',
    tableKnowledge: 'Área de conocimiento',
    tableType: 'Tipo',
  },
  userClassesSwiperWidget: {
    multiCourse: 'Multicurso',
  },
  tabDetail: {
    label: 'Clase',
  },
  classDetailWidget: {
    emailHeader: 'Email',
    nameHeader: 'Nombre',
    surnameHeader: 'Apellido/s',
    birthdayHeader: 'Fecha de nacimiento',
    teachers: 'Profesores',
    students: 'Estudiantes',
  },
  classStudents: {
    label: 'Estudiantes',
  },
  subjectsDrawer: {
    add: 'Añadir asignatura',
    edit: 'Editar asignatura',
    save: 'Guardar asignatura',
  },
};
