import { NavItem } from "./NavItem";

export default function GuestNavbar() {
  return (
    <nav aria-label="Guest navigation">
      <ul className="flex w-full justify-end p-4 mb-16">
        <NavItem to="/">Events List</NavItem>
        <NavItem to="/user/login">Login</NavItem>
        <NavItem to="/user/register">Register</NavItem>
      </ul>
    </nav>
  );
}