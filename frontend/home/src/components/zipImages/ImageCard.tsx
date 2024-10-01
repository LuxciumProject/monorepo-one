// src/components/zipImages/ImageCard.tsx
'use client';

import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import Image from 'next/image';

interface ImageCardProps {
  fileName: string;
}

export default function ImageCard({ fileName }: ImageCardProps) {
  return (
    <Card isHoverable isPressable className="w-full">
      <CardHeader>
        <h3 className="text-base font-semibold">{fileName}</h3>
      </CardHeader>
      <CardBody>
        <Image
          src={`/zip-images/${encodeURIComponent(fileName)}`}
          alt={fileName}
          width={200}
          height={200}
          className="object-cover"
        />
      </CardBody>
      <CardFooter>
        <p className="text-sm text-gray-500">Footer text</p>
      </CardFooter>
    </Card>
  );
}
