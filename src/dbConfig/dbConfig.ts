import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!, ({
            dbName: "next_auth",
        }))//exclamation overrides typescript checking
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB Connected Succcessfully');
        })

        connection.on('error', (err) => {
            console.log('Error Connecting to MongoDB. Please make sure mongoDB is running.' + err);
            process.exit();
        });

    } catch (error) {
        console.log(error);
    }
}