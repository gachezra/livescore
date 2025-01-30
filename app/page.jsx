import MatchesList from "@/components/MatchesList";
import { Suspense } from "react";
import connectDB from "@/lib/mongodb";
import Match from "@/models/matchModel";

async function getMatches() {
  await connectDB();
  const currentDate = new Date();

  const matches = await Match.find().sort({ startTime: -1 });

  return matches.reduce(
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
}

export default async function Home() {
  const matches = await getMatches();

  return (
    <main className="min-h-screen bg-gray-100">
      <nav className="bg-black p-4">
        <div className="container mx-auto">
          <h1 className="text-white text-2xl font-bold">Live Scores</h1>
        </div>
      </nav>

      <div className="container mx-auto py-6 px-4">
        <Suspense
          fallback={
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto" />
          }
        >
          <MatchesList initialMatches={matches} />
        </Suspense>
      </div>
    </main>
  );
}
