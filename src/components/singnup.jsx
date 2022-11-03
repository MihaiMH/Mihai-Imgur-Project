import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [uid, setUid] = useState();
    const [logerr, setLogerr] = useState("");
    const logtxt = useRef("");
    const pass = useRef("");
    const [errtxt, setErrTxt] = useState("");


    const navigate = useNavigate();
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    let account = JSON.parse(sessionStorage.getItem("account")) || {};

    function getAcc(acc) {
        let ok = true;
        console.log(accounts);
        console.log(acc);
        accounts.map((account) => { if (account.username === acc.username) { ok = false; console.log(ok); return false; } })
        return ok;
    }

    function checkLog() {
        if (logtxt.current.value !== "" && pass.current.value !== "") {
            setLogerr(false);
            let acc;
            if (accounts.length === 0) {
                acc = {
                    id: 0,
                    username: logtxt.current.value,
                    pass: pass.current.value
                }
            } else {
                acc = {
                    id: accounts[accounts.length - 1].id + 1,
                    username: logtxt.current.value,
                    pass: pass.current.value
                }
            }
            if (getAcc(acc) === true) {
                accounts = [...accounts, acc];
                localStorage.setItem('accounts', JSON.stringify(accounts));
                sessionStorage.setItem("account", JSON.stringify(acc));
                console.log(acc);
                console.log(accounts);
                navigate('/');
            }
            else {
                setErrTxt("This username already exists");
                setLogerr(true);
            }
        } else {
            setErrTxt("Every field must be completed!");
            console.log(accounts);
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
                    <button onClick={() => { navigate('/login'); }}>Log In</button>
                </div>

            </div>

            <div className="content">
                <div className="upload">
                    <div className="login-cont">
                        <h1>Sign Up</h1>
                        <p>Username: </p>
                        <input type="text" ref={logtxt} />
                        <p>Password: </p>
                        <input type="password" ref={pass} />
                        <button onClick={() => { checkLog(); }}>Sign up</button>
                        {
                            logerr === true ?
                                <p class="logerr">{errtxt}</p> : <p class="hidden"></p>
                        }
                        <p>Already have an account? Log In now!</p>
                    </div>
                    <div className="login-btns">
                        <button onClick={() => { navigate('/'); }}>Go Home</button>
                        <button onClick={() => { navigate('/login'); }}>Log In</button>
                    </div>
                </div>
            </div>
        </body>
    )


}

