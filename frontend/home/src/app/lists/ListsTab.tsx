'use client'; // 🚷 Importing server-side modules strictly prohibited
// 🚷 Importing server-side module strictly prohibited in client code
import 'client-only'; // ❌ DO NOT use async functions in client code

import LoadingComponent from '@/components/LoadingComponent';
import { Tab, Tabs } from '@nextui-org/react';
import { Member } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Key, useTransition } from 'react';
import MemberCard from '../members/MemberCard';

type Props = {
  members: Member[];
  likeIds: string[];
} & React.HTMLAttributes<HTMLDivElement>;

export default function ListsTab({ members, likeIds, ...props }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const tabs = [
    { id: 'source', label: 'Members I have liked' },
    { id: 'target', label: 'Members that like me' },
    { id: 'mutual', label: 'Mutual likes' },
  ];

  function handleTabChange(key: Key) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('type', key.toString());
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="mt-10 flex w-full flex-col gap-5" {...props}>
      <Tabs
        aria-label="Like tabs"
        items={tabs}
        color="secondary"
        onSelectionChange={(key) => handleTabChange(key)}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {isPending ? (
              <LoadingComponent />
            ) : (
              <div>
                {members.length > 0 ? (
                  <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-6">
                    {members.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        likeIds={likeIds}
                      />
                    ))}
                  </div>
                ) : (
                  <div>No members for this filter</div>
                )}
              </div>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
