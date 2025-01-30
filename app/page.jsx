"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import Link from "next/link";

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMatches = async () => {
    try {
      const response = await fetch("/api/matches");
      console.log(response);
      const data = await response.json();
      setMatches(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      <nav className="bg-black p-4">
        <div className="container mx-auto">
          <h1 className="text-white text-2xl font-bold">Live Scores</h1>
        </div>
      </nav>

      <div className="container mx-auto py-6 px-4">
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <div className="grid gap-4">
            {matches.map((match) => (
              <Link href={`/${match._id}`}>
                <div
                  key={match._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-green-600"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        {format(new Date(match.startTime), "HH:mm")}
                      </span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        Live
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="text-right">
                        <h3 className="font-medium text-sm">
                          {match.homeTeam}
                        </h3>
                        <div className="text-xs text-gray-600 mt-1">
                          Fouls: {match.matchStats.home.totalFouls}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xl font-bold">
                          {match.homeScore} - {match.awayScore}
                        </div>
                      </div>

                      <div className="text-left">
                        <h3 className="font-medium text-sm">
                          {match.awayTeam}
                        </h3>
                        <div className="text-xs text-gray-600 mt-1">
                          Fouls: {match.matchStats.away.totalFouls}
                        </div>
                      </div>
                    </div>

                    {match.scorers.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <h4 className="text-xs font-medium mb-1">Scorers:</h4>
                        <div className="text-xs text-gray-600">
                          {match.scorers.map((scorer, idx) => (
                            <div key={idx}>
                              {scorer.name} ({scorer.minute}') - {scorer.team}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
