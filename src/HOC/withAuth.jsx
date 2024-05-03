import { AppStateContext } from "@/context/appStateProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function withAuth(Component) {
  const Auth = (props) => {
    const router = useRouter();
    const { user } = useContext(AppStateContext);

    if (!user?.idusuario) {
      router.push(`/login`);
      return null;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}
