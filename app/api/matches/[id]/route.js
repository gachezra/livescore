import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Match from "@/models/matchModel";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectDB();
    const match = await Match.findById(id);

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    return NextResponse.json(match);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
