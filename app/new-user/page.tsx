import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

// Clicking "get started" should redirect to sign in where user can also select sign up, signing up should redirect to /new-user and then redirect to /journal. When signed in, it should go straight to /journal

// TODO: fix typescript "possibly null" errors.
const createNewUser = async () => {
  const user = await currentUser();
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  });

  if (!match) {
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    });
  }

  redirect('/journal');
};

const NewUser = async () => {
  await createNewUser()
  return <div>...loading</div>;
};

export default NewUser;
