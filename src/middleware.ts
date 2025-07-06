import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Make the homepage public so everyone can see it.
  // All other routes, like your dashboard, will be protected by default.
  publicRoutes: ["/"] 
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
