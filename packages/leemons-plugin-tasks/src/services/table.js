module.exports = {
  tasks: leemons.query('plugins_tasks::tasks'),
  tasksVersioning: leemons.query('plugins_tasks::tasksVersioning'),
  tasksVersions: leemons.query('plugins_tasks::tasksVersions'),
  taskSubjects: leemons.query('plugins_tasks::taskSubjects'),
  taskObjectives: leemons.query('plugins_tasks::taskObjectives'),
  taskContents: leemons.query('plugins_tasks::taskContents'),
  taskAssessmentCriteria: leemons.query('plugins_tasks::taskAssessmentCriteria'),
  tags: leemons.query('plugins_tasks::tags'),
  attachments: leemons.query('plugins_tasks::attachments'),
  instances: leemons.query('plugins_tasks::instances'),
  teacherInstances: leemons.query('plugins_tasks::teacherInstances'),
  userInstances: leemons.query('plugins_tasks::userInstances'),
  groupsInstances: leemons.query('plugins_tasks::groupsInstances'),
  userDeliverables: leemons.query('plugins_tasks::userDeliverables'),
  settings: leemons.query('plugins_tasks::settings'),
  profiles: leemons.query('plugins_tasks::profiles'),
  groups: leemons.query('plugins_tasks::groups'),
  // Version Control
  versions: leemons.query('plugins_tasks::versions'),
  currentVersions: leemons.query('plugins_tasks::currentVersions'),
};
