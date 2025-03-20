import { Link } from "react-router-dom";

export default function Unauthorized() {
    return (
        <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
                403 - Access Denied
            </h1>
            <p className="mb-4">
                You don't have permission to view this page.
            </p>
            <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">
            Home
            </Link>

        </div>
    )
}