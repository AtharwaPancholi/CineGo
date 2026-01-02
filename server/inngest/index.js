import { Inngest } from "inngest";
import User from "../models/User.js";
import connectDB from "../config/db.js"; // your connectDB file

export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Helper to ensure DB connection per invocation
const ensureDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await connectDB();
  }
};

// Create user
const syncUserCreation = inngest.createFunction(
  { id: 'sync-user-from-clerk' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    await ensureDB();

    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address, // corrected
      name: `${first_name} ${last_name}`,
      image: image_url
    };
    await User.create(userData);
    console.log("User created in MongoDB:", userData);
  }
);

// Delete user
const syncUserDeletion = inngest.createFunction(
  { id: 'delete-user-with-clerk' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    await ensureDB();

    const { id } = event.data;
    await User.findByIdAndDelete(id);
    console.log("User deleted in MongoDB:", id);
  }
);

// Update user
const syncUserUpdation = inngest.createFunction(
  { id: 'update-user-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    await ensureDB();

    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      email: email_addresses[0].email_address, // corrected
      name: `${first_name} ${last_name}`,
      image: image_url
    };
    await User.findByIdAndUpdate(id, userData);
    console.log("User updated in MongoDB:", id, userData);
  }
);

export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation
];
