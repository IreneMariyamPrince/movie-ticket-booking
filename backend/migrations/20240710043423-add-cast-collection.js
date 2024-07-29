// migrations/20210709095432-add-cast-collection.js
module.exports = {
  async up(db, client) {
    // Create the Cast collection
    await db.createCollection('cast', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['CastId', 'Name', 'Role'],
          properties: {
            CastId: {
              bsonType: 'objectId',
              description: 'must be an ObjectId and is required'
            },
            Name: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            Role: {
              bsonType: 'string',
              description: 'must be a string and is required'
            }
          }
        }
      }
    });

    // Create unique index on CastId
    await db.collection('cast').createIndex({ CastId: 1 }, { unique: true });
  },

  async down(db, client) {
    // Drop the Cast collection
    await db.collection('cast').drop();
  }
};
