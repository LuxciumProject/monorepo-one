'use client'; // 🚷 Importing server-side modules strictly prohibited

import LikeButton from '@/components/LikeButton';
import { calculateAge } from '@/lib/util';
import { Card, CardFooter, Image } from '@nextui-org/react';
import { Member } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

type Props = {
  member: Member;
  likeIds: string[];
};

export default function MemberCard({ member, likeIds }: Props) {
  const hasLiked = likeIds.includes(member.userId);

  const preventLinkAction = (
    e: React.MouseEvent | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card fullWidth as={Link} href={`/members/${member.userId}`} isPressable>
      <Image
        isZoomed
        alt={member.name}
        width={300}
        src={member.image || '/images/user.png'}
        className="aspect-square object-cover"
      />
      <div
        role="button"
        tabIndex={0}
        title="Like this member" // Added title for accessibility
        onClick={preventLinkAction}
        onKeyDown={(e) => {
          if (
            e.key === 'Enter' ||
            (e.key === 'l' && document.activeElement === e.currentTarget)
          ) {
            preventLinkAction(e);
          }
        }}
      >
        <div className="absolute right-3 top-3 z-50">
          <LikeButton targetId={member.userId} hasLiked={hasLiked} />
        </div>
      </div>

      <CardFooter className="absolute bottom-0 z-10 flex justify-start overflow-hidden bg-gradient-to-b from-transparent to-zinc-800">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member.name}, {calculateAge(member.dateOfBirth)}
          </span>
          <span className="text-sm">{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
