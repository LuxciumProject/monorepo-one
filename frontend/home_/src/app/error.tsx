'use client'; // 🚷 Importing server-side modules strictly prohibited

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react';
import { BiSolidError } from 'react-icons/bi';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="vertical-center flex items-center justify-center">
      <Card className="mx-auto w-2/5">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center gap-2 text-secondary">
            <BiSolidError size={30} />
            <h1 className="text-3xl font-semibold">Error</h1>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex justify-center text-danger">{error.message}</div>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button onClick={() => reset()} color="secondary" variant="bordered">
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
