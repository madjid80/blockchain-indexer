db = db.getSiblingDB(process.env.MONGO_DB || 'block-indexer');
db.createUser({
  user: process.env.MONGODB_USERNAME || 'admin',
  pwd: process.env.MONGODB_PASSWORD || 'password',
  roles: [
    {
      role: 'readWrite',
      db: process.env.MONGO_DB || 'block-indexer',
    },
  ],
});
