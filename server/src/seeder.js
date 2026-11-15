import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

// Fix for Node.js DNS SRV resolution issues on Windows / certain local network routers
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if network environment restricts setting custom DNS servers
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const getMongoUri = () => process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/electronic-store';

const importData = async () => {
  try {
    const conn = await mongoose.connect(getMongoUri());
    console.log(`Connected to MongoDB Atlas: ${conn.connection.host} (${conn.connection.name})`);

    // Wipe existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert sample users (they get hashed via Mongoose pre-save)
    const createdUsers = [];
    for (const u of users) {
      const userDoc = new User(u);
      await userDoc.save();
      createdUsers.push(userDoc);
    }

    // Insert products
    await Product.insertMany(products);

    console.log('✅ Demo Data Imported Successfully into MongoDB Atlas!');
    console.log(`- Inserted ${createdUsers.length} users (Demo login: demo@example.com / password123)`);
    console.log(`- Inserted ${products.length} electronic products across 5 categories`);
    process.exit();
  } catch (error) {
    console.error(`❌ Data Import Failed: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(getMongoUri());

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('🗑️ All Database Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Data Wipe Failed: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
