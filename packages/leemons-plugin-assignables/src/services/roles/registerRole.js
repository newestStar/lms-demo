const addCategory = require('../leebrary/categories/addCategory');
const { roles } = require('../tables');
const getRole = require('./getRole');

module.exports = async function registerRole(
  role,
  { transacting: t, teacherDetailUrl, studentDetailUrl, evaluationDetailUrl, ...data } = {}
) {
  return global.utils.withTransaction(
    async (transacting) => {
      if (!this.calledFrom) {
        throw new Error("Can't register role without plugin name");
      }

      // ES: Comprobar si los urls vienen
      if (!teacherDetailUrl || !studentDetailUrl || !evaluationDetailUrl)
        throw new Error('Urls required');

      // EN: Check if role already exists
      // ES: Comprueba si el rol ya existe
      try {
        const existingRole = await getRole.call(this, role, { transacting });

        if (existingRole) {
          throw new Error('Role already exists');
        }
      } catch (e) {
        if (e.message !== 'Role not found') {
          throw e;
        }
      }

      // EN: Register role
      // ES: Registrar rol
      await roles.create(
        {
          name: role,
          teacherDetailUrl,
          studentDetailUrl,
          evaluationDetailUrl,
          plugin: this.calledFrom,
        },
        { transacting }
      );

      // EN: Register the leebrary category
      // ES: Registrar la categoría de leebrary
      await addCategory(
        {
          ...data,
          role: `assignables.${role}`,
          label: { en: role, es: role },
        },
        { transacting }
      );

      return true;
    },
    roles,
    t
  );
};
