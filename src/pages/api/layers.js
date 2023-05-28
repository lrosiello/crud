import { query } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const layers = await query("SELECT * FROM capas", []);
    res.status(200).json({ layers });
  } else {
    res.status(405).end();
  }
}
