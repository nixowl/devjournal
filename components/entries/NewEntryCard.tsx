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
import { useState } from 'react';

const NewEntryCard = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleOnClick = async () => {
    setLoading(true)
    const data = await createNewEntry();
    if (data) {
      router.push(`/journal/${data.id}`)
    } 
    setLoading(false)
  };

  return (
    <Card
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-gray-600/50 shadow-md min-w-44"
      onClick={handleOnClick}
    >
      <CardHeader>
        <CardTitle>New entry</CardTitle>
      </CardHeader>
      {loading && <CardContent>Preparing entry and AI...</CardContent>}
    </Card>
  );
};

export default NewEntryCard;
