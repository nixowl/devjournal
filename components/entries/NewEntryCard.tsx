'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '../ui/badge';

import { createNewEntry } from '@/utils/api';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';

const NewEntryCard = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    const data = await createNewEntry();
    console.log(data);
    router.push(`/journal/${data.id}`);
  };

  return (
    <Card
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-gray-600/50 shadow-md min-w-44"
      onClick={handleOnClick}
    >
      <CardHeader>
        <CardTitle>New entry</CardTitle>
      </CardHeader>
      <CardContent>New entry</CardContent>
    </Card>
  );
};

export default NewEntryCard;
