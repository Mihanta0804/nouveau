import { Outlet } from "react-router-dom";
import Navigation from "../Components/Navigation";
import { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

function AppLayout() {
  const { user, getUserData } = useAuth();

  useEffect(function () {
    getUserData();
  }, []);

  return (
    <div>
      <Navigation connectedUser={user} />
      <Outlet connectedUser={user} />
    </div>
  );
}

export default AppLayout;
