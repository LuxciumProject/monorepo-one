import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">
        Welcome to Your Tool Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-6 rounded-lg bg-white shadow">
          <h3 className="text-lg font-semibold mb-2">Tool 1</h3>
          <p>Brief description of Tool 1.</p>
          <Link href="/tool1">
            <a>Go to Tool 1</a>
          </Link>
        </div>
        <div className="border p-6 rounded-lg bg-white shadow">
          <h3 className="text-lg font-semibold mb-2">Tool 2</h3>
          <p>Brief description of Tool 2.</p>
        </div>
        Add more tool components here
      </div>
    </div>
  );
}
