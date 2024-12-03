import { useAuth0 } from "@auth0/auth0-react";
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <main className="container mx-auto p-8">
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </main>
  );
};

export default LoginButton;
