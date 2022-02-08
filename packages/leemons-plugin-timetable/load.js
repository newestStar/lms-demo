module.exports = async ({ scripts, isInstalled }) => {
  // ES: Añade los modelos a la base de datos
  await scripts.models();
  // ES: Añade a leemons.getPlugin()/leemons.plugin todos los services de este plugin a los plugins que tengan acceso
  await scripts.services();
  // ES: Ejecuta el archivo install.js solo la primera vez (Cuando en base de datos aun no esta marcado como instalado)
  if (!isInstalled) {
    await scripts.install();
  }
  // ES: Ejecuta el archivo init.js (Solo usarse para cosas que se necesiten hacer a cada ver que se inicie la plataforma)
  await scripts.init();
  // ES: Carga los controladores y las rutas
  await scripts.controllers();
  await scripts.routes();
};
