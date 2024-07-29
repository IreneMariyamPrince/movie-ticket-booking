// migrations/20210709123456-add-movies-collection.js
module.exports = {
  async up(db, client) {
    // Create the Movies collection
    await db.createCollection('movies', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['MovieId', 'Title', 'Description', 'Genre', 'ReleaseDate', 'Languages', 'Duration', 'Certification', 'Cast', 'Crew'],
          properties: {
            MovieId: {
              bsonType: 'objectId',
              description: 'must be an ObjectId and is required'
            },
            Title: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            Description: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            Genre: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            ReleaseDate: {
              bsonType: 'date',
              description: 'must be a date and is required'
            },
            Languages: {
              bsonType: 'array',
              items: {
                bsonType: 'string'
              },
              description: 'must be an array of strings and is required'
            },
            Duration: {
              bsonType: 'int',
              description: 'must be an integer and is required'
            },
            Certification: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            Cast: {
              bsonType: 'array',
              items: {
                bsonType: 'objectId'
              },
              description: 'must be an array of ObjectIds referencing Cast members and is required'
            },
            Crew: {
              bsonType: 'array',
              items: {
                bsonType: 'objectId'
              },
              description: 'must be an array of ObjectIds referencing Crew members and is required'
            }
          }
        }
      }
    });

    // Create unique index on MovieId
    await db.collection('movies').createIndex({ MovieId: 1 }, { unique: true });
  },

  async down(db, client) {
    // Drop the Movies collection
    await db.collection('movies').drop();
  }
};
