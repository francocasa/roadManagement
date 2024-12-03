import { useAuth0 } from "@auth0/auth0-react";
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <main className="container mx-auto p-8">
      <button onClick={() => logout()}>Logout</button>
    </main>
  );
};

export default LogoutButton;
