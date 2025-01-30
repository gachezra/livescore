import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Match from "@/models/matchModel";

export async function GET() {
  try {
    await connectDB();
    const matches = await Match.find({ isActive: true }).sort({
      startTime: -1,
    });
    return NextResponse.json(matches);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
