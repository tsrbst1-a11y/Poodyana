import { SiteConfig } from '../types';
import DefaultLogo from './logo.png';

export default function Footer({ config }: { config: SiteConfig | null }) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <img 
          src={config?.logoUrl || DefaultLogo} 
          alt="Poody Logo" 
          className="h-10 w-auto object-contain mx-auto mb-4 invert brightness-0 grayscale"
          referrerPolicy="no-referrer"
        />
        <p className="text-gray-400 text-sm">© 2026 Poody. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
}
