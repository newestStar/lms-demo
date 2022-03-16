module.exports = {
  welcome_page: {
    page_title: 'Tasks',
    page_description:
      'Thanks to the tasks module you can create new tasks, assign them to groups of students or individuals, monitor their current status and start evaluations of completed tasks.',
    hide_info_label: `Ok, I've got it. When the configuration is complete, don't show this info anymore`,
    step_profiles: {
      title: 'Link profiles',
      description: 'Identify which profiles match the teachers and students',
      btn: 'Link profiles',
    },
    step_library: {
      title: 'Tasks Library',
      description:
        'Create new tasks and assign them or review the create ones on the task library.',
      btn: 'Create task',
    },
    step_ongoing: {
      title: 'Ongoing tasks',
      description:
        'Reviews tasks in progress and monitors their status. You can also start the correction of completed tasks.',
      btn: 'View ongoing tasks',
    },
    step_history: {
      title: 'History',
      description: `View completed tasks, their evaluations and the student's feedback.`,
      btn: 'View tasks history',
    },
  },
  library_page: {
    page_title: 'Task Library',
  },
  task_setup_page: {
    title: 'Create new task',
    edit_title: 'Edit task',
    common: {
      select_center: 'Select center',
      create_done: 'Task created',
      update_done: 'Task updated',
      publish_done: 'Task published',
      no_id_error: 'No task id provided',
      save: 'Save draft',
      publish: 'Publish',
    },
    setup: {
      configData: {
        step_label: 'Config',
        labels: {
          name: 'Name',
          tagline: 'Tagline',
          configTitle: 'Config',
          center: 'Center',
          program: 'Program',
          course: 'Course',
          subjectsTitle: 'Subjects',
          subject: 'Subject',
          addSubject: 'Add subject',
          level: 'Level',
          summary: 'Summary',
          tags: 'Tags',
          buttonNext: 'Next',
        },

        placeholders: {
          tagline: 'Subtitle of the task',
          name: "Task's name",
          center: 'Select...',
          program: 'Select...',
          course: 'Select...',
          subject: 'Select...',
          level: 'Select...',
          summary: 'What is this assignment about?',
          tags: 'Start typing a tag',
        },
        errorMessages: {
          name: { required: 'Field required' },
          tagline: { required: 'Required field' },
          program: { required: 'Required field' },
          course: { required: 'Required field' },
          subject: { required: 'Required field' },
          level: { required: 'Required field' },
          summary: { required: 'Required field' },
          tags: { required: 'Required field' },
        },
      },
      designData: {
        step_label: 'Design',
        labels: {
          title: 'Design',
          color: 'Color',
          cover: 'Cover Image',
          buttonNext: 'Next',
          buttonPrev: 'Previous',
        },
        placeholders: {
          color: 'Pick color',
          cover: 'Upload or select from Library',
        },
        errorMessages: {
          color: { required: 'Required field' },
          cover: { required: 'Required field' },
        },
      },
      contentData: {
        step_label: 'Content',
        labels: {
          title: 'Content',
          methodology: 'Methodology',
          recommendedDuration: 'Recommended duration',
          statement: 'Statement',
          buttonNext: 'Next',
          buttonPrev: 'Previous',
        },
        errorMessages: {
          methodology: { required: 'Required field' },
          recommendedDuration: { required: 'Required field' },
        },
      },
      instructionData: {
        step_label: 'Instructions',
        labels: {
          title: 'Instructions',
          forTeacher: 'Instructions for Teacher',
          forStudent: 'Instructions for Student',
          buttonPublish: 'Only publish',
          buttonNext: 'Publish and assign',
          buttonPrev: 'Previous',
        },
        placeholders: {
          forTeacher: 'Help other teachers approach this exercise with a few simple instructions.',
          forStudent:
            'Here you can include extra information to help the student perform the exercise better.',
        },
        errorMessages: {
          forTeacher: { required: 'Required field' },
          forStudent: { required: 'Required field' },
        },
      },
      publishData: {
        step_label: 'Publish',
        labels: {
          title: 'Publish & Assign',
          description:
            'You can now save this activity in your library to use it whenever you want or, in the same step, assign it to your students to do.',
          assign: 'Assign later to students',
          buttonNext: 'Publish',
          buttonPrev: 'Previous',
        },
      },
    },
  },
  assignment_page: {
    page_title: 'Assign tasks',
  },
  assignment_form: {
    labels: {
      assignTo: 'Assign to',
      classroomToAssign: 'Classroom to assign',
      studentToAssign: 'Student to assign',
      mode: 'Mode',
      startDate: 'Start date',
      deadline: 'Deadline',
      visualizationDateToogle: 'Make visible in advance',
      visualizationDate: 'Visualization date',
      limitedExecutionToogle: 'Limit execution time',
      limitedExecution: 'Limited execution time',
      messageToStudentsToogle: 'Add a message to the students',
      messageToStudents: 'Message to the students',
      submit: 'Assign',
      add: 'Add',
    },
    placeholders: {
      date: 'dd/mm/yyyy',
      time: 'hh:mm',
      units: 'units',
    },
    descriptions: {
      messageToStudents:
        'If you assign this task to other groups in this step, this message will be the default message for all tasks (although you can change it individually if you wish).',
    },
    assignTo: {
      student: 'Student',
      class: 'Class',
    },
    modes: {
      individual: 'Individual',
      pairs: 'In pairs',
      groups: 'Teams',
    },
    timeUnits: {
      hours: 'hours',
      minutes: 'minutes',
      days: 'days',
    },
  },
  profiles_page: {
    page_title: 'Tasks - Profile setup',
    page_description:
      'First of all we need to match the system profiles with the custom profiles you have created on the platform (Please read carefully the characteristics of each profile. Once the profiles are linked, it cannot be undone.)',
    save: 'Save',
    profileSaved: 'Saved profiles',
    profiles: 'Profiles',
    teacher: 'Teacher',
    teacherDescription: 'Responsible for the creation and assignment of tasks',
    teacherRequired: 'Field required',
    student: 'Student',
    studentDescription: 'Will be assigned the tasks and will be responsible for executing them',
    studentRequired: 'Field required',
  },
  ongoing_pae: {
    page_title: 'Ongoing tasks',
  },
  history_page: {
    page_title: 'History',
  },
  teacher_assignments: {
    table: {
      headers: {
        group: 'Group',
        task: 'Task',
        deadline: 'Deadline',
        students: 'Students',
        status: 'Status',
        open: 'Open',
        ongoing: 'Ongoing',
        completed: 'Completed',
        actions: 'Actions',
      },
    },
  },
};
