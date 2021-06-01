const fs = require('fs-extra');

module.exports = async (dir = process.cwd(), _modes = []) => {
  const permissions = {
    r: fs.constants.R_OK,
    w: fs.constants.W_OK,
    x: fs.constants.X_OK,
    f: fs.constants.F_OK,
  };
  const modes = [
    ...new Set(
      _modes
        .filter((mode) => ['r', 'w', 'x', 'f'].includes(mode.toLowerCase()))
        .map((mode) => permissions[mode.toLowerCase()])
    ),
    // eslint-disable-next-line no-bitwise
  ].reduce((finalMode, mode) => finalMode | mode);

  try {
    await fs.access(dir, modes);
    return true;
  } catch (e) {
    return false;
  }
};
