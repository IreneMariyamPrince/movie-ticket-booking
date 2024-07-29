// migrations/20210709123456-add-bookings-collection.js
module.exports = {
  async up(db, client) {
    // Create the Bookings collection
    await db.createCollection('bookings', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['BookingId', 'UserId', 'MovieId', 'ShowTime', 'Location', 'NumberOfTickets', 'TotalAmount', 'PaymentStatus'],
          properties: {
            BookingId: {
              bsonType: 'objectId',
              description: 'must be an ObjectId and is required'
            },
            UserId: {
              bsonType: 'objectId',
              description: 'must be an ObjectId referencing Users and is required'
            },
            MovieId: {
              bsonType: 'objectId',
              description: 'must be an ObjectId referencing Movies and is required'
            },
            ShowTime: {
              bsonType: 'date',
              description: 'must be a date and is required'
            },
            Location: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            NumberOfTickets: {
              bsonType: 'int',
              description: 'must be an integer and is required'
            },
            TotalAmount: {
              bsonType: 'double',
              description: 'must be a double and is required'
            },
            PaymentStatus: {
              bsonType: 'int',
              enum: [0, 1, 2], // 0: pending, 1: completed, 2: refunded
              description: 'must be an integer and is required'
            }
          }
        }
      }
    });

    // Create unique index on BookingId
    await db.collection('bookings').createIndex({ BookingId: 1 }, { unique: true });
  },

  async down(db, client) {
    // Drop the Bookings collection
    await db.collection('bookings').drop();
  }
};
