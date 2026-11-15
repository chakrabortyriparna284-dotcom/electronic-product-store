import mongoose from 'mongoose';
import dns from 'dns';

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/electronic-store';

  // On Windows, local router DNS often fails SRV lookup; use Google / Cloudflare DNS
  if (process.platform === 'win32') {
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch {
      // Ignore if restricted
    }
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);

    // If on Linux/cloud environment and default DNS failed, attempt fallback DNS
    if (process.platform !== 'win32') {
      try {
        console.log('Retrying connection with public DNS resolvers...');
        dns.setServers(['8.8.8.8', '1.1.1.1']);
        const conn = await mongoose.connect(mongoUri, {
          serverSelectionTimeoutMS: 10000,
        });
        console.log(`✅ MongoDB Connected on fallback DNS: ${conn.connection.host}`);
        return conn;
      } catch (err2) {
        console.error(`❌ Fallback Connection Error: ${err2.message}`);
      }
    }
    console.log('💡 TIP: Check MongoDB Atlas Network Access (ensure 0.0.0.0/0 is whitelisted) and MONGO_URI in Render environment variables.');
  }
};

export default connectDB;
