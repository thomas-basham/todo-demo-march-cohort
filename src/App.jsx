import { useState, useEffect } from "react";
import { scanTodos, createTodo } from "./utils/dynamo";
import { IoTrashOutline } from "react-icons/io5";
import { HiOutlinePencilSquare } from "react-icons/hi2";

function App() {
  const [todos, setTodos] = useState([]); // the array where scanCommand will save the information
  const [text, setText] = useState(""); // string that is representing the text that you want to save in the table
  const [todoToEdit, setTodoToEdit] = useState({});

  // The useEffect hook is called every time the component is showed to the user
  // onload event on html
  useEffect(() => {
    async function getTodos() {
      const scanned = await scanTodos();
      setTodos(scanned);
    }

    getTodos();
  }, []);

  const changeHandlerText = (event) => {
    const data = event.target.value;
    setText(data);
  };

  const handleCreateTodo = async () => {
    const createdTodo = await createTodo(text);

    setTodos([...todos, createdTodo]);
    setText("");
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => {
      return todo.id != id;
    });

    setTodos(filteredTodos);
  };

  const updateTodo = () => {
    const filteredTodos = todos.filter((todo) => {
      return todoToEdit.id != todo.id;
    });

    setTodos([...filteredTodos, todoToEdit]);
    setTodoToEdit({});
  };

  return (
    <>
      <div className="todo-div">
        <h1>Todo App</h1>
        <input
          value={text}
          onChange={changeHandlerText}
          style={{ marginRight: 8 }}
        />

        <button onClick={() => handleCreateTodo()}>Send Data</button>

        <ul style={{ marginTop: 16 }}>
          {todos.map((todoElem) =>
            todoToEdit?.id === todoElem.id ? (
              <div>
                <input
                  value={todoToEdit.Text}
                  onChange={(event) =>
                    setTodoToEdit({
                      id: todoToEdit.id,
                      Text: event.target.value,
                      isComplete: todoToEdit.isComplete,
                    })
                  }
                  type="text"
                  name="edit-input"
                  id="edit-input"
                />
                <button onClick={() => updateTodo()}> Submit</button>
              </div>
            ) : (
              <li key={todoElem.id}>
                {todoElem.Text}{" "}
                <HiOutlinePencilSquare
                  onClick={() => setTodoToEdit(todoElem)}
                />
                <IoTrashOutline
                  className="delete-btn"
                  onClick={() => deleteTodo(todoElem.id)}
                />
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
