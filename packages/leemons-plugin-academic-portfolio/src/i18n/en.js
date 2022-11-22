module.exports = {
  welcome_page: {
    page_title: 'Academic Portfolio',
    page_description:
      'Portfolio allows the creation of programs or educational stages, and the addition of subjects with courses, groups, professors, and more. With this information, a visual tree is created in order to manage the portfolio, assign students, create clusters, edit rules and much more.',
    hide_info_label:
      "Ok, I've got it. When the configuration is complete, don't show this info anymore",
    step_profiles: {
      title: 'Match profiles',
      description:
        'Academic portfolio needs clarification regarding which key profiles are to be worked on. This will only need to be done once.',
      btn: 'Match profiles',
    },
    step_programs: {
      title: 'Create programs',
      description:
        'Elementary, High School, GCSE, A Levels, Bachelors, Masters, and more. Define the programs and courses offered in your organization.',
      btn: 'Create programs',
    },
    step_subjects: {
      title: 'Add subjects',
      description:
        'With bulk or manual upload, a subject portfolio can be created that relates to a specific program and course.',
      btn: 'Add subjects',
    },
    step_tree: {
      title: 'Manage academic portfolio',
      description:
        'Define the kind of tree for your specific education system and assigning students, create clusters or edit information.',
      btn: 'Create your tree',
    },
  },
  programs_page: {
    page_title: 'Learning programs',
    page_description:
      'Elementary, High School, Bachelor, Masters, and more. Define the programs and courses offered in your organization. If your organization does not have traditional stages, simple programs or courses can be created instead.',
    errorNoEvaluationSystems:
      'There are no evaluation systems defined. Please, create one or more evaluation systems.',
    errorNoEvaluationSystemsGoTo: 'Go to evaluation systems',
    common: {
      select_center: 'Select center',
      add_program: 'Add new program',
      create_done: 'Program created',
      update_done: 'Program updated',
    },
    setup: {
      title: 'Setup new program',
      editTitle: 'Edit program',
      basicData: {
        step_label: 'Basic Data',
        labels: {
          title: 'Basic Data',
          name: 'Program name',
          color: 'Color:',
          image: 'Image:',
          abbreviation: 'Program abbreviation',
          evaluationSystem: 'Evaluation system',
          creditSystem: 'No need for credit system',
          credits: 'Total credits',
          oneStudentGroup: 'This program has only one group of students',
          groupsIDAbbrev: 'Groups ID Abbreviation',
          maxGroupAbbreviation: 'Max abbreviation length for groups',
          maxGroupAbbreviationIsOnlyNumbers: 'Only numbers',
          privacy: 'Privacy',
          hideStudentsToStudents: 'Hide the list of users to student profile',
          buttonNext: 'Next',
        },
        descriptions: {
          maxGroupAbbreviation:
            'If the creation of more than one group of students (classrooms) is needed per subject, this configuration allows the possibility to define the alphanumeric ID format.',
        },
        placeholders: {
          name: 'My awesome program',
          abbreviation: 'HIGSxxxx',
        },
        helps: {
          abbreviation: '(8 char. max)',
          maxGroupAbbreviation: '(i.e: G01, G02, G03…)',
        },
        errorMessages: {
          name: {
            required: 'Required field',
          },
          abbreviation: {
            required: 'Required field',
          },
          evaluationSystem: {
            required: 'Required field',
          },
          maxGroupAbbreviation: {
            required: 'Required field',
          },
        },
      },
      coursesData: {
        step_label: 'Courses',
        labels: {
          title: 'Courses',
          oneCourseOnly: 'This program takes one course only',
          hideCoursesInTree: 'Hidden courses in the tree (subjects not nested behind courses)',
          moreThanOneAcademicYear:
            'There are subjects that are offered in several courses simultaneously',
          maxNumberOfCourses: 'Number of courses',
          courseCredits: 'Credits per course',
          courseSubstage: 'Course substages',
          haveSubstagesPerCourse: 'No substages per course',
          substagesFrequency: 'Frequency',
          numberOfSubstages: 'Number of substages',
          subtagesNames: 'Name the substages',
          useDefaultSubstagesName: 'Use the default name and abbreviation',
          abbreviation: 'Abbreviation',
          maxSubstageAbbreviation: 'Max abbrevation length',
          maxSubstageAbbreviationIsOnlyNumbers: 'Only numbers',
          buttonNext: 'Next',
          buttonPrev: 'Previous',
          cycles: 'Cycles',
          haveCycles: 'There are cycles or groupings of courses',
          cycleName: 'Cycle name',
          cycleNameRequired: 'Cycle name required',
          cycleCourses: 'Courses included',
          cycleCoursesRequired: 'Field required',
          add: 'Add cycle',
          remove: 'Remove',
          edit: 'Edit',
          accept: 'Accept',
          cancel: 'Cancel',
        },
        placeholders: {
          substagesFrequency: 'Select frequency',
        },
        errorMessages: {
          useDefaultSubstagesName: {
            required: 'Required field',
          },
          maxNumberOfCourses: {
            required: 'Required field',
          },
          courseCredits: {
            required: 'Required field',
          },
          substagesFrequency: {
            required: 'Required field',
          },
          numberOfSubstages: {
            required: 'Required field',
          },
          maxSubstageAbbreviation: {
            required: 'Required field',
          },
        },
      },
      subjectsData: {
        step_label: 'Subjects',
        labels: {
          title: 'Subjects',
          standardDuration: 'Standard duration of the subjects',
          allSubjectsSameDuration:
            'All subjects have the same duraction as the evaluation substage',
          numberOfSemesters: 'Number of semesters',
          periodName: 'Period name',
          numOfPeriods: 'Number of periods',
          substagesFrequency: 'Frecuency',
          knowledgeAreas: 'Knowledge areas abbreviation',
          haveKnowledge: 'Program has Knowledge areas',
          maxKnowledgeAbbreviation: 'Max abbreviation length for areas:',
          maxKnowledgeAbbreviationIsOnlyNumbers: 'Only numbers',
          subjectsIDConfig: 'Subjects ID configuration',
          subjectsFirstDigit: 'First digit',
          subjectsDigits: 'Digits',
          buttonNext: 'Save Program',
          buttonPrev: 'Previous',
          buttonAdd: 'Add',
          buttonRemove: 'Remove',
        },
        helps: {
          maxKnowledgeAbbreviation: '(i.e: MKTG, MATH, HIST…)',
        },
        errorMessages: {
          periodName: {
            required: 'Required field',
          },
          numOfPeriods: {
            required: 'Required field',
          },
          substagesFrequency: {
            required: 'Required field',
          },
        },
      },
      frequencies: {
        year: 'Annual',
        semester: 'Half-yearly(Semester)',
        quarter: 'Four-month period',
        trimester: 'Quarterly(Trimester/Quarter)',
        month: 'Monthly',
        week: 'Weekly',
        day: 'Daily',
      },
      firstDigits: {
        course: 'Course Nº',
        none: 'None',
      },
    },
  },
  subject_page: {
    page_title: 'Subjects configuration',
    page_description:
      'Configure knowledge areas/topics and type (core, electives…), then it is possible to upload the subject database or add them manually. After this, it will be possible to create your tree portfolio schema.',
    centerLabel: 'Center',
    centerPlaceholder: 'Select a center',
    programLabel: 'Program',
    programPlaceholder: 'Select a program',
    addKnowledgeDone: 'Knowledge saved',
    addSubjectTypeDone: 'Subject type saved',
    subjectCreated: 'Subject created',
    groupCreated: 'Group created',
    classCreated: 'Class created',
    classUpdated: 'Class updated',
    goTree: 'Go to tree',
    knowledge: {
      title: 'Knowledge areas',
      name: 'Name',
      nameRequired: 'Required field',
      abbreviation: 'Abbr.',
      abbreviationRequired: 'Required field',
      color: 'Color',
      colorRequired: 'Required field',
      icon: 'Icon',
      creditsCourse: 'Cr. Course',
      creditsProgram: 'Cr. Program',
      maxLength: 'Max length: {max}',
      onlyNumbers: 'Only numbers',
    },
    subjectTypes: {
      title: 'Types of subjects',
      name: 'Name',
      nameRequired: 'Required field',
      creditsCourse: 'Cr. Course',
      creditsProgram: 'Cr. Program',
      groupVisibility: 'Group visibility',
      groupVisibilityLabel: 'Avoid nested groups',
    },
    subjects: {
      newTitle: 'New subject',
      title: 'Subjects',
      course: 'Course/s',
      id: 'ID',
      idRequired: 'Required field',
      courseRequired: 'Required field',
      subject: 'Subject',
      noSubjectsFound: 'No subjects found',
      subjectRequired: 'Required field',
      knowledge: 'Knowledge',
      knowledgeRequired: 'Required field',
      subjectType: 'Type',
      subjectTypeRequired: 'Required field',
      credits: 'Credits',
      color: 'Color',
      colorRequired: 'Required field',
      group: 'Group',
      groupRequired: 'Required field',
      substage: 'Sub-stage',
      seats: 'Seats',
      classroom: 'Classroom',
      schedule: 'Schedule',
      teacher: 'Teacher',
      description: 'Description',
      maxInternalIdLength: 'Must be {max} numbers',
      groupAny: 'Must be {max} characters',
      groupNumbers: 'Must be {max} numbers',
    },
    tableActions: {
      add: 'Add',
      remove: 'Remove',
      edit: 'Edit',
      accept: 'Accept',
      cancel: 'Cancel',
    },
    programTreeType: {
      title: 'Portfolio tree schema',
      description1:
        'Configure portfolio tree view in order to adapt it to your specific program characteristics. This setting can be changed whenever needed.',
      note: 'NOTE:',
      description2:
        'See only the schemas that fit with previous configuration. “Group visibility” (from Subject type configuration), will be respected independent of tree schema chosen.',
      opt1Label: 'Classroom first',
      opt1DescriptionCycle: 'Program > Cycle > Course > Group > Type > Area > Subject',
      opt1DescriptionNoCourseCycle: 'Program > Cycle > Group > Type > Area > Subject',
      opt2DescriptionCycle: 'Program > Cycle > Course > Group > Area > Type > Subject',
      opt2DescriptionNoCourseCycle: 'Program > Cycle > Group > Area > Type > Subject',
      opt3DescriptionCycle: 'Program > Cycle > Course > Type > Area > Subject',
      opt3DescriptionNoCourseCycle: 'Program > Cycle > Type > Area > Subject',

      opt1Description: 'Program > Course > Group > Type > Area > Subject',
      opt1DescriptionNoCourse: 'Program > Group > Type > Area > Subject',
      opt2Label: 'Classroom + Area first',
      opt2Description: 'Program > Course > Group > Area > Type > Subject',
      opt2DescriptionNoCourse: 'Program > Group > Area > Type > Subject',
      opt3Label: 'Subject first',
      opt3Description: 'Program > Course > Type > Area > Subject',
      opt3DescriptionNoCourse: 'Program > Type > Area > Subject',
      opt4Label: 'Free schema',
      opt4Description: 'Program > Type > Area > Subject',
    },
  },
  profiles_page: {
    page_title: 'Academic portfolio - Profiles setup',
    page_description:
      'First, it is necessary to match the system profiles with the custom profiles that have been created on the platform (Please read the characteristics of each profile carefully. Once the profiles are linked, it cannot be undone.)',
    save: 'Save',
    profileSaved: 'Saved profiles',
    profiles: 'Profiles',
    teacher: 'Teacher',
    teacherDescription: 'Responsible for teaching the subjects of a program/course',
    teacherRequired: 'Field required',
    student: 'Student',
    studentDescription:
      'Assigned to a classroom, studies the subjects of his program/course with a specific teacher',
    studentRequired: 'Field required',
  },
  tree_page: {
    page_title: 'Academic Portofolio Tree',
    page_description:
      'This is the Portfolio Tree, it can be edited, duplicated or used to create new elements for your program. Students can also be assigned at any level (all subjects under it will inherit this task).',
    centerLabel: 'Select center',
    programLabel: 'Select program',
    programUpdated: 'Program updated',
    courseUpdated: 'Course updated',
    groupUpdated: 'Group updated',
    groupDuplicated: 'Group duplicated',
    subjectRemoved: 'Subject removed',
    knowledgeUpdated: 'Area updated',
    subjectTypeUpdated: 'Subject type updated',
    subjectUpdated: 'Subject updated',
    classUpdated: 'Class updated',
    cycleUpdated: 'Cycle updated',
    lassCreated: 'Class created',
    treeEdit: 'Edit',
    treeRemove: 'Remove',
    treeDuplicate: 'Duplicate',
    groupsRemoved: 'Group removed from classes',
    classRemoved: 'Class removed',
    groupCreated: 'Group created',
    subjectTypeCreated: 'Subject type created',
    knowledgeCreated: 'Area created',
    newgroups: 'New group',
    newsubjectType: 'New subject type',
    newclass: 'New class',
    newknowledges: 'New area',
    newsubject: 'New subject',
    cycleTreeType: {
      title: 'Cycle configuration',
      name: 'Name:',
      save: 'Save',
    },
    addUsers: {
      title: 'Assign Students',
      description:
        'Assign students to all classrooms nested on this level from the student database.',
      note: 'NOTE:',
      noteDescription:
        'selected students will be added to the current student lists for each classroom. If consultation or editing of a group of students is needed, it must be done directly in each classroom.',
      byTag: 'Select by tag',
      byData: 'Search by user data',
      addTag: 'Add tag',
      emailHeader: 'Email',
      nameHeader: 'Name',
      surnameHeader: 'Surname',
      birthdayHeader: 'Birthday',
      studentsFound: '{{count}} Students have been found',
      selected: '{{count}} Selected',
      studentsError:
        '{{count}} students are already included in all classes and cannot be added again',
      studentsWarning:
        '{{count}} students are already included in one of the classes and can be added to the rest of the classes.',
      seatsError1: 'The following classes are already fully booked:',
      seatsError2:
        'Please access each class individually and add as many students as needed, or reduce the number of students.',
      seatsClassError: '- {{className}} ({{seats}} seats left)',
      addStudent: 'Add student',
      userAlreadySelected: 'User already selected',
      removeUser: 'Remove',
      managersLabel: 'Responsible for reference',
    },
    program: {
      title: 'Program configuration',
      nameLabel: 'Program name:',
      abbreviationLabel: 'Program abbreviation/acronym:',
      abbreviationHelper: '8 char. max',
      creditsLabel: 'Total credits:',
      nameRequired: 'Required field',
      abbreviationRequired: 'Required field',
      creditsRequired: 'Required field',
      visitProgramDescription: 'For further configuration it is necessary to visit',
      visitProgramLabel: '“Educational Programs”',
      save: 'Save',
    },
    course: {
      title: 'Course configuration',
      numberLabel: 'Course number:',
      nameLabel: 'Course alias:',
      nameHelper: 'i.e. “1st Grade”',
      creditsLabel: 'Minimum credits:',
      visitProgramDescription: 'For further configuration it is necessary to visit',
      visitProgramLabel: '“Educational Programs”',
      save: 'Save',
    },
    group: {
      titleNew: 'New group',
      duplicateTitle: 'Duplicate group',
      duplicateWarning:
        'When duplicating a group, new classrooms are created that inherit the basic configuration of the subjects nested in the current group (such as the type, or the area of knowledge), but a new set of students, teachers, places, etc. must be specified for these new classrooms.',
      title: 'Group configuration',
      abbreviationLabel: 'Group abbreviation:',
      abbreviationHelper: '3 char. max',
      aliasLabel: 'Group alias:',
      aliasHelper: 'i.e. “Main Group”',
      aliasRequired: 'Required field',
      groupAny: 'Must be {max} characters',
      groupNumbers: 'Must be {max} numbers',
      save: 'Save',
      assignSubjects: {
        title: 'Assign subjects',
        description1:
          'New classrooms will be created for this group from the selected subjects, later, new students can be assigned and its properties modified.',
        notes: 'NOTE:',
        description2:
          ' In order to create a new group keeping all settings except the assigned students, please use the "duplicate" option instead.',
      },
    },
    subjectType: {
      titleNew: 'New subject type',
      title: 'Subject type configuratión',
      nameLabel: 'Name:',
      nameRequired: 'Required field',
      crCourse: 'Credits course:',
      crProgram: 'Credits program:',
      nested: 'Avoid nested groups',
      save: 'Save',
      assignSubjects: {
        title: 'Assign/Re-asssign subjects',
        description:
          'The new type will be modified or added to the selected subjects, keeping the remaining information. This can be done manually by dragging the existing subjects to this new type in the tree.',
      },
    },
    knowledge: {
      titleNew: 'New area',
      title: 'Area configuration',
      nameLabel: 'Name:',
      nameRequired: 'Required field',
      abbreviationLabel: 'Abbreviation:',
      abbreviationHelper: '{max} char',
      abbreviationRequired: 'Required field',
      colorLabel: 'Color:',
      colorRequired: 'Required field',
      crCourse: 'Credits course:',
      crProgram: 'Credits program:',
      maxLength: 'Max length: {max}',
      save: 'Save',
      assignSubjects: {
        title: 'Assign/Re-asssign subjects',
        description:
          'The new area will be modified or added to the selected subjects, keeping the remaining information. This can be done manually by dragging the existing subjects to this new area in the tree.',
      },
    },
    class: {
      title: 'Subject configuration',
      subjectNameLabel: 'Subject name:',
      subjectNameRequired: 'Required field',
      subjectTypeRequired: 'Required field',
      knowledgeRequired: 'Required field',
      subjectType: 'Type',
      knowledge: 'Knowledge',
      classrooms: 'Classrooms',
      newClassroom: 'Add new classroom',
      save: 'Save',
      courseLabel: 'Course:',
      groupLabel: 'Group:',
      substageLabel: 'Sub-stage:',
      imageSubjectLabel: 'Image:',
      imageLabel: 'Image (Replaces the subject image):',
      iconLabel: 'Icon:',
      seatsLabel: 'Seats:',
      knowledgeLabel: 'Area:',
      colorLabel: 'Color:',
      scheduleLabel: 'Schedule:',
      addressLabel: 'Address or physical location of the classroom:',
      virtualUrlLabel: 'Virtual classroom (video-call link):',
      notValidUrl: 'Not a valid URL',
      teacherLabel: 'Main Teacher:',
      associateTeachersLabel: 'Associate teachers:',
      teacherDescription: 'Assign a main teacher for this classroom',
      studentsLabel: 'Students:',
      addStudents: 'Add students',
      addStudentsDescription: 'Add students to this classroom',
      cancelAddStudents: 'Cancel',
      studentsAddedSuccessfully: 'Students added successfully',
      noStudentsYet: 'No students yet',
      findStudents: 'Find',
      changeTeacherButtonLabel: 'Change',
      newClass: 'New classroom',
      basicInformation: 'Basic information',
      groupsOfClasse: 'Groups of classe',
      studentsEnrolled: 'Currently enrolled',
      saveChanges: 'Save changes',
      removeSubject: 'Remove subject',
      removeClassroom: 'Remove classroom',
      attention: 'Attention',
      groupAny: 'Must be {max} characters',
      groupNumbers: 'Must be {max} numbers',
      enrollStudents: 'Currently enrolled',
      currentlyEnrolled: 'Currently enrolled',
      subjectChangeCourse:
        'Your tree model indicates that your courses are structuring, i.e. subjects are nested within course levels. When making a course change, the subject will disappear from the current course level and will be moved to the newly selected course.',
      subjectChangeCourseButton: 'Change anyway',
      removeSubjectButton: 'Eliminate anyway',
      cancelClassroomButton: 'Cancel',
      show: 'Show',
      goTo: 'Go to',
      removeSubjectDescription:
        '<strong>This action is not recommended if there is already content or assignments associated with this subject.</strong> <br/><br/> Deleting a subject will archive all class groups associated with it and all activities created or assigned that use this subject, as well as related assessments. <br/><br/> Errors may also occur when editing related activities.',
      removeClassDescription:
        '<strong>This action is not recommended if there is already content or assignments associated with this classroom.</strong> <br/><br/> Deleting a classroom will archive all activities created or assigned that use this classroom, as well as related assessments. <br/><br/> Errors may also occur when editing related activities.',
    },
  },
  selectSubjectsByTable: {
    subjectTypeLabel: 'Subject type:',
    knowledgeLabel: 'Knowledge:',
    subjectLabel: 'Find subject:',
    tableId: 'ID',
    tableName: 'Name',
    tableKnowledge: 'Knowledge',
    tableType: 'Type',
  },
  userClassesSwiperWidget: {
    multiCourse: 'Multi-course',
  },
  tabDetail: {
    label: 'Classroom',
  },
  classDetailWidget: {
    emailHeader: 'Email',
    nameHeader: 'Name',
    surnameHeader: 'Surname',
    birthdayHeader: 'Birthday',
    teachers: 'Teachers',
    students: 'Students',
  },
  classStudents: {
    label: 'Students',
  },
};
