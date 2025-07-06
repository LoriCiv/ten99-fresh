import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export default auth((req: NextRequest) => {
  // Your logic here to protect routes if needed.
  // We can add protection rules later.
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
