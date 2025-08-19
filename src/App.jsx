import { useState, useEffect } from "react";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "Todo";

function App() {
  const [todos, setTodos] = useState([]); // the array where scanCommand will save the information
  const [text, setText] = useState(""); // string that is representing the text that you want to save in the table

  const scanTodos = async () => {
    try {
      const command = new ScanCommand({ TableName: TABLE_NAME });
      const response = await docClient.send(command);
      console.log(response);
      setTodos(response.Items);
    } catch (err) {
      console.log(err.message);
    }
  };

  const createTodo = async () => {
    const item = {
      id: Date.now().toString(),
      Text: text,
      IsComplete: false,
    };

    const command = new PutCommand({ TableName: "Todo", Item: item });
    const response = await docClient.send(command);

    setTodos([...todos, item]);
    console.log(response);
  };

  // The useEffect hook is called every time the component is showed to the user
  // onload event on html
  useEffect(() => {
    scanTodos();
  }, []);

  const changeHandlerText = (event) => {
    const data = event.target.value;
    setText(data);
  };

  return (
    <>
      <div>
        <h1>Todo App</h1>
        <input
          value={text}
          onChange={changeHandlerText}
          style={{ marginRight: 8 }}
        />

        <button onClick={createTodo}>Send Data</button>

        <ul style={{ marginTop: 16 }}>
          {todos.map((t) => (
            <li key={t.id}>{t.Text}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
