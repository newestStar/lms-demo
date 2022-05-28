import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Kanban as BubblesKanban } from '@bubbles-ui/components';
import { getCentersWithToken } from '@users/session';
import {
  getCalendarsToFrontendRequest,
  listKanbanColumnsRequest,
  listKanbanEventOrdersRequest,
  saveKanbanEventOrdersRequest,
  updateEventRequest,
} from '@calendar/request';
import useTranslateLoader from '@multilanguage/useTranslateLoader';
import prefixPN from '@calendar/helpers/prefixPN';
import { getLocalizationsByArrayOfItems } from '@multilanguage/useTranslate';
import tKeys from '@multilanguage/helpers/tKeys';
import { useCalendarEventModal } from '@calendar/components/calendar-event-modal';
import { KanbanFilters, KanbanTaskCard } from '@bubbles-ui/leemons';
import * as _ from 'lodash';
import { find, flatten, map, uniq } from 'lodash';
import hooks from 'leemons-hooks';
import getUserFullName from '@users/helpers/getUserFullName';
import transformEvent from '../../../helpers/transformEvent';

function Kanban({ session }) {
  const ref = useRef({
    loading: true,
    mounted: true,
    filtersData: {
      calendars: [],
    },
    filters: {
      showArchived: false,
      calendars: [],
    },
  });
  const prefix = prefixPN('kanbanFiltersOptions');
  const [, translations] = useTranslateLoader(prefix);
  const [toggleEventModal, EventModal] = useCalendarEventModal();
  const [, setR] = useState();

  function render() {
    if (ref.current.mounted) setR(new Date().getTime());
  }

  const filterMessages = useMemo(() => {
    if (translations && translations.items) {
      return _.reduce(
        translations.items,
        (acc, value, key) => {
          acc[key.replace(`${prefix}.`, '')] = value;
          return acc;
        },
        {}
      );
    }
    return {};
  }, [translations]);

  // ES: Consultas
  // EN: Queries
  async function getKanbanColumns() {
    const { columns } = await listKanbanColumnsRequest();
    return _.orderBy(columns, ['order'], ['asc']);
  }

  async function getTranslationColumns() {
    const keys = _.map(ref.current.columns, 'nameKey');
    const { items } = await getLocalizationsByArrayOfItems(keys);
    return items;
  }

  async function getKanbanColumnsEventsOrder() {
    const { orders } = await listKanbanEventOrdersRequest(ref.current.center.token);
    const obj = {};
    _.forEach(orders, (order) => {
      obj[order.column] = order.events;
    });
    return obj;
  }

  async function getCalendarsForCenter() {
    const { status, ...response } = await getCalendarsToFrontendRequest(ref.current.center.token);

    return {
      ...response,
      calendars: _.map(response.calendars, (calendar) => {
        const isUserCalendar =
          response && response.userCalendar && response.userCalendar.id === calendar.id;
        const data = {
          ...calendar,
          isUserCalendar,
        };
        if (isUserCalendar) {
          data.fullName = getUserFullName(session);
        }
        return data;
      }),
    };
  }

  function getColumnName(name) {
    return tKeys(name, ref.current.columnsT);
  }

  function getKanbanBoard() {
    const cols = [];
    const eventsByColumn = _.groupBy(ref.current.data.events, 'data.column');
    _.forEach(ref.current.columns, (column) => {
      if (!column.isArchived || (column.isArchived && ref.current.filters.showArchived)) {
        let cards = [];
        if (eventsByColumn[column.id] && ref.current.columnsEventsOrders[column.id]) {
          const cardsNoOrdered = [];
          _.forEach(eventsByColumn[column.id], (event) => {
            const index = ref.current.columnsEventsOrders[column.id].indexOf(event.id);
            if (index >= 0) {
              cards[index] = event;
            } else {
              cardsNoOrdered.push(event);
            }
          });
          cards = _.map(cardsNoOrdered, (c) => ({ ...c, notOrdered: true })).concat(cards);
        } else {
          cards = eventsByColumn[column.id] || [];
        }

        cards = _.filter(cards, (c) => !!c);

        if (ref.current.filters.calendars.length) {
          cards = _.filter(cards, (c) => {
            let show = false;
            // eslint-disable-next-line consistent-return
            _.forEach(c.data.classes, (calendar) => {
              if (ref.current.filters.calendars.indexOf(calendar) >= 0) {
                show = true;
                return false;
              }
            });
            return show;
          });
        }

        cols.push({
          id: column.id,
          title: getColumnName(column.nameKey),
          cards: _.map(cards, (card) => transformEvent(card, ref.current.data.calendars)),
        });
      }
    });
    return { columns: cols };
  }

  function onChange(values, event) {
    const cardsById = {};
    _.forEach(values.columns, (column) => {
      _.forEach(column.cards, (card) => {
        cardsById[card.id] = { ...card, data: { ...card.data, column: column.id } };
      });
    });
    const changedColumns = [];
    if (
      event.destination &&
      event.source &&
      event.destination.droppableId === event.source.droppableId
    ) {
      changedColumns.push(event.destination.droppableId);
    }
    _.forEach(ref.current.data.events, (event) => {
      const card = cardsById[event.id];
      if (event.data && event.data.column && card && event.data.column !== card.data.column) {
        changedColumns.push(card.data.column);
        // eslint-disable-next-line no-param-reassign
        event.data.column = card.data.column;
        updateEventRequest(ref.current.center.token, event.id, { data: event.data });
      }
    });

    _.forEach(values.columns, (column) => {
      if (changedColumns.indexOf(column.id) >= 0) {
        ref.current.columnsEventsOrders[column.id] = _.map(column.cards, 'id');
        saveKanbanEventOrdersRequest(
          ref.current.center.token,
          column.id,
          ref.current.columnsEventsOrders[column.id]
        );
      }
    });

    ref.current.board = getKanbanBoard();

    render();
  }

  function onFiltersChange(event) {
    ref.current.filters = {
      ...event,
    };
    ref.current.board = getKanbanBoard();
    render();
  }

  function addEventClick() {
    ref.current.event = null;
    toggleEventModal();
  }

  function onClickCard({ bgColor, icon, borderColor, ...e }) {
    ref.current.event = e;
    toggleEventModal();
  }

  // ES: Carga
  // EN: Load

  async function onCenterChange() {
    ref.current.columnsEventsOrders = await getKanbanColumnsEventsOrder();
    ref.current.data = await getCalendarsForCenter();
    ref.current.filtersData.calendars = _.map(
      _.filter(ref.current.data.calendars, { isClass: true }),
      (calendar) => ({ label: calendar.name, value: calendar.id })
    );
  }

  async function init() {
    ref.current.columns = await getKanbanColumns();
    ref.current.columnsT = await getTranslationColumns();
    ref.current.centers = getCentersWithToken();
    if (ref.current.centers.length) {
      [ref.current.center] = ref.current.centers;
      await onCenterChange();
      ref.current.board = getKanbanBoard();
    }

    console.log(ref.current.board);
    ref.current.loading = false;
    render();
  }

  async function reload() {
    await onCenterChange();
    ref.current.board = getKanbanBoard();
    render();
  }

  useEffect(() => {
    ref.current.mounted = true;
    if (session) init();
    return () => {
      ref.current.mounted = false;
    };
  }, [session]);

  useEffect(() => {
    hooks.addAction('calendar:force:reload', reload);
    return () => {
      hooks.removeAction('calendar:force:reload', reload);
    };
  });

  let icon = null;
  if (ref.current.board) {
    const calendarIds = uniq(
      flatten(map(ref.current.board.columns, (column) => map(column.cards, 'calendar')))
    );
    if (calendarIds.length === 1) {
      const calendar = find(ref.current.data.calendars, { id: calendarIds[0] });
      if (calendar) {
        icon = calendar.icon;
      }
    }
  }

  return (
    <Box
      sx={(theme) => ({
        height: '100vh',
        paddingTop: theme.spacing[12],
        background: theme.colors.uiBackground02,
      })}
    >
      {ref.current.center ? (
        <EventModal
          centerToken={ref.current.center.token}
          classCalendars={ref.current.filtersData.calendars}
          event={ref.current.event}
          close={toggleEventModal}
          forceType="plugins.calendar.task"
        />
      ) : null}
      <Box sx={() => ({ position: 'absolute', top: 0, left: 0, width: '100%' })}>
        <KanbanFilters
          data={ref.current.filtersData}
          value={{ ...ref.current.filters }}
          onChange={onFiltersChange}
          messages={filterMessages}
          addEventClick={addEventClick}
        />
      </Box>
      <Box sx={(theme) => ({ height: '100%' })}>
        {ref.current.board ? (
          <BubblesKanban
            value={ref.current.board}
            onChange={onChange}
            disableCardDrag={ref.current.filters.calendars.length}
            icon={icon}
            itemRender={(props) => (
              <KanbanTaskCard {...props} config={ref.current.data} onClick={onClickCard} />
            )}
          />
        ) : null}
      </Box>
    </Box>
  );
}

export default Kanban;
