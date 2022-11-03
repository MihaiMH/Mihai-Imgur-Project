import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setUid] = useState();
    const [logerr, setLogerr] = useState("");
    const logtxt = useRef("");
    const pass = useRef("");


    const navigate = useNavigate();
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    let account = JSON.parse(sessionStorage.getItem("account")) || {};

    function getAcc(acc) {
        let ok = false;
        console.log(accounts);
        console.log(acc);
        accounts.map((account) => { if (account.pass === acc.pass && account.username === acc.username) { setUid(account.id); ok = true; } console.log(ok); })
        return ok;
    }

    function checkLog() {
        let acc = {
            id: null,
            username: logtxt.current.value,
            pass: pass.current.value
        }
        if (getAcc(acc) === true) {
            acc.id = uid;
            sessionStorage.setItem("account", JSON.stringify(acc));
            console.log(acc);
            console.log(accounts);
            console.log(acc.id);
            navigate('/' + acc.id.toString());
        } else {
            console.log("err");
            setLogerr(true);
        }

    }

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
                    <button onClick={() => { navigate('/' + account.id); }}>Home</button>
                    <button onClick={() => { navigate('/signup'); }}>Sign Up</button>
                </div>

            </div>
            <div className="content">
                <div className="upload">
                    <div className="login-cont">
                        <h1>Log In</h1>
                        <p>Username: </p>
                        <input type="text" ref={logtxt} />
                        <p>Password: </p>
                        <input type="password" ref={pass} />
                        <button onClick={() => { checkLog(); }}>Log In</button>
                        {
                            logerr === true ?
                                <p class="logerr">Wrong password or username</p> : <p class="hidden"></p>
                        }
                        <p>Don't have an account? Register one now!</p>
                    </div>
                    <div className="login-btns">
                        <button onClick={() => { navigate('/'); }}>Go Home</button>
                        <button onClick={() => { navigate('/signup'); }}>Sign Up</button>

                    </div>
                </div>
            </div>
        </body>
    )


}

