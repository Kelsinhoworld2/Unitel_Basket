import Link from 'next/link';
import { useRouter } from 'next/router';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/games', label: 'Jogos' },
  { href: '/players', label: 'Jogadores' },
  { href: '/standings', label: 'Classificação' },
];

export default function NavBar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="font-semibold text-white">
          Unitel Basket
        </Link>

        {/* Nav */}
        <nav className="flex gap-4 text-sm text-soft">
          {links.map((link) => {
            const isActive = router.pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-white ${
                  isActive ? 'text-white font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
