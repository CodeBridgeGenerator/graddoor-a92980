
    module.exports = function (app) {
        const modelName = 'student';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            uID: { type:  String , required: true, minLength: null, maxLength: null },
sID: { type:  String , required: true, maxLength: null },
rID: { type:  String , required: true, minLength: null, maxLength: null },
fieldOfInterest: { type:  String , required: true },
projectID: { type:  String , required: true },
projectTitle: { type:  String , required: true },
projectOverview: { type:  String , required: true },
projectField: { type:  String , required: true, maxLength: null },
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