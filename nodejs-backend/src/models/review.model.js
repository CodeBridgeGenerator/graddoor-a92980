
    module.exports = function (app) {
        const modelName = 'review';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            rID: { type: Number, required: false, max: 1000000 },
sID: { type:  String , required: true, minLength: null, maxLength: null },
lectID: { type:  String , required: true, minLength: null, maxLength: null },
rating: { type:  String , required: true },
pros: { type:  String , required: true },
cons: { type:  String , required: true },
comment: { type:  String , required: true, maxLength: null },
createdAt: { type:  String , required: true, maxLength: null },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };