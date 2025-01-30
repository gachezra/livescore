import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Match from "@/models/matchModel";

export async function GET() {
  try {
    await connectDB();
    const currentDate = new Date();
    const matches = await Match.find().sort({ startTime: -1 });

    const categorizedMatches = matches.reduce(
      (acc, match) => {
        const matchStartTime = new Date(match.startTime);
        const matchEndTime = new Date(match.endTime);

        if (currentDate >= matchStartTime && currentDate <= matchEndTime) {
          acc.liveMatches.push(match);
        } else {
          acc.completedMatches.push(match);
        }
        return acc;
      },
      { liveMatches: [], completedMatches: [] }
    );

    return NextResponse.json(categorizedMatches);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
