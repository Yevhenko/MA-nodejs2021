/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const {
  db: { config, defaultType },
} = require('../config');

const { fatal } = require('../utils/fatal');

const db = {};
let type = defaultType;

// eslint-disable-next-line no-confusing-arrow
const funcWrapper = (func) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  typeof func === 'function'
    ? func
    : fatal(`FATAL: Cannot find ${func.name} function for current DB wrapper`);

const init = async () => {
  try {
    for (const [k, v] of Object.entries(config)) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const wrapper2 = require(`./${k}`);
      const wrapper = wrapper2(v);
      await wrapper.testConnection();
      console.log(`INFO: DB wrapper for ${k} initiated`);
      db[k] = wrapper;
    }
  } catch (err) {
    fatal(`FATAL: ${err.message || err}`);
  }
};

const end = async () => {
  for (const [k, v] of Object.entries(db)) {
    await v.close();
    console.log(`INFO: DB wrapper for ${k} was closed`);
  }
};

const setType = (t) => {
  if (!t || !db[t]) {
    console.log('WARNING: cannot find provided DB type');
    return false;
  }
  type = t;
  console.log(`INFO: The DB type has been changed to ${t}`);
  return true;
};

const getType = () => type;

const dbWrapper = (t) => db[t] || db[type];

module.exports = {
  init,
  end,
  setType,
  getType,
  dbWrapper,
  // ___________

  testConnection: async () => funcWrapper(dbWrapper().testConnection)(),
  close: async () => funcWrapper(dbWrapper().close)(),
  createProduct: async (product) => funcWrapper(dbWrapper().createProduct)(product),
  getProduct: async (id) => funcWrapper(dbWrapper().getProduct)(id),
  updateProduct: async (product) => funcWrapper(dbWrapper().updateProduct)(product),
  deleteProduct: async (id) => funcWrapper(dbWrapper().deleteProduct)(id),
};
