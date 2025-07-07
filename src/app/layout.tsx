import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  title: "Ten99",
  description: "Freelancing Simplified",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is our test line to see what credential the app is using.
  console.log("Clerk credential being used:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
