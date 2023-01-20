const _ = require('lodash');
const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/localeData'));
const getAssignableInstance = require('../assignableInstance/getAssignableInstance');
const { registerDates } = require('../dates');
const { assignations } = require('../tables');
const registerGrade = require('../grades/registerGrade');
const { validateAssignation } = require('../../helpers/validators/assignation');
const { sendEmail } = require('../assignableInstance/sendEmail');

async function checkIfStudentIsOnInstance(user, instance) {
  const assignationsCount = await assignations.count(
    {
      instance,
      user,
    },
    { column: ['id'] }
  );

  return assignationsCount > 0;
}

async function createInstanceRoom(
  { assignableInstanceId, instance, classes, teachers, users },
  { transacting } = {}
) {
  const comunicaServices = leemons.getPlugin('comunica').services;
  const roomKey = leemons.plugin.prefixPN(`instance:${assignableInstanceId}`);
  const roomAlreadyExists = await comunicaServices.room.exists(roomKey, { transacting });

  const userAgents = _.compact(_.uniq(teachers).concat(users));

  // Creamos la sala que estara a primera altura
  if (!roomAlreadyExists) {
    return comunicaServices.room.add(roomKey, {
      name: instance.assignable.asset.name,
      subName: classes.length > 1 ? 'multisubjects' : classes[0].subject.name,
      parentRoom: null,
      image: instance.assignable.asset.id,
      icon:
        classes.length > 1 ? '/public/assets/svgs/module-three.svg' : classes[0].subject.icon?.id,
      bgColor: classes.length > 1 ? '#67728E' : classes[0].color,
      type: leemons.plugin.prefixPN('assignation'),
      userAgents,
      transacting,
    });
  }
  // Si la sala ya existia significa que estamos añadiendo alumnos extra, añadimos estos a la sala y devolvemos la sala
  await comunicaServices.room.addUserAgents(roomKey, userAgents, { transacting });
  return comunicaServices.room.get(roomKey, { transacting });
}

function getAllTeachers(classes, classesData) {
  const teachers = [];
  _.forEach(classes, ({ subject: { id: subjectId } }) => {
    _.forEach(classesData, (data) => {
      if (data.subject.id === subjectId) {
        _.forEach(data.teachers, (teacher) => {
          if (teacher.type === 'main-teacher')
            teachers.push(_.isString(teacher.teacher) ? teacher.teacher : teacher.teacher.id);
        });
      }
    });
  });
  return _.uniq(teachers);
}

async function createSubjectsRooms(
  { assignableInstanceId, parentKey, classes, teachers },
  { transacting } = {}
) {
  const comunicaServices = leemons.getPlugin('comunica').services;

  async function createSubjectRoom(classe) {
    const roomKey = leemons.plugin.prefixPN(
      `instance:${assignableInstanceId}:subject:${classe.subject.id}`
    );
    const roomAlreadyExists = await comunicaServices.room.exists(roomKey, { transacting });

    // Creamos la sala que estara a primera altura
    if (!roomAlreadyExists) {
      return comunicaServices.room.add(roomKey, {
        name: classe.subject.name,
        parentRoom: parentKey,
        image: classe.subject.image?.id,
        icon: classe.subject.icon?.id,
        bgColor: classe.color,
        type: leemons.plugin.prefixPN('assignation.subject'),
        userAgents: teachers,
        transacting,
      });
    }
    // Si la sala ya existia significa que estamos añadiendo alumnos extra, añadimos estos a la sala y devolvemos la sala
    await comunicaServices.room.addUserAgents(roomKey, teachers, { transacting });
    return comunicaServices.room.get(roomKey, { transacting });
  }

  const result = {};

  const r = await Promise.all(_.map(classes, createSubjectRoom));
  _.forEach(classes, (classe, index) => {
    result[classe.subject.id] = r[index];
  });

  return result;
}

async function createGroupRoom(
  { assignableInstanceId, parentKey, classes, teachers, users },
  { transacting } = {}
) {
  const comunicaServices = leemons.getPlugin('comunica').services;
  const roomKey = leemons.plugin.prefixPN(`instance:${assignableInstanceId}:group`);
  const roomAlreadyExists = await comunicaServices.room.exists(roomKey, { transacting });

  const userAgents = _.compact(_.uniq(teachers).concat(users));

  // Creamos la sala que estara a primera altura
  if (!roomAlreadyExists) {
    return comunicaServices.room.add(roomKey, {
      name: 'activityGroup',
      subName: _.map(classes, 'subject.name').join(','),
      parentRoom: parentKey,
      icon:
        classes.length > 1 ? '/public/assets/svgs/module-three.svg' : classes[0].subject.icon?.id,
      bgColor: classes.length > 1 ? '#67728E' : classes[0].color,
      type: leemons.plugin.prefixPN('assignation.group'),
      metadata: {
        iconIsUrl: classes.length > 1,
      },
      userAgents,
      transacting,
    });
  }
  // Si la sala ya existia significa que estamos añadiendo alumnos extra, añadimos estos a la sala y devolvemos la sala
  await comunicaServices.room.addUserAgents(roomKey, teachers, { transacting });
  return comunicaServices.room.get(roomKey, { transacting });
}

