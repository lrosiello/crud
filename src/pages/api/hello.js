import { query } from "../../lib/db";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ name: "John Doe" });
  } else {
    res.status(405).end(); 
  }
}