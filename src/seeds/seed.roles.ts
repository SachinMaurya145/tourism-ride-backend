import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserModel } from '../modules/auth/auth.model';

const MONGO_URI = 'mongodb://localhost:27017/tourismRideDB';

const users = [
  {
    name: 'Admin User',
    email: 'admin@system.com',
    password: 'Admin@123',
    role: 'ADMIN'
  },
  {
    name: 'Normal User',
    email: 'user@system.com',
    password: 'User@123',
    role: 'USER'
  },
  {
    name: 'Driver User',
    email: 'driver@system.com',
    password: 'Driver@123',
    role: 'DRIVER'
  },
  {
    name: 'Owner User',
    email: 'owner@system.com',
    password: 'Owner@123',
    role: 'OWNER'
  }
];

const seedRoles = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    for (const user of users) {
      const exists = await UserModel.findOne({ role: user.role });

      if (exists) {
        console.log(`⚠️ ${user.role} already exists`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      await UserModel.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role
      });

      console.log(`✅ ${user.role} created`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding roles:', error);
    process.exit(1);
  }
};

seedRoles();

// cmd - npx ts-node src/seeds/seed.roles.ts
// - npx ts-node src/seeds/seed.superAdmin.ts

