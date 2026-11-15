import mongoose from 'mongoose';
import dns from 'dns';

// Fix for Node.js DNS SRV resolution issues on Windows / certain local network routers
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if network environment restricts setting custom DNS servers
}

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/electronic-store';
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('💡 TIP: If running locally, make sure MongoDB is started (mongod). If using MongoDB Atlas, check your MONGO_URI in server/.env.');
    // Don't kill process immediately in dev so developers see the advice
  }
};

export default connectDB;
