// TODO: add prop type to entry

import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <Card className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-gray-600/50 shadow-md min-w-44">
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>
        {date}
        </CardDescription>
      </CardHeader>
      <CardContent>Summary</CardContent>
      <CardFooter className="flex justify-between">
        <Badge>topic</Badge>
      </CardFooter>
    </Card>
  );
};

export default EntryCard;
