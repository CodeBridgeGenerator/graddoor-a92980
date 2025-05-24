
    module.exports = function (app) {
        const modelName = 'lecturer';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            uID: { type:  String , required: true, minLength: null, maxLength: null },
lectID: { type:  String , required: true },
rID: { type:  String , required: true, maxLength: null },
rating: { type: Number, required: false, max: 10000000 },
description: { type:  String , required: true, maxLength: null },
department: { type:  String , required: true, maxLength: null },
specialization: { type:  String , required: true, maxLength: null },
profileLink: { type:  String , required: true, maxLength: null },
profilePhoto: { type:  String , required: true, minLength: null, maxLength: null },
bannerPhoto: { type:  String , required: true, minLength: null, maxLength: null },

            
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