import { useRef } from 'react';

export function Signup(){
    let username  = useRef();
    let password  = useRef();
    let name = useRef();
    let lastname = useRef();
    let type = useRef();

    async function entergradebook(e){
        e.preventDefault();

        let usernameValue = username.current.value;
        let passwordValue = password.current.value;
        let nameValue = name.current.value;
        let lastnameValue = lastname.current.value;
        let typeValue = type.current.value;


        const response = await fetch('http://127.0.0.1:8000/adduser/', { 
                method: 'POST',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({ 
                    username: usernameValue,
                    password: passwordValue,
                    name: nameValue.charAt(0).toUpperCase() + nameValue.slice(1),
                    lastname: lastnameValue.charAt(0).toUpperCase() + lastnameValue.slice(1),
                    type: typeValue

                })
            });

        const json = await response.json();
        
        if(!response.ok) {
            alert(json.message);
        }
        
        else{
            alert(json.message);
            window.location = "http://localhost:3000/grades"
        }
        

        
    }


    return (
        <form onSubmit={ entergradebook }>
            <h1>Sign Up To GradeBook</h1>
            <input placeholder="Enter A Username..." ref={ username } required/>
            <input placeholder="Enter A Password..." ref={ password } type="password" required/>
            <input placeholder="Enter Your Name..." ref={ name } required/>
            <input placeholder="Enter Your Last Name..." ref={ lastname } required/>
            <select ref={ type }>
                <option>Student</option>
                <option>Teacher</option>
                <option>Admin</option>
            </select>
            <button type="submit">Sign Up</button>
            <a href="http://localhost:3000/">Already Have An Account? Login In!</a>
        </form>
    )
}
