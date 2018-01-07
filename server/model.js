/**
 * Created by w on 2017/12/5.
 */
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/Jobs', {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
});

const models = {
    user: {
        'user': {type: String, required: true},
        'pwd': {type: String, required: true},
        'type': {type: String, required: true},
        'avatar': {type: String},
        'desc': {type: String},  //职业简名
        'title':{type:String} ,   //想找的职位
        //下面两个是Boss的字段
        'company':{type:String},
        'money':{type:String}
    },
    chat:{
        'chatId':{type:String,required:true},
        'from':{type:String,required:true},
        'to':{type:String,required:true},
        'read':{type:Boolean,default:false},
        'content':{type:String,required:true},
        'create_time':{type:Number,default:new Date().getTime()}
    }
};

for (let m in models){
    mongoose.model(m,mongoose.Schema(models[m]));
}

module.exports = {
    getModule:function (name) {
        return mongoose.model(name);
    }
};