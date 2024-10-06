// @/components/zip-images/ImageCard.tsx
'use client'; // 🚷 Importing server-side modules strictly prohibited

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import Image from 'next/image';

interface ImageCardProps {
  fileName: string;
}

export default function ImageCard({ fileName }: ImageCardProps) {
  return (
    <Card isHoverable isPressable>
      <CardHeader>
        <h3>{fileName}</h3>
      </CardHeader>
      <CardBody>
        <Image
          src={`/zip-images/${fileName}`}
          alt={fileName}
          width={200}
          height={200}
        />
      </CardBody>
      <CardFooter>
        <p>Image Footer</p>
      </CardFooter>
    </Card>
  );
}
