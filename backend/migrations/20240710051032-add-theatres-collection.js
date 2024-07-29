// migrations/20210710162015-add-theatres-collection.js
module.exports = {
  async up(db, client) {
    // Create the Theatres collection
    await db.createCollection('theatres', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['TheatreId', 'Name', 'Location', 'SeatingCapacity', 'Facilities', 'ContactInfo', 'SeatPricing'],
          properties: {
            TheatreId: {
              bsonType: 'objectId',
              description: 'must be an ObjectId and is required'
            },
            Name: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            Location: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            SeatingCapacity: {
              bsonType: 'int',
              description: 'must be an integer and is required'
            },
            Facilities: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            ContactInfo: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            SeatPricing: {
              bsonType: 'object',
              properties: {
                category: {
                  bsonType: 'string',
                  description: 'must be a string'
                },
                price: {
                  bsonType: 'double',
                  description: 'must be a double'
                }
              }
            }
          }
        }
      }
    });

    // Create unique index on TheatreId
    await db.collection('theatres').createIndex({ TheatreId: 1 }, { unique: true });
  },

  async down(db, client) {
    // Drop the Theatres collection
    await db.collection('theatres').drop();
  }
};
