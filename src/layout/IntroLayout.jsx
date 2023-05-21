import { NavLink, Outlet } from "react-router-dom"
const IntroLayout = () => {
    return (
        <div>
            <h1>intro page</h1>
            <div>
            <p>please 
            <NavLink to='login'>login</NavLink>
            or 
            <NavLink to='signup '>Signup</NavLink>
            if you don't have an account
            </p>
            <main>
                <Outlet />
            </main>
        </div>
        </div>
    );
};

export default IntroLayout;