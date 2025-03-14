import User from "../../models/User";
import { NavItem } from "./NavItem";
import { UserGreeting } from "./UserGreeting";

export default function AdminNavbar({ user, onLogout }: { user: User; onLogout: () => void }) {
  return (
    <nav aria-label="Admin navigation">
      <ul className="flex w-full justify-center bg-blue-800 p-4 mb-16">
        <NavItem to="/">Events List</NavItem>
        <NavItem to="/user/profile">User Profile</NavItem>
        <NavItem to="/event/create">Create Event</NavItem>
        <li className="mr-6">
          <button onClick={onLogout} className="text-gray-100 hover:text-blue-100">
            Logout
          </button>
        </li>
        <UserGreeting email={user.email} />
      </ul>
    </nav>
  );
}