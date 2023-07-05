import React, {Fragment, useState, useEffect} from "react";
import Edit from "./edit";

const List = () => {
    const [todos, setTodos] = useState([]);
    //delete todo func
    async function deleteTodo(id) {
        try {
            await fetch(`/todos/${id}`, {method: "DELETE"});
        } catch (err) {
            console.error(err.message);
        }

        setTodos(todos.filter(todo=>todo.id !== id));

    }


    async function getTodos() {
        const res = await fetch("/todos");
        const todoArray = await res.json();
        setTodos(todoArray);
        
    }

    useEffect(() => {
        getTodos();
    }, []);

    console.log(todos);
 
    return (
        <Fragment>
            {" "}
            <table>
                <thead>
                    <th>desc</th>
                    <th>edit</th>
                    <th>del</th>
                </thead>
                <tbody>
                   { /*<tr>
                        <th>a</th>
                        <th>sa</th>
                        <th>asd</th>
                    </tr>
                    <tr>
                        <th>asd</th>
                        <th>c</th>
                        <th>v</th>
                    </tr>
                    <tr>
                        <th>f</th>
                        <th>ln</th>
                        <th>g</th>
                    </tr>
*/}
                    {
                        todos.map(todo => (
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td><Edit /></td>
                                <td>
                                    <button
                                    onClick={()=>deleteTodo(todo.id)}
                                    >del</button>
                                </td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </Fragment>
    );
}

export default List;