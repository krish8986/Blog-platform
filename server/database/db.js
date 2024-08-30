import mongoose from "mongoose"

const Connection = async (username, password) => {
    // const URL =`mongodb://${username}:${password}@ac-ovsyiqv-shard-00-00.v6sjfot.mongodb.net:27017,ac-ovsyiqv-shard-00-01.v6sjfot.mongodb.net:27017,ac-ovsyiqv-shard-00-02.v6sjfot.mongodb.net:27017/?ssl=true&replicaSet=atlas-11wdgc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Blog-App`;
    // const URL = `mongodb://${username}:${password}@ac-ovsyiqv-shard-00-00.v6sjfot.mongodb.net:27017,ac-ovsyiqv-shard-00-01.v6sjfot.mongodb.net:27017,ac-ovsyiqv-shard-00-02.v6sjfot.mongodb.net:27017/?ssl=true&replicaSet=atlas-11wdgc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Blog-App`;
    const URL = `mongodb://${username}:${password}@ac-ovsyiqv-shard-00-00.v6sjfot.mongodb.net:27017,ac-ovsyiqv-shard-00-01.v6sjfot.mongodb.net:27017,ac-ovsyiqv-shard-00-02.v6sjfot.mongodb.net:27017/?ssl=true&replicaSet=atlas-11wdgc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Blog-App`;
    try {
        await mongoose.connect(URL, {  useNewUrlParser: true });
        console.log('Database connected successfully');
    }catch (error) {
        console.log('Error while connecting with the database', error);
    }
}
export default Connection;


// useNewUrlParser: true