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
  return (
    // The publishableKey has been added directly here for our test.
    <ClerkProvider publishableKey="pk_live_Y2xlcmsudGVuOTkuYXBwJA">
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
