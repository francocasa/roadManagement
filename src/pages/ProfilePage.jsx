import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./../components/LogoutButton";
import LoginButton from "./../components/LoginButton";
const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <main className="container mx-auto p-8">
      {isAuthenticated ? (
        <div>
          <h1>Profile Page</h1>
          <p>Welcome, {user.name}!</p>
          <p>Your email is {user.email}.</p>
          <img src={user.picture} alt={user.name} />
          <LogoutButton />
        </div>
      ) : (
        <div>
          <p>You are not authenticated.</p>
          <LoginButton />
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
