import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutUser } from '../../store/thunks/authThunks';
import LoadingSpinner from '../../components/LoadingSpinner';


export default function UserProfile() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const { globalLoading } = useAppSelector((state) => state.app)
  
  const handleLogout = () => {
      dispatch(logoutUser());
      navigate('/user/login')
    };

  if (globalLoading) return <LoadingSpinner/>
  if (!user) return <div>You are not logged in.</div>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-800">User Profile</h2>
      <h1 className="text-xl text-gray-600 mt-2">Welcome, {user.email}</h1>
      <button 
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
        Logout
        </button>
    </div>
  );
}
