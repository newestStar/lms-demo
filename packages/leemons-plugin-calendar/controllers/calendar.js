const calendarService = require('../src/services/calendar');
const eventsService = require('../src/services/events');
const kanbanColumnsService = require('../src/services/kanban-columns');
const kanbanEventOrdersService = require('../src/services/kanban-event-orders');
const eventTypesService = require('../src/services/event-types');
const calendarConfigsService = require('../src/services/calendar-configs');

async function getCalendar(ctx) {
  const data = await calendarService.getCalendarsToFrontend(ctx.state.userSession);
  ctx.status = 200;
  ctx.body = { status: 200, ...data };
}

async function getEventTypes(ctx) {
  const eventTypes = await eventTypesService.list();
  ctx.status = 200;
  ctx.body = { status: 200, eventTypes };
}

async function addEvent(ctx) {
  const event = await eventsService.addFromUser(ctx.state.userSession, ctx.request.body.event);
  ctx.status = 200;
  ctx.body = { status: 200, event };
}

async function updateEvent(ctx) {
  const event = await eventsService.updateFromUser(
    ctx.state.userSession,
    ctx.request.body.id,
    ctx.request.body.event
  );
  ctx.status = 200;
  ctx.body = { status: 200, event };
}

async function removeEvent(ctx) {
  const event = await eventsService.removeFromUser(ctx.state.userSession, ctx.request.body.event);
  ctx.status = 200;
  ctx.body = { status: 200, event };
}

async function listKanbanColumns(ctx) {
  const columns = await kanbanColumnsService.list();
  ctx.status = 200;
  ctx.body = { status: 200, columns };
}

async function listKanbanEventOrders(ctx) {
  const orders = await kanbanEventOrdersService.list(ctx.state.userSession);
  ctx.status = 200;
  ctx.body = { status: 200, orders };
}

async function saveKanbanEventOrders(ctx) {
  const order = await kanbanEventOrdersService.save(
    ctx.state.userSession,
    ctx.request.body.column,
    ctx.request.body.events
  );
  ctx.status = 200;
  ctx.body = { status: 200, order };
}

async function addCalendarConfig(ctx) {
  const config = await calendarConfigsService.add(ctx.request.body.config);
  ctx.status = 200;
  ctx.body = { status: 200, config };
}

async function listCalendarConfig(ctx) {
  const configs = await calendarConfigsService.list();
  ctx.status = 200;
  ctx.body = { status: 200, configs };
}

async function detailCalendarConfig(ctx) {
  const configs = await calendarConfigsService.detail(ctx.request.params.id);
  ctx.status = 200;
  ctx.body = { status: 200, configs };
}

async function updateCalendarConfig(ctx) {
  const config = await calendarConfigsService.update(
    ctx.request.params.id,
    ctx.request.body.config
  );
  ctx.status = 200;
  ctx.body = { status: 200, config };
}

module.exports = {
  addEvent,
  removeEvent,
  updateEvent,
  getCalendar,
  getEventTypes,
  listKanbanColumns,
  addCalendarConfig,
  listCalendarConfig,
  updateCalendarConfig,
  detailCalendarConfig,
  listKanbanEventOrders,
  saveKanbanEventOrders,
};
