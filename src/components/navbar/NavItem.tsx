import { Link } from "react-router-dom";

export function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li className="mr-6">
      <Link className="text-gray-100 hover:text-blue-100" to={to}>
        {children}
      </Link>
    </li>
  );
}