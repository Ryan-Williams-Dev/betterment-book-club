import { NextApiRequest, NextApiResponse } from "next";
import { addBookToLibrary } from "@/lib/addBookToLibrary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return handlePost(req, res);
    case "GET":
      return handleGet(req, res);
    case "PUT":
      return handlePut(req, res);
    case "DELETE":
      return handleDelete(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { userId, isbn } = req.body;

  if (!userId || !isbn) {
    return res.status(400).json({ error: "Missing userId or isbn" });
  }

  try {
    const result = await addBookToLibrary(userId, isbn);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error adding book to library:", error);
    return res.status(500).json({ error: "Failed to add book to library" });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  // Implement GET request handling
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  // Implement PUT request handling
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  // Implement DELETE request handling
}
