import { NextResponse } from "next/server";
import { db } from "@/db";
import { user } from "@/db/schema";

export async function GET() {
  try {
    const allUsers = await db.query.user.findMany();
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newUser = await db
      .insert(user)
      .values({
        id: body.id, // Ensure this field is provided in the request body
        name: body.name, // Ensure this field is provided in the request body
        email: body.email,
        emailVerified: body.emailVerified, // Ensure this field is provided in the request body
        createdAt: new Date(), // Assuming you want to set the current date
        updatedAt: new Date(), // Assuming you want to set the current date
        image: body.image, // Optional field
      })
      .returning();

    return NextResponse.json(newUser[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
