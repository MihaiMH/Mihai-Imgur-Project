import { useNavigate, Redirect } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Post from "./post";

export default function Home() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let account = JSON.parse(sessionStorage.getItem("account")) || {};

    const navigate = useNavigate();
    const [st, setSt] = useState(0);

    console.log(account.id);
    function redirect() {
        if (account.id !== undefined) { navigate('/' + account.id) }
    }

    useEffect(() => {
        redirect();
    }, [])

    return (

        <body>
            <div className="navbar">
                <p>MihaiGur</p>

                <div className="navbar-btns">
                    <button onClick={() => { navigate('/login'); }}>Log In</button>
                    <button onClick={() => { navigate('/signup'); }}>Sign Up</button>
                </div>

            </div>

            <div className="content">
                {
                    posts.length > 0 ?
                        <div className="posts">
                            {
                                posts.map((post) => <Post {...post} />)
                            }
                        </div> : <p className="noposts">No posts yet :/</p>
                }
            </div>

            <div className="test-btns">
                <button onClick={() => { localStorage.clear(); }}>Clear LocalStorage</button>
                <button onClick={() => { sessionStorage.clear(); }}>Clear sessionStorage</button>
            </div>
        </body>
    )

}