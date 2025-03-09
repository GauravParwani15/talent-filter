
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
};

const ProtectedRoute = ({
  children,
  requireAuth = false,
  redirectTo = "/sign-in",
}: ProtectedRouteProps) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="container flex items-center justify-center h-screen">Loading...</div>;
  }

  // If user is logged in and trying to access index page, redirect to profiles
  if (session && location.pathname === '/') {
    return <Navigate to="/profiles" replace />;
  }

  // For protected routes that require authentication
  if (requireAuth && !session) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
