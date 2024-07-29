// migrations/20210710163015-add-shows-collection.js
module.exports = {
  async up(db, client) {
    // Create the Shows collection
    await db.createCollection('shows', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['ShowId', 'MovieId', 'TheatreId', 'ShowTime', 'Availability', 'Screen'],
          properties: {
            ShowId: {
              bsonType: 'objectId',
              description: 'must be an ObjectId and is required'
            },
            MovieId: {
              bsonType: 'objectId',
              description: 'must be an ObjectId and is required'
            },
            TheatreId: {
              bsonType: 'objectId',
              description: 'must be an ObjectId and is required'
            },
            ShowTime: {
              bsonType: 'date',
              description: 'must be a Date and is required'
            },
            Availability: {
              bsonType: 'int',
              description: 'must be an integer and is required'
            },
            Screen: {
              bsonType: 'string',
              description: 'must be a string and is required'
            }
          }
        }
      }
    });

    // Create unique index on ShowId
    await db.collection('shows').createIndex({ ShowId: 1 }, { unique: true });

    // Add foreign key constraints
    await db.collection('shows').createIndex({ MovieId: 1 });
    await db.collection('shows').createIndex({ TheatreId: 1 });
  },

  async down(db, client) {
    // Drop the Shows collection
    await db.collection('shows').drop();
  }
};
