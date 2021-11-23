module.exports = [
  // Grades
  {
    path: '/grades',
    method: 'GET',
    handler: 'grades.listGrades',
    authenticated: true,
  },
  {
    path: '/grades',
    method: 'POST',
    handler: 'grades.postGrade',
    authenticated: true,
  },
  {
    path: '/grades',
    method: 'PUT',
    handler: 'grades.putGrade',
    authenticated: true,
  },
  {
    path: '/grades/:id',
    method: 'GET',
    handler: 'grades.getGrade',
    authenticated: true,
  },
  // Grade Scales
  {
    path: '/grade-scales',
    method: 'POST',
    handler: 'grade-scales.postGradeScale',
    authenticated: true,
  },
  {
    path: '/grade-scales',
    method: 'PUT',
    handler: 'grade-scales.putGradeScale',
    authenticated: true,
  },
  // Grade Tags
  {
    path: '/grade-tags',
    method: 'POST',
    handler: 'grade-tags.postGradeTag',
    authenticated: true,
  },
  {
    path: '/grade-tags',
    method: 'PUT',
    handler: 'grade-tags.putGradeTag',
    authenticated: true,
  },
];
