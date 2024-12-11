"use server";

import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { user, userLibrary } from "@/db/schema";
import { db } from "@/db/index";

export const addBook = async (userId: string, isbn: string) => {
  await db
    .insert(userLibrary)
    .values({
      userId,
      isbn,
    })
    .returning({ id: userLibrary.id });
};
