var mongoose=require('mongoose');
var AdminSchema=new mongoose.Schema(
    {
        username:String,
        email:String,
        phone:String,
        password:String,
    },
    {timestamps:true}
);
module.exports=mongoose.model('Admin',AdminSchema,'Admin');