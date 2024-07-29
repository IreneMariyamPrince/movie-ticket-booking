// migrations/20210709123456-add-crew-collection.js
module.exports = {
  async up(db, client) {
    // Create the Crew collection
    await db.createCollection('crew', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['CrewId', 'Name', 'Role'],
          properties: {
            CrewId: {
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

    // Create unique index on CrewId
    await db.collection('crew').createIndex({ CrewId: 1 }, { unique: true });
  },

  async down(db, client) {
    // Drop the Crew collection
    await db.collection('crew').drop();
  }
};
