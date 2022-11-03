import {useNavigate} from "react-router-dom";

export default function Error404(){

    const navigate = useNavigate();

    return (
        <>
        <h1>ERROR 404 - PAGE NOT FOUND</h1>
        <button onClick={()=>{navigate('/')}}>Go Home</button>
        </>
    )
}