import { NextRequest, NextResponse } from "next/server";
import { addBookToLibrary } from "@/lib/addBookToLibrary";
import { getLibraryBooks } from "@/lib/getLibraryBooks";
import { removeBookFromLibrary } from "@/lib/removeBookFromLibrary";

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
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Implement GET request handling
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const books = await getLibraryBooks(userId);
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("Error fetching library books:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  // Implement PUT request handling
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const isbn = searchParams.get("isbn");

  if (!userId || !isbn) {
    return NextResponse.json(
      { error: "Missing userId or isbn" },
      { status: 400 }
    );
  }

  try {
    const result = await removeBookFromLibrary(userId, isbn);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error removing book from library:", error);
    return NextResponse.json(
      { error: "Failed to remove book from library" },
      { status: 500 }
    );
  }
}
