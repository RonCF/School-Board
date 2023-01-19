export function PageNotFound(){
    function sendToHome(){
        window.location = "http://localhost:3000/"
    }
    return(
        <div>
            <h1>Page Not Found Try Going To Login Page</h1>
            <button onClick={ sendToHome }>Login</button>
        </div>
    );
}