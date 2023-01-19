import React, { useRef } from 'react';

export function Login(){
    let username  = useRef();
    let password  = useRef();

    async function entergradebook(e){
        e.preventDefault();

        let usernameValue = username.current.value;
        let passwordValue = password.current.value;

        const response = await fetch('http://127.0.0.1:8000/login/?' + new URLSearchParams({
            username: usernameValue,
            password: passwordValue
        }));

        const json = await response.json();
        
        if(!response.ok) {
            alert(json.message);
        }

        else{
            let name = json.data.name + " " + json.data.last_name;
            window.location = `http://localhost:3000/classes/${json.data.classes}/${name}/${json.data.username}/${json.data.user_type}`;
        }
    }


    return (
        <div>
            <h1>Login To GradeBook</h1>
            <input placeholder="Enter Username..." ref={ username } required/>
            <input placeholder="Enter Password..." ref={ password } type="password" required/>
            <button onClick={ entergradebook }>Go</button>
            <a href="http://localhost:3000/signup">Don't Have An Account? Sign Up!</a>
        </div>
    )
}
