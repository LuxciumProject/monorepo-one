import { fetchCurrentUserLikeIds } from '../actions/likeActions';
import { getMembers } from '../actions/memberActions';
import MemberCard from './MemberCard';

export default async function MembersPage() {
  const members = await getMembers();
  const likeIds = await fetchCurrentUserLikeIds();

  return (
    <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-6">
      {members &&
        members.map((member) => (
          <MemberCard member={member} key={member.id} likeIds={likeIds} />
        ))}
    </div>
  );
}
