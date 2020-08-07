import { useAuth0 } from '../utils/react-auth0-spa';

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    window.location.href = loginWithRedirect({})
  );
}
