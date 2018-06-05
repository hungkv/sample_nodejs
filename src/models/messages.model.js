// messages-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const messages = new Schema({
    content: { type: String, required: true },
    room_id: {type: String, required: false}
  }, {
    timestamps: true
  });

  return mongooseClient.model('messages', messages);
};
