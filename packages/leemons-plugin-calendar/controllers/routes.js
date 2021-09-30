module.exports = [
  /**
   * Calendar
   * */
  {
    path: '/calendar',
    method: 'POST',
    handler: 'calendar.getCalendar',
    authenticated: true,
    allowedPermissions: {
      'plugins.calendar.calendar': {
        actions: ['view', 'admin'],
      },
    },
  },
  /**
   * Event types
   * */
  {
    path: '/event-types',
    method: 'GET',
    handler: 'calendar.getEventTypes',
    authenticated: true,
  },
  {
    path: '/add/event',
    method: 'POST',
    handler: 'calendar.addEvent',
    authenticated: true,
  },
  {
    path: '/update/event',
    method: 'POST',
    handler: 'calendar.updateEvent',
    authenticated: true,
  },
  {
    path: '/remove/event',
    method: 'POST',
    handler: 'calendar.removeEvent',
    authenticated: true,
  },
  {
    path: '/kanban/list/columns',
    method: 'GET',
    handler: 'calendar.listKanbanColumns',
    authenticated: true,
  },
  {
    path: '/kanban/list/event/orders',
    method: 'GET',
    handler: 'calendar.listKanbanEventOrders',
    authenticated: true,
  },
  {
    path: '/kanban/save/event/orders',
    method: 'POST',
    handler: 'calendar.saveKanbanEventOrders',
    authenticated: true,
  },
  {
    path: '/configs/add',
    method: 'POST',
    handler: 'calendar.addCalendarConfig',
    authenticated: true,
    allowedPermissions: {
      'plugins.calendar.calendar-configs': {
        actions: ['create', 'admin'],
      },
    },
  },
  {
    path: '/configs/update/:id',
    method: 'POST',
    handler: 'calendar.updateCalendarConfig',
    authenticated: true,
    allowedPermissions: {
      'plugins.calendar.calendar-configs': {
        actions: ['update', 'admin'],
      },
    },
  },
  {
    path: '/configs/list',
    method: 'GET',
    handler: 'calendar.listCalendarConfig',
    authenticated: true,
    allowedPermissions: {
      'plugins.calendar.calendar-configs': {
        actions: ['view', 'admin'],
      },
    },
  },
  {
    path: '/configs/detail/:id',
    method: 'GET',
    handler: 'calendar.detailCalendarConfig',
    authenticated: true,
    allowedPermissions: {
      'plugins.calendar.calendar-configs': {
        actions: ['view', 'admin'],
      },
    },
  },
];
