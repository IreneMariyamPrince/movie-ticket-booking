module.exports = {
  async up(db, client) {
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['UserId', 'FirstName', 'LastName', 'Password', 'UserRole'],
          properties: {
            UserId: {
              bsonType: 'objectId',
              description: 'must be a string and is required',
            },
            FirstName: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            LastName: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            Email: {
              bsonType: 'string',
              description: 'must be a string and is nullable',
            },
            PhoneNumber: {
              bsonType: 'string',
              description: 'must be a string and is nullable',
            },
            Password: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            UserRole: {
              bsonType: 'int',
              enum: [0, 1, 2, 3],
              description: 'can only be one of the enum values and is required',
            },
            Address: {
              bsonType: 'string',
              description: 'must be a string and is nullable',
            },
            profilePictureUrl: {
              bsonType: 'string',
              description: 'must be a string and is nullable',
            }
          }
        }
      }
    });
  },

  async down(db, client) {
    await db.collection('users').drop();
  }
};