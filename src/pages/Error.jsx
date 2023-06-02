import { Link,useNavigate } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
const Error = () => {
const navigate = useNavigate()
const error =useRouteError()
    return (
<div className="error">
<h1>Uh oh! We’ve got a problem.</h1>
<p>{error.message || error.statusText}</p>
<div className=" error-btn-container">
<button className="btn btn-black" onClick={() => navigate(-1)}>
<ArrowUturnLeftIcon width={20} />
<span>Go Back</span>
</button>
<Link to="/" className="btn btn-black">
<HomeIcon width={20} />
<span>Go home</span>
</Link>
</div>
</div>
    );
};

export default Error;