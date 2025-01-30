"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";

export default function MatchesList({ initialMatches }) {
  const [matches, setMatches] = useState(initialMatches);

  useEffect(() => {
    const fetchUpdates = async () => {
      const response = await fetch("/api/matches");
      const data = await response.json();
      setMatches(data);
    };

    const interval = setInterval(fetchUpdates, 30000);
    return () => clearInterval(interval);
  }, []);

  const MatchCard = ({ match, isLive }) => (
    <Link href={`/${match._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-green-600 hover:shadow-lg transition-shadow">
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              {format(new Date(match.startTime), "HH:mm")}
            </span>
            {isLive && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                Live
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center">
            <div className="text-right">
              <h3 className="font-medium text-sm">{match.homeTeam}</h3>
              <div className="text-xs text-gray-600">
                Fouls: {match.matchStats.home.totalFouls}
                <br />
                FK: {match.matchStats.home.freeKicksScored}/
                {match.matchStats.home.freeKicksTaken}
              </div>
            </div>

            <div className="text-center">
              <div className="text-xl font-bold">
                {match.homeScore} - {match.awayScore}
              </div>
            </div>

            <div className="text-left">
              <h3 className="font-medium text-sm">{match.awayTeam}</h3>
              <div className="text-xs text-gray-600">
                Fouls: {match.matchStats.away.totalFouls}
                <br />
                FK: {match.matchStats.away.freeKicksScored}/
                {match.matchStats.away.freeKicksTaken}
              </div>
            </div>
          </div>

          {match.scorers.slice(0, 2).map((scorer, idx) => (
            <div key={idx} className="text-xs text-gray-600 mt-1">
              ⚽ {scorer.name} ({scorer.minute}&apos;)
            </div>
          ))}
          {match.scorers.length > 2 && (
            <div className="text-xs text-gray-500 mt-1">
              +{match.scorers.length - 2} more
            </div>
          )}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="space-y-6">
      {matches.liveMatches.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Live Matches</h2>
          <div className="grid gap-4">
            {matches.liveMatches.map((match) => (
              <MatchCard key={match._id} match={match} isLive={true} />
            ))}
          </div>
        </section>
      )}

      {matches.completedMatches.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Completed Matches</h2>
          <div className="grid gap-4">
            {matches.completedMatches.map((match) => (
              <MatchCard key={match._id} match={match} isLive={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
