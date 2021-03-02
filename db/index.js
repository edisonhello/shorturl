
import fs from 'fs';
import path from 'path';

import mongoose from 'mongoose';

import newLogger from '../common/logger.js';

const { debug } = newLogger('db/index', true);

/**
 * @type {mongoose}
 */
let connection;

export async function initModels() {
  if (!connection) return initDB();

  const root = path.resolve('models');
  const initModelPromises = fs.readdirSync(root).map(async modelPath => {
    const { initModel } = await import(path.resolve(root, modelPath));
    initModel(connection);
  });

  return Promise.all(initModelPromises);
}

/**
 * 
 * @param {string} host Hostname of mongodb, default: `mongodb://localhost`.
 * @param {string} databaseName Database name in db, default: `short-url`.
 */
export async function initDB(host = 'mongodb://localhost', databaseName = 'short-url') {
  connection = await mongoose.connect(`${host}/${databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  await initModels();

  return connection;
}

export async function getConnection() {
  if (!connection) {
    await initDB();
  }
  return connection;
}
