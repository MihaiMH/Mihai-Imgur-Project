import { useState } from "react";
import {useNavigate} from "react-router-dom";

export default function Post(props){

    const navigate = useNavigate();

    const [name, setName] = useState("");

    
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];



    function getAcc() {
       return accounts.filter((account) => account.id === props.author)[0];
    }

    let aut = getAcc();

    return(
        <div onClick={()=>{navigate('/post/'+props.id)}} className="post">
            <h1>{props.title}</h1>
            <h3>{aut.username}</h3>
            <img src={props.image}/>
            <p>{props.description}</p>
        </div>
    )

}