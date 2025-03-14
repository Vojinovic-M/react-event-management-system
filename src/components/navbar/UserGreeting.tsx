export function UserGreeting({ email }: { email: string }) {
    return (
      <li className="mr-6">
        <p className="text-gray-100 hover:text-blue-100 mr-8">Hi, {email}</p>
      </li>
    );
  }