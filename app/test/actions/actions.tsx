"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import {
  customers,
  headings,
  mapLocations,
  optimusNotifications,
  optimusUsers,
  options,
  salesmen,
  sections,
  technicians,
  trucks,
  truckComments,
  truckMakes,
  truckModels,
  worksheets,
  worksheetChanges,
} from "@/db/schema";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const role = formData.get("role") as string;

  // Hash the password
  const password_hash = await bcrypt.hash(formData.get("password") as string, 10);

  await db.insert(optimusUsers).values({
    name,
    username,
    passwordHash: password_hash,
    email,
    phone,
    role,
  });

  revalidatePath("/test");
}

export async function editUser(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const role = formData.get("role") as string;
  
  if (!id || isNaN(id)) {
    throw new Error("Invalid or missing user ID.");
  }
  if (!name) {
    throw new Error("Name is required.");
  }
  if (!username) {
    throw new Error("Username is required.");
  }
  if (!email) {
    throw new Error("Invalid email or missing!");
  }
  if (!phone) {
    throw new Error("Invalid phone number or missing!");
  }
  if (!role) {
    throw new Error("Role is required.");
  }

  await db.update(optimusUsers).set({ name, username, email, phone, role }).where(eq(optimusUsers.id, id));
  revalidatePath("/test");
  redirect("/test");
}

export async function deleteUser(id: number) {
  await db.delete(optimusUsers).where(eq(optimusUsers.id, id));
  revalidatePath("/test");
}

export async function getUsers() {
  return await db.select().from(optimusUsers);
}

export async function getUser(id: number) {
  return await db.select().from(optimusUsers).where(eq(optimusUsers.id, id))
}


