
    module.exports = function (app) {
        const modelName = 'uni_review';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            urID: { type:  String , required: true, minLength: null, maxLength: null },
uniID: { type:  String , required: true, minLength: null, maxLength: null },
sID: { type:  String , required: true, minLength: null, maxLength: null },
rating: { type: Number, required: false, max: 1000000 },
pros: { type:  String , required: true, maxLength: null },
cons: { type:  String , required: true, maxLength: null },
comment: { type:  String , required: true, maxLength: null },
createdAT: { type:  String , required: true, maxLength: null },

            
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