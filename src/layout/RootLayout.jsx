import { useEffect, useState } from "react";
import { Outlet, useNavigate} from "react-router-dom";
import Navbar from "../component/Navbar";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDocument } from "../hooks/useDocument";
const RootLayout = () => {


  return (
<div className="rootLayout">
  <Navbar  />
  <main>
  <Outlet />
  </main>
</div>
    );
};

export default RootLayout;
