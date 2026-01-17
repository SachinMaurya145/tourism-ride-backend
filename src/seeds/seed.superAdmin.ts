import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserModel } from '../modules/auth/auth.model';

const MONGO_URI = 'mongodb://localhost:27017/tourismRideDB';

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const exists = await UserModel.findOne({ role: 'SUPER_ADMIN' });

    if (exists) {
      console.log('❌ Super Admin already exists');
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash('SuperAdmin@123', 10);

    await UserModel.create({
      name: 'Super Admin',
      email: 'superadmin@system.com',
      password: passwordHash,
      role: 'SUPER_ADMIN'
    });

    console.log('✅ Super Admin created successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Super Admin:', error);
    process.exit(1);
  }
};

seedSuperAdmin();


// cmd - npx ts-node src/seeds/seed.superAdmin.ts

