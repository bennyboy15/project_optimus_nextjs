"use server";

import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const userId = 1;

  await db.insert(postsTable).values({ title, content, userId });
  revalidatePath("/test"); 
}

export async function editPost(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const userId = 1;

  await db.update(postsTable)
    .set({ title, content, userId })
    .where(eq(postsTable.id, id));

  revalidatePath("/test");
}

export async function deletePost(id: number) {
  await db.delete(postsTable).where(eq(postsTable.id, id));
  revalidatePath("/test");
}

export async function getAllPosts() {
  return await db.select().from(postsTable);
}