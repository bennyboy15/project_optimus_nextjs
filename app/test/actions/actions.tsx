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

export async function editUser(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;

  await db.update(optimusUsers).set({ name, role }).where(eq(optimusUsers.id, id));
  revalidatePath("/test");
}

export async function deleteUser(id: number) {
  await db.delete(optimusUsers).where(eq(optimusUsers.id, id));
  revalidatePath("/test");
}

export async function getUsers() {
  return await db.select().from(optimusUsers);
}


