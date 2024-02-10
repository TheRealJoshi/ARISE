import Link from 'next/link';

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This page tells you more about this simple Next.js application.</p>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
      </nav>
    </div>
  );
}