// migrations/20210709124567-add-payments-collection.js
module.exports = {
  async up(db, client) {
    // Create the Payments collection
    await db.createCollection('payments', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['PaymentId', 'BookingId', 'Status', 'Amount', 'TransactionDate', 'PaymentMethod'],
          properties: {
            PaymentId: {
              bsonType: 'objectId',
              description: 'must be an ObjectId and is required'
            },
            BookingId: {
              bsonType: 'objectId',
              description: 'must be an ObjectId referencing Bookings and is required'
            },
            Status: {
              bsonType: 'string',
              enum: ['verified', 'pending', 'disputed'],
              description: 'must be a string and is required'
            },
            Amount: {
              bsonType: 'double',
              description: 'must be a double and is required'
            },
            TransactionDate: {
              bsonType: 'date',
              description: 'must be a date and is required'
            },
            PaymentMethod: {
              bsonType: 'string',
              description: 'must be a string and is required'
            }
          }
        }
      }
    });

    // Create unique index on PaymentId
    await db.collection('payments').createIndex({ PaymentId: 1 }, { unique: true });
  },

  async down(db, client) {
    // Drop the Payments collection
    await db.collection('payments').drop();
  }
};
