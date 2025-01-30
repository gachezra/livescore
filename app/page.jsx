import MatchesList from "@/components/MatchesList";
import { Suspense } from "react";

export default function Home() {
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
          <MatchesList />
        </Suspense>
      </div>
    </main>
  );
}
