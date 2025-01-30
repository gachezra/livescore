"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function MatchDetail({ match: initialMatch }) {
  const [match, setMatch] = useState(initialMatch);

  useEffect(() => {
    const fetchUpdates = async () => {
      const response = await fetch(`/api/matches/${match._id}`);
      const data = await response.json();
      setMatch(data);
    };

    if (match.isActive) {
      const interval = setInterval(fetchUpdates, 30000);
      return () => clearInterval(interval);
    }
  }, [match._id, match.isActive]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Match Header */}
          <div className="text-center mb-6">
            <div className="text-sm text-gray-600 mb-2">
              {format(new Date(match.startTime), "MMMM d, yyyy - HH:mm")}
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="text-right">
                <h2 className="text-xl font-bold">{match.homeTeam}</h2>
              </div>
              <div className="text-3xl font-bold">
                {match.homeScore} - {match.awayScore}
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold">{match.awayTeam}</h2>
              </div>
            </div>
          </div>

          {/* Match Stats */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Match Statistics</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-3 text-sm">
                  <div className="text-right">
                    {match.matchStats.home.totalFouls}
                  </div>
                  <div className="text-center text-gray-600">Fouls</div>
                  <div className="text-left">
                    {match.matchStats.away.totalFouls}
                  </div>
                </div>
                <div className="grid grid-cols-3 text-sm">
                  <div className="text-right">
                    {match.matchStats.home.freeKicksTaken}
                  </div>
                  <div className="text-center text-gray-600">Free Kicks</div>
                  <div className="text-left">
                    {match.matchStats.away.freeKicksTaken}
                  </div>
                </div>
                <div className="grid grid-cols-3 text-sm">
                  <div className="text-right">
                    {match.matchStats.home.freeKicksScored}
                  </div>
                  <div className="text-center text-gray-600">FK Scored</div>
                  <div className="text-left">
                    {match.matchStats.away.freeKicksScored}
                  </div>
                </div>
              </div>
            </div>

            {/* Scorers */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Scorers</h3>
              <div className="space-y-2">
                {match.scorers.map((scorer, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="text-gray-600">{scorer.minute}'</span>{" "}
                    {scorer.name} ({scorer.team}) - {scorer.type}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fouls and Free Kicks */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Fouls</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">{match.homeTeam}</h4>
                  {match.fouls.home.map((foul, idx) => (
                    <div key={idx} className="text-sm text-gray-600">
                      {foul.minute}' - {foul.player}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">{match.awayTeam}</h4>
                  {match.fouls.away.map((foul, idx) => (
                    <div key={idx} className="text-sm text-gray-600">
                      {foul.minute}' - {foul.player}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Free Kicks</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">{match.homeTeam}</h4>
                  {match.freeKicks.home.map((fk, idx) => (
                    <div key={idx} className="text-sm text-gray-600">
                      {fk.minute}' - {fk.player} {fk.scored ? "(⚽)" : "(✗)"}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">{match.awayTeam}</h4>
                  {match.freeKicks.away.map((fk, idx) => (
                    <div key={idx} className="text-sm text-gray-600">
                      {fk.minute}' - {fk.player} {fk.scored ? "(⚽)" : "(✗)"}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
