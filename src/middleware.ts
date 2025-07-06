import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Make the homepage ("/") public so everyone can see it.
  // All other routes, like your dashboard, will be protected by default.
  publicRoutes: ["/"],
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
