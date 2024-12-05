import { useAuth0 } from "@auth0/auth0-react";
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <form className="p-6 rounded shadow-md w-full max-w-sm mx-auto">
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition mt-3"
        onClick={() => logout()}
      >
        Log Out
      </button>
    </form>
  );
};

export default LogoutButton;
