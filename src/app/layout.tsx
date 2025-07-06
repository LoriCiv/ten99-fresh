export default function RootLayout({ children }) {
  // The return statement begins here
  return (
    <ClerkProvider>

      {/* Everything inside ClerkProvider is its "child" */}
      {/* The html tag starts here, inside ClerkProvider. */}
      <html lang="en">
        <body>{children}</body>
      </html>
      {/* The html tag ends here, still inside ClerkProvider. */}

    </ClerkProvider>
    // ClerkProvider ends here.
  )
}
