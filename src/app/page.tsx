import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    // The main container for our page
    <main className="flex flex-col items-center bg-white text-black">
      
      {/* ==================== Hero Section ==================== */}
      <section className="text-center w-full max-w-4xl py-20 px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Stop Juggling. Start Working.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Ten99 is the smart admin assistant that turns your work request emails 
          into scheduled jobs, client profiles, and paid invoices, automatically. 
          Reclaim your day from busywork.
        </p>
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
          No credit card required.
        </p>
      </section>
      {/* ================= End of Hero Section ================= */}

{/* ================= How It Works Section ================= */}
      <section className="w-full bg-gray-50 py-20 px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">
            Your Entire Workflow in a Single Email
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-2">1. Forward Your Email</h3>
              <p className="text-gray-600">
                When you get a work request from a client or agency, simply 
                forward it to your unique Ten99 address.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-2">2. Let Ten99 Handle It</h3>
              <p className="text-gray-600">
                Our AI instantly reads the email, schedules the appointment in 
                your calendar, and creates or updates the client's profile.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-2">3. Get Paid Faster</h3>
              <p className="text-gray-600">
                The moment the job is done, Ten99 automatically generates and
                sends the invoice. No delays, no forgetting.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ============== End of How It Works Section ============== */}


    </main>
  );
}
