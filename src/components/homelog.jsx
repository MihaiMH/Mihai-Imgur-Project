import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef,useEffect } from "react";
import Post from "./post";


export default function Homelog() {
    let account = JSON.parse(sessionStorage.getItem("account")) || {};
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    console.log(posts.length);

    let{uid} = useParams();

    const navigate = useNavigate();

    function redirect() {
        if (account.id === undefined || uid != account.id) { navigate('/') }
    }

    

   useEffect(()=>{
    redirect();
   },[])

    return (
        <body>
            
            <div className="navbar">
                <div className="nav-text">
                    <p>MihaiGur</p>
                    <p>{account.username}</p>
                </div>

                <div className="navbar-btns">
                    <button onClick={() => {  navigate('/upload'); }}>Upload</button>
                    <button onClick={() => {  sessionStorage.clear(); navigate('/'); }}>Log Out</button>
                </div>

            </div>
            <div className="content">
                {
                    posts.length > 0 ?
                        <div className="posts">
                            {
                                posts.map((post) => <Post {...post} />)
                            }
                        </div>:<p className="noposts">No posts yet :/</p>
                }
            </div>
        </body>
    )

}