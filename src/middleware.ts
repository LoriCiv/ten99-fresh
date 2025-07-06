import { auth } from '@clerk/nextjs/server';

export default auth(() => {
  // This is where you could add rules to protect pages,
  // but for now, we leave it empty to allow access to all pages.
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
