// migrations/20210710153042-add-notifications-collection.js
module.exports = {
  async up(db, client) {
    // Create the Notifications collection
    await db.createCollection('notifications', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['NotificationId', 'UserId', 'Message', 'ReadStatus', 'CreatedAt'],
          properties: {
            NotificationId: {
              bsonType: 'objectId',
              description: 'must be an ObjectId and is required'
            },
            UserId: {
              bsonType: 'objectId',
              description: 'must be an ObjectId referencing Users and is required'
            },
            Message: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            ReadStatus: {
              bsonType: 'bool',
              description: 'must be a boolean and is required'
            },
            CreatedAt: {
              bsonType: 'date',
              description: 'must be a date and is required'
            }
          }
        }
      }
    });

    // Create unique index on NotificationId
    await db.collection('notifications').createIndex({ NotificationId: 1 }, { unique: true });
  },

  async down(db, client) {
    // Drop the Notifications collection
    await db.collection('notifications').drop();
  }
};
