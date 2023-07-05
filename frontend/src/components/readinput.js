import React, {Fragment, useState} from "react";

const Input = () => {
    const [description, setDescription] = useState("");
    // NOTE!!!!!!!!!!!!!!!!!!!!!
    // IN ORDER FOR THIS TO RUN (when testing), you need http://localhost:PORT to be running (so use node index.js)
    
    //use proxy to shorten links (proxy is a variable defined in package.json) -- now you just need to do fetch("/todos") & not fetch("https:/localhost:5002/todos")
    // proxy is only used in development; ignored in production
    //      ie if theres no localhost:5020 (or whatever proxy is set to), itll use the heroku domain
//    heroku app is j our server saving the build static content and holding restful api
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {description};
           const response = await fetch("/todos", {
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location="/";
            console.log("JJJJ", response);
        } catch (err) {
            console.error(err.message);
        }
    }


    return (
        <Fragment>
            <h1>Input</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    type="text" 
                    placeholder="add here" 
                    value={description} 
                    onChange={e=> setDescription(e.target.value)}
                />
                <button>add</button>
            </form>
        </Fragment>
    );
}

export default Input;