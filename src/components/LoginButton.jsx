import { useAuth0 } from "@auth0/auth0-react";
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <form className="p-6 rounded shadow-md w-full max-w-sm mx-auto">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Lima Road Management
      </h1>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition mt-3"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    </form>
    // <main className="container mx-auto p-8">
    //   <button onClick={() => loginWithRedirect()}>Log In</button>
    // </main>
  );
};

export default LoginButton;
