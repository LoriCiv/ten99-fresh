import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black p-8">
      
      {/* Hero Section */}
      <section className="text-center w-full max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Stop Juggling. Start Working.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Ten99 is the smart admin assistant that turns your work request emails 
          into scheduled jobs, client profiles, and paid invoices, automatically. 
          Reclaim your day from busywork.
        </p>

        {/* This part shows a different button if the user is signed in or out */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700">
              Get Started for Free
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">
            <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700">
              Go to Your Dashboard
            </button>
          </Link>
        </SignedIn>

        <p className="text-sm text-gray-500 mt-4">
          No credit card required. Join dozens of freelancers simplifying their workflow.
        </p>
      </section>

    </main>
  );
}
