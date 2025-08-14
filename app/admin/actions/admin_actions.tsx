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

/** USERS  */ 
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

  revalidatePath("/admin");
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
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteUser(id: number) {
  await db.delete(optimusUsers).where(eq(optimusUsers.id, id));
  revalidatePath("/admin");
}

export async function getUsers() {
  return await db.select().from(optimusUsers);
}

export async function getUser(id: number) {
  return await db.select().from(optimusUsers).where(eq(optimusUsers.id, id))
}


/* CUSTOMERS */
export async function createCustomer(formData: FormData) {

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  await db.insert(customers).values({
    name,
    email,
    phone,
    address,
  });

  revalidatePath("/admin");
}

export async function editCustomer(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  
  if (!id || isNaN(id)) {
    throw new Error("Invalid or missing user ID.");
  }
  if (!name) {
    throw new Error("Name is required.");
  }
  if (!email) {
    throw new Error("Invalid email or missing!");
  }
  if (!phone) {
    throw new Error("Invalid phone number or missing!");
  }

  await db.update(customers).set({ name, email, phone, address }).where(eq(customers.id, id));
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteCustomer(id: number) {
  await db.delete(customers).where(eq(customers.id, id));
  revalidatePath("/admin");
}

export async function getCustomers() {
  return await db.select().from(customers);
}

export async function getCustomer(id: number) {
  return await db.select().from(customers).where(eq(customers.id, id))
}


/** Salesman */
export async function createSalesman(formData: FormData) {
  const userID = Number(formData.get("user"));
  const name = formData.get("name") as string;

  await db.insert(salesmen).values({
    userId: userID,
    name,
  });

  revalidatePath("/admin");
}

export async function deleteSalesman(id: number) {
  await db.delete(salesmen).where(eq(salesmen.id, id));
  revalidatePath("/admin");
}

export async function getSalesmen() {
  return await db.select().from(salesmen);
}

export async function getSalesman(id: number) {
  return await db.select().from(salesmen).where(eq(salesmen.id, id))
}

/** MAKE */
export async function getMakes() {
  return await db.select().from(truckMakes)
}
export async function getMake(id: number) {
  return await db.select().from(truckMakes).where(eq(truckMakes.id, id))
}
/** MODEL */
export async function getModels() {
  return await db.select().from(truckModels)
}
export async function getModel(id: number) {
  return await db.select().from(truckModels).where(eq(truckModels.id, id))
}

/** TRUCK */
export async function createTruck(formData: FormData) {
  const customerId = Number(formData.get("customerId"));
  const salesmanId = Number(formData.get("salesmanId"));
  const makeId = Number(formData.get("makeId"));
  const modelId = Number(formData.get("modelId"));

  if (!customerId || !salesmanId || !makeId || !modelId) {
    throw new Error("Customer, Salesman, Make, and Model are required.");
  }

  await db.insert(trucks).values({
    customerId: customerId,
    salesmanId: salesmanId,
    makeId: makeId,
    modelId: modelId,
  });

  revalidatePath("/admin");
}

export async function getTrucks() {
  return await db.select().from(trucks);
}

export async function deleteTruck(id: number) {
  await db.delete(trucks).where(eq(trucks.id, id));
  revalidatePath("/admin");
}