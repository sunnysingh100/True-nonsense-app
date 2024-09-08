import mongoose from "mongoose";

type ConnnectionObject = {
  isConnected?: number;
};

const connection: ConnnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection failed:", error);
    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default dbConnect;
