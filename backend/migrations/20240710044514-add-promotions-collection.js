// migrations/20210710160042-add-promotions-collection.js
module.exports = {
  async up(db, client) {
    // Create the Promotions collection
    await db.createCollection('promotions', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['PromotionId', 'Type', 'Description', 'DiscountValue', 'ValidityPeriod'],
          properties: {
            PromotionId: {
              bsonType: 'objectId',
              description: 'must be an ObjectId and is required'
            },
            Type: {
              bsonType: 'string',
              enum: ['coupon', 'promo code', 'seasonal offer', 'bundle offer'],
              description: 'must be a string from enum and is required'
            },
            Description: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            DiscountValue: {
              bsonType: 'double',
              description: 'must be a double and is required'
            },
            ValidityPeriod: {
              bsonType: 'date',
              description: 'must be a date and is required'
            }
          }
        }
      }
    });

    // Create unique index on PromotionId
    await db.collection('promotions').createIndex({ PromotionId: 1 }, { unique: true });
  },

  async down(db, client) {
    // Drop the Promotions collection
    await db.collection('promotions').drop();
  }
};
