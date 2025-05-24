
    module.exports = function (app) {
        const modelName = 'university';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            uniID: { type:  String , required: true, maxLength: null },
rankID: { type:  String , required: true, maxLength: null },
name: { type:  String , required: true, maxLength: null },
location: { type:  String , required: true },
websiteLink: { type:  String , required: true, maxLength: null },
specialization: { type:  String , required: true, maxLength: null },
profilePhoto: { type:  String , required: true, maxLength: null },
bannerphoto: { type:  String , required: true, maxLength: null },

            
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