import Link from 'next/link';

const links = [
  { href: '/', label: 'dashboard' },
  { href: '/games', label: 'Jogos' },
  { href: '/players', label: 'Jogadores' },
  { href: '/standings', label: 'Classificação' },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold text-white">
          Unitel Basket
        </Link>
        <nav className="flex gap-4 text-sm text-soft">
          {links.map((link) => (
            <Link href={link.href} key={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
