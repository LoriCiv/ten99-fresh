import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  // The homepage ("/") is accessible to everyone, logged in or not.
  // All other pages, like "/dashboard", will be protected.
  publicRoutes: ["/"],
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
