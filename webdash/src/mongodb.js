import mongoose from "mongoose";
const mongoConnection = process.env.MONGOOSE_URI
const databaseNanme = process.env.DATABASE_NAME

const ConnectMongo = async ()=>{
mongoose.connect(`${mongoConnection}/${databaseNanme}`)
.then(()=>{
    console.log("Connection to database successfull")
})
.catch((err)=>{
    throw err
})
}

export default ConnectMongo;