async function addUserSubjectRoom(
  { parentKey, classe, assignation, user, teachers },
  { transacting }
) {
  const comunicaServices = leemons.getPlugin('comunica').services;
  return comunicaServices.room.add(
    leemons.plugin.prefixPN(
      `subject|${classe.subject.id}.assignation|${assignation.id}.userAgent|${user}`
    ),
    {
      name: 'teachersOfSubject', // instance.assignable.asset.name,
      nameReplaces: {
        subjectName: classe.subject.name,
      },
      icon: classe.subject.icon?.id,
      bgColor: classe.color,
      parentRoom: parentKey,
      type: leemons.plugin.prefixPN('assignation.user'),
      userAgents: _.compact(_.uniq(teachers).concat(user)),
      transacting,
    }
  );
}

module.exports = async function createAssignation(
  assignableInstanceId,
  users,
  options,
  { userSession, transacting: t, ctx } = {}
) {
  // TODO: Permissions like `task.${taskId}.instance.${instanceId}` to allow assignation removals and permissions changes
  return global.utils.withTransaction(
    async (transacting) => {
      validateAssignation(
        {
          instance: assignableInstanceId,
          users,
          ...options,
        },
        { useRequired: true }
      );

      // EN: Get the assignable instance, if not permissions, it will throw an error
      // ES: Obtiene la instancia asignable, si no tiene permisos, lanzará un error
      const [instance, userAgents] = await Promise.all([
        getAssignableInstance.call(this, assignableInstanceId, {
          userSession,
          details: true,
          transacting,
        }),
        leemons.getPlugin('users').services.users.getUserAgentsInfo(users, {
          withCenter: true,
          // TODO MIGUEL HE AÑADIDO EL AVATAR
          userColumns: ['id', 'email', 'avatar', 'locale'],
          transacting,
        }),
      ]);

      const academicPortfolioServices = leemons.getPlugin('academic-portfolio').services;
      const classesData = await academicPortfolioServices.classes.classByIds(instance.classes, {
        withTeachers: true,
        userSession,
        transacting,
      });

      const hostname = await leemons.getPlugin('users').services.platform.getHostname();

      const _classes = _.uniqBy(classesData, 'subject.id');
      const userAgentByIds = _.keyBy(userAgents, 'id');

      try {
        const { indexable, classes, group, grades, timestamps, status, metadata } = options;

        // Saber si la fecha que se quiere es la de visualizacion o la de inicio de la tarea.
        // instance.dates.visualization
        // instance.dates.start

        // TODO @MIGUEL
        console.log(1);
        const teachers = getAllTeachers(_classes, classesData);
        const instanceRoom = await createInstanceRoom(
          {
            assignableInstanceId,
            instance,
            classes: _classes,
            teachers,
            users,
          },
          { transacting }
        );

        console.log(2);
        // TODO @MIGUEL
        await createGroupRoom({
          assignableInstanceId,
          classes: _classes,
          parentKey: instanceRoom.key,
          teachers,
          users,
        });

        console.log(3);
        // TODO @MIGUEL
        const subjectRooms = await createSubjectsRooms({
          assignableInstanceId,
          parentKey: instanceRoom.key,
          classes: _classes,
          teachers,
        });

        // EN: Create the assignation
        // ES: Crea la asignación
        return await Promise.all(
          users.map(async (user) => {
            const isOnInstance = await checkIfStudentIsOnInstance(user, assignableInstanceId, {
              userSession,
              transacting,
            });

            if (isOnInstance) {
              throw new Error(
                `The student ${user} is already assigned to instance ${assignableInstanceId}`
              );
            }
            const assignation = await assignations.create(
              {
                instance: assignableInstanceId,
                indexable: indexable || true,
                user,
                classes: JSON.stringify(classes || []),
                group,
                status,
                metadata: JSON.stringify(metadata),
              },
              { transacting }
            );

            const roomsPromises = [];

            _.forEach(_classes, (classe) => {
              const _teachers = [];
              _.forEach(classesData, (data) => {
                if (data.subject.id === classe.subject.id) {
                  _.forEach(data.teachers, (teacher) => {
                    if (teacher.type === 'main-teacher')
                      _teachers.push(
                        _.isString(teacher.teacher) ? teacher.teacher : teacher.teacher.id
                      );
                  });
                }
              });

              // TODO @MIGUEL
              console.log(4);
              roomsPromises.push(
                addUserSubjectRoom(
                  {
                    parentKey: `${subjectRooms[classe.subject.id].key}|${instanceRoom.key}`,
                    classe,
                    assignation,
                    user,
                    teachers: _teachers,
                  },
                  { transacting }
                )
              );
            });

            await Promise.all(roomsPromises);

            if (instance?.sendMail) {
              sendEmail({
                instance,
                userSession,
                userAgent: userAgentByIds[user],
                classes: _classes,
                ctx,
                hostname,
              });
            }

            // EN: Save the timestamps
            // ES: Guarda los timestamps
            if (!_.isEmpty(timestamps)) {
              assignation.timestamps = await registerDates(
                'assignation',
                assignation.id,
                timestamps,
                { transacting }
              );
            }

            // EN: Save the grades
            // ES: Guarda las calificaciones
            if (!_.isEmpty(grades)) {
              assignation.grades = await Promise.all(
                grades.map((grade) =>
                  registerGrade({ assignation: assignation.id, ...grade }, { transacting })
                )
              );
            }

            return {
              instance: assignableInstanceId,
              indexable,
              classes,
              group,
              grades,
              timestamps,
              status,
              metadata,
            };
          })
        );
      } catch (e) {
        console.error(e);
        throw new Error(`Error creating assignation: ${e.message}`);
      }
    },
    assignations,
    t
  );
};
