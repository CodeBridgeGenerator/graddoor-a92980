
    module.exports = function (app) {
        const modelName = 'uni_ranking';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            rankID: { type:  String , required: true, maxLength: null },
uniID: { type:  String , required: true },
rankingType: { type:  String , required: true },
rankingYear: { type:  String , required: true },
position: { type:  String , required: true },
country: { type:  String , required: true },

            
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