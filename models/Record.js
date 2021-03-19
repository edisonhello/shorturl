
import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema({
  alias: String,
  target: String,
});

/**
 * @type {mongoose.Model}
 */
export let Record;

/**
 * @param {mongoose} connection 
 */
export function initModel(connection) {
  Record = connection.model('records', RecordSchema);
}

export async function getRecord(filter) {
  return Record.findOne(filter).exec();
}