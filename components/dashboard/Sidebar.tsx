import Link from "next/link";

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'History' },
];

const Sidebar = () => {
  return (
    <aside className="h-full w-[14%] min-w-48 border-r border-gray-500/20">
      <div>Devjournal</div>
          <ul>
              {links.map(link => (
              <li key={link.label} className="px-2 py-6 text-xl">
                  <Link href={link.href}>{link.label}</Link>
          </li>
      ))}</ul>
    </aside>
  );
};

export default Sidebar;
