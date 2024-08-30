
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
// import multerGridfsStorage from 'multer-gridfs-storage';

import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    // url: `mongodb://${username}:${password}@ac-ovsyiqv-shard-00-00.v6sjfot.mongodb.net:27017,ac-ovsyiqv-shard-00-01.v6sjfot.mongodb.net:27017,ac-ovsyiqv-shard-00-02.v6sjfot.mongodb.net:27017/?ssl=true&replicaSet=atlas-11wdgc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Blog-App`,
    url: `mongodb://${username}:${password}@ac-ovsyiqv-shard-00-00.v6sjfot.mongodb.net:27017,ac-ovsyiqv-shard-00-01.v6sjfot.mongodb.net:27017,ac-ovsyiqv-shard-00-02.v6sjfot.mongodb.net:27017/?ssl=true&replicaSet=atlas-11wdgc-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Blog-App`,
    // url: `mongodb://${username}:${password}@blog-app.v6sjfot.mongodb.net/?retryWrites=true&w=majority&appName=Blog-App`,
    // url: `mongodb+srv://${username}:${password}@blog-app.v6sjfot.mongodb.net/?retryWrites=true&w=majority&appName=Blog-App`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];
        
        if (match.indexOf(file.memeType) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }


    }
})

export default multer({ storage });


// useNewUrlParser: true