import { authMiddleware } from "@clerk/nextjs";

// Routes to NOT protect with auth middleware
export default authMiddleware({
    publicRoutes: ['/']
})

// Protects all routes except internal /_next/ routes and static files
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};