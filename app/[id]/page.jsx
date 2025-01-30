import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Match from "@/models/matchModel";
import MatchDetail from "./MatchDetail";

export async function generateMetadata({ params }) {
  await connectDB();
  const match = await Match.findById(params.id);

  if (!match) return { title: "Match Not Found" };

  return {
    title: `${match.homeTeam} vs ${match.awayTeam} | Live Score`,
    description: `Live match details: ${match.homeTeam} ${match.homeScore}-${match.awayScore} ${match.awayTeam}. Follow the match statistics, scorers, and more.`,
    openGraph: {
      title: `${match.homeTeam} vs ${match.awayTeam}`,
      description: `Score: ${match.homeScore}-${match.awayScore}. Live match statistics and updates.`,
    },
  };
}

export default async function MatchPage({ params }) {
  await connectDB();
  const match = await Match.findById(params.id);

  if (!match) notFound();

  return <MatchDetail match={match} />;
}
