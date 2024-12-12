import { NextRequest, NextResponse } from "next/server";
import { addBookToLibrary } from "@/lib/addBookToLibrary";

export async function POST(req: NextRequest) {
  const { userId, isbn } = await req.json();

  if (!userId || !isbn) {
    return NextResponse.json(
      { error: "Missing userId or isbn" },
      { status: 400 }
    );
  }

  try {
    const result = await addBookToLibrary(userId, isbn);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error adding book to library:", error);
    return NextResponse.json(
      { error: "Failed to add book to library" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Implement GET request handling
}

export async function PUT(req: NextRequest) {
  // Implement PUT request handling
}

export async function DELETE(req: NextRequest) {
  // Implement DELETE request handling
}
