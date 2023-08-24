import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Social",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Db is connected");
  } catch (error) {
    console.log(error);
  }
};
