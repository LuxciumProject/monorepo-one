import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4">
      <h2 className="mb-6 text-2xl font-bold">Welcome to Your Tool Dashboard</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow">
          <h3 className="mb-2 text-lg font-semibold">Tool 1</h3>
          <p>Brief description of Tool 1.</p>
          <Link href="/tool1" className="text-blue-500 hover:underline">
            Go to Tool 1
          </Link>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow">
          <h3 className="mb-2 text-lg font-semibold">Tool 2</h3>
          <p>Brief description of Tool 2.</p>
          <Link href="/tool2" className="text-blue-500 hover:underline">
            Go to Tool 2
          </Link>
        </div>
      </div>
      <div>Add more tool components here!</div>
    </div>
  );
}
