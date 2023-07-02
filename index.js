const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")
// TODO: download nodemon (quality of life thing)
const POST = 5002;

// middleware
app.use(cors());
app.use(express.json());

//ROUTES

//get all todos
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message);
    }
});
//get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]); // $1 is like ? in cs50 sql
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//update todo
app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [description, id]);
        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
    }
});
//delete a todo
app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);
        res.json("deleted");
    } catch (err) {
        console.error(err.message);
    }
})
// create a todo
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
             [description]
        );
        
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


// postgres set to listen on 5050
app.listen(POST, () => {
    console.log(`hosting on port ${POST} bru`);
});

