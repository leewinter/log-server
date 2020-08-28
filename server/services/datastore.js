import Datastore from 'nedb';

const db = new Datastore({ filename: __dirname + '/../datastore/logs', autoload: true });

export default db;