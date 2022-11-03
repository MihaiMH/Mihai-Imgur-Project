import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef } from "react";



export default function Edit() {
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    let account = JSON.parse(sessionStorage.getItem("account")) || {};
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let { pid } = useParams();

    const navigate = useNavigate();
    let postx = posts.filter((post) => parseInt(post.id) === parseInt(pid))[0];
    let aut = accounts.filter((accountx) => parseInt(accountx.id) === parseInt(postx.author))[0];

    const [err, setErr] = useState(false);


    const [tit, setTit] = useState(postx.title);
    const [im, setImg] = useState(postx.image);
    const [desc, setDesc] = useState(postx.description);

    const t = useRef();
    const i = useRef();
    const d = useRef();
    function uploadimg() {
        if (i.current.value !== "") {
            console.log("not err");
            setErr(false);
            let post = {
                id: postx.id,
                title: t.current.value,
                image: i.current.value,
                description: d.current.value,
                author: postx.author
            };

            posts[posts.indexOf(postx)] = post;
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
                    <input type="text" ref={t} value={tit} onChange={(e) => { setTit(e.target.value) }} />
                    <p>Image:</p>
                    <input type="text" ref={i} value={im} onChange={(e) => { setImg(e.target.value) }} />
                    <p>Description:</p>
                    <input type="text" ref={d} value={desc} onChange={(e) => { setDesc(e.target.value) }} />
                    <button onClick={() => { uploadimg(); }}>Upload</button>
                    {
                        err === true ?
                            <p class="logerr">You need fill the "Image" field</p> : <p class="hidden"></p>
                    }
                </div>
            </div>
        </body>
    )
}