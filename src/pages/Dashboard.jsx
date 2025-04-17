import { HandleUserLogout } from "@/api/authentication";
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/store/authentication";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutClick = async () => {
    const response = await HandleUserLogout();

    if (response.success) {
      navigate("/login");
      dispatch(handleLogout());
    }
  };

  return (
    <div className="">
      <Button onClick={handleLogoutClick}>Logout</Button>
    </div>
  );
};

export default Dashboard;
