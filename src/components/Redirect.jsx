import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Redirect(props) {
    const navigate = useNavigate();
    
    useEffect(() => {
        navigate(props.to);
    })
    return (
        <></>
    )
}

export default Redirect;