// src/middleware.ts
import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware();

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
