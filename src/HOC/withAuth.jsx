"use client";
import { AppStateContext } from "@/context/appStateProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function withAuth(Component) {
  const Auth = (props) => {
    const router = useRouter();
    const { user } = useContext(AppStateContext);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (isClient && !user?.idusuario) {
        router.push(`/login`);
      }
    }, [isClient, user, router]);

    if (!isClient || !user?.idusuario) {
      return null;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}
