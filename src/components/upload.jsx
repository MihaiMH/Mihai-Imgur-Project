import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Post from "./post";

export default function Upload() {
    let account = JSON.parse(sessionStorage.getItem("account")) || {};
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    function redirect() {
        if (account.id === undefined) { navigate('/') }
    }

    useEffect(() => {
        redirect();
    }, [])
    const navigate = useNavigate();

    const [err, setErr] = useState(false);

    const t = useRef("");
    const i = useRef("");
    const d = useRef("");

    function uploadimg() {
        if (i.current.value !== "") {
            console.log("not err");
            setErr(false);
            let post;
            if (posts.length === 0) {
                post = {
                    id: 0,
                    title: t.current.value,
                    image: i.current.value,
                    description: d.current.value,
                    author: account.id
                }
            } else {
                post = {
                    id: posts[posts.length - 1].id + 1,
                    title: t.current.value,
                    image: i.current.value,
                    description: d.current.value,
                    author: account.id
                }
            }
            posts = [...posts, post];
            localStorage.setItem("posts", JSON.stringify(posts));
            console.log(posts);
            t.current.value = "";
            i.current.value = "";
            d.current.value = "";
            navigate('/post/' + (post.id.toString()))
        } else {
            console.log("err");
            setErr(true);
        }
    }

    return (
        <body>
            <div className="navbar">
                <div className="nav-text">
                    <p>MihaiGur</p>
                    <p>{account.username}</p>
                </div>

                <div className="navbar-btns">
                    <button onClick={() => { navigate('/' + account.id); }}>Home</button>
                    <button onClick={() => { sessionStorage.clear(); navigate('/'); }}>Log Out</button>
                </div>

            </div>
            <div className="content">
                <div className="upload">
                    <p>Title:</p>
                    <input type="text" ref={t} />
                    <p>Image:</p>
                    <input type="text" ref={i} />
                    <p>Description:</p>
                    <input type="text" ref={d} />
                    <button onClick={() => { uploadimg(); }}>Upload</button>
                    {
                        err === true ?
                            <p class="logerr">You have to fill the "Image" field</p> : <p class="hidden"></p>
                    }
                </div>
            </div>
        </body>
    )



}
