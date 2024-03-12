import { analyze } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your learning!',
    },
  });

  const analysis = await analyze(entry.content);
  if (analysis) {
    await prisma.analysis.create({
      data: {
        userId: user.id,
        entryId: entry.id,
        ...analysis
      },
    });
  }

  // Whenever a page gets data with something like fetch, its gonna be cached and subsequent requests can be served with the cached data. To make sure new data is rendered, we can revalidate the path on every request
  revalidatePath('/journal');

  return NextResponse.json({ data: entry });
};
