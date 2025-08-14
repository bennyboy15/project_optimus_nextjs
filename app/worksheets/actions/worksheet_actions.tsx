"use server";

import { db } from "@/db";
import { worksheets } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWorksheet(formData: FormData) {
  // Extract values from formData
  const truckId = Number(formData.get("truckId"));
  const salesmanId = Number(formData.get("salesmanId"));
  const customerId = Number(formData.get("customerId"));
  const status = formData.get("status") ? Number(formData.get("status")) : null;
  const createdBy = Number(formData.get("createdBy"));

  // Basic validation
  if (!truckId || !salesmanId || !customerId) {
    throw new Error("Missing required fields: truckId, salesmanId, customerId");
  }

  // Insert into DB
  const result = await db
    .insert(worksheets)
    .values({
      truckId,
      salesman_id: salesmanId,
      customer_id: customerId,
      status,
      createdBy,
      modifiedBy: createdBy, // same as createdBy initially
    })
    .returning({ id: worksheets.id }); // get inserted worksheet ID

  const newId = result[0]?.id;

  // Optional: revalidate or redirect
  revalidatePath("/worksheets"); // if you have a worksheets list
  redirect(`/worksheets/${newId}`); // go to the created worksheet
}
