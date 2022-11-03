import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Post from "./post";

export default function Postnr() {
    
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    let account = JSON.parse(sessionStorage.getItem("account")) || {};
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let { pid } = useParams();
    const navigate = useNavigate();

    function redirect() {
        console.log("a");
        if (posts.length>0){
            console.log(posts[posts.length-1].id);
            console.log(posts[posts.length-1].id);
        if (pid >= 0 && pid <=  posts[posts.length-1].id) { console.log(""); } else {
            navigate('/');
        }} else {navigate('/');}
    }

    useEffect(() => {
        redirect();
    }, [])

    let postx = posts.filter((post) => parseInt(post.id) === parseInt(pid))[0];


    let aut = accounts.filter((accountx) => parseInt(accountx.id) === parseInt(postx.author))[0];

    function del(){
        posts.splice(posts.indexOf(postx),1);
        localStorage.setItem("posts",JSON.stringify(posts));
        navigate('/');
    }
    
   
    


    return (
        <body>
            {
                account.id !== undefined ?
                    <div className="navbar">
                        <div className="nav-text">
                            <p>MihaiGur</p>
                            <p>{account.username}</p>
                        </div>

                        <div className="navbar-btns">
                            <button onClick={() => { navigate('/' + account.id); }}>Home</button>
                            <button onClick={() => { navigate('/upload'); }}>Upload</button>
                            <button onClick={() => { sessionStorage.clear(); window.location.reload(); }}>Log Out</button>
                        </div>

                    </div> :
                    <div className="navbar">
                        <p>MihaiGur</p>

                        <div className="navbar-btns">
                        <button onClick={() => {  navigate('/')}}>Home</button>
                            <button onClick={() => { navigate('/login'); }}>Log In</button>
                            <button onClick={() => { navigate('/signup'); }}>Sign Up</button>
                            
                        </div>
                    </div>

            }

            <div className="content">
                <div className="postx">
                <h1>{postx.title}</h1>
                <h3>{aut.username}</h3>
                <img src={postx.image} />
                <p>{postx.description}</p>
                {
                    account.id === postx.author?
                        <div className="post-buttons">
                            <button className="del" onClick={()=>{del()}}>
                                Delete post
                            </button>
                            <button onClick={()=>{navigate('/post/'+postx.id+'/edit')}}>
                                Edit post
                            </button>
                        </div>:<></>
                }
                </div>
            </div>

        </body>
    )
}
