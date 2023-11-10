import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Redirect(props) {
    const navigate = useNavigate();

    console.log("mount");
    
    useEffect(() => {
        navigate(props.to);
    })
    return (
        <></>
    )
}

export default Redirect;