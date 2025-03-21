import User from "../../models/User";
import { NavItem } from "./NavItem";

export default function UserNavbar({ user, onLogout }: { user: User; onLogout: () => void }) {
  return (
    <nav aria-label="User navigation">
      <ul className="flex w-full justify-center bg-blue-800 p-4 mb-16">
        <NavItem to="/">Events List</NavItem>
        <NavItem to="/user/profile">Hi, {user.email}</NavItem>
        <li className="mr-6">
          <button onClick={onLogout} className="text-gray-100 hover:text-blue-100">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}