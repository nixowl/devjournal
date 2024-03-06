import { auth } from '@clerk/nextjs';
import { prisma } from './db';

// Params allow the user to "include" anything that will then be returned on the user object, like all entries for example. Adding question marks to make them optional
export const getUserByClerkId = async ({ options = {} }: { options?: { include?: object } }) => {
    const { userId } = await auth();

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            clerkId: userId,
        },
        include: options.include || {}
    });

    return user
};
