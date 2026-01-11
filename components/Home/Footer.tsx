import React from 'react';

interface FooterLink {
  label: string;
  href: string;
}

const EXPLORE_LINKS: FooterLink[] = [
  { label: 'Liveaboards', href: '/liveaboards' },
  { label: 'Dive Shops', href: '/diveshops' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'About Us', href: '/about' },
];

const SUPPORT_LINKS: FooterLink[] = [
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Booking Policy', href: '/policy' },
  { label: 'Reviews', href: '/reviews' },
];

const CONTACT_INFO = {
  location: 'Malé, Maldives',
  phone: '+960 123 4567',
  email: 'info@bucceo.com',
};

const FooterColumn: React.FC<{ title: string; links: FooterLink[] }> = ({ title, links }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="text-gray-300 text-sm hover:text-white transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b1b36] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* BUCCEO Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-wider">BUCCEO</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium diving experiences worldwide since 2010
            </p>
          </div>

          {/* Explore */}
          <FooterColumn title="Explore" links={EXPLORE_LINKS} />

          {/* Support */}
          <FooterColumn title="Support" links={SUPPORT_LINKS} />

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">{CONTACT_INFO.location}</p>

              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </div>

        {/* Line */}
        <hr className="my-10 border-gray-700" />

        {/* Bottom Text */}
        <p className="text-center text-xs sm:text-sm text-gray-500">
          © 2025 BUCCEO. All rights reserved. Licensed & Insured.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
