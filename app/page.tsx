import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center gap">
      <div className="flex flex-col gap-3 w-full max-w-[600px] mx-auto">
        <h1 className="text-7xl">Devjournal</h1>
        <p className="text-2xl text-foreground/45">Track your dev learning</p>
        <Link href="/journal">
          <Button className="w-[20%]">get started</Button>
        </Link>
      </div>
    </div>
  );
}
