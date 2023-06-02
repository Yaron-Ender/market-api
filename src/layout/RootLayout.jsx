import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import wave from '../assets/wave.svg'
const RootLayout = () => {
    return (
      <div className="rootLayout">
        <Navbar />
        <main>
          <Outlet />
        </main>
        {/* <img src={wave} alt="wave"></img> */}
      </div>
    );
};

export default RootLayout;