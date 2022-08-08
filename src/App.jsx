import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import TodoEdit from "./components/TodoEdit";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

function App() {
  const [todos, setTodos] = useState([]);
  const [insertToggle, setInsertToggle] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const nextId = useRef(4);

  const onInsert = (text) => {
    const todo = {
      id: nextId.current,
      text: text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current++;
  };

  // const inText = async (id) => {
  //   try {
  //     const data = await axios({
  //       url: `http://localhost:4000/todos/input/${id}`,
  //       method: "PATCH",
  //     });
  //     setTodos(data.data);
  //   } catch (e) {
  //     setError(e);
  //   }
  // };

  const onInsertToggle = () => {
    setInsertToggle((prev) => !prev);
  };

  const onToggle = async (id) => {
    try {
      const data = await axios({
        url: `http://localhost:4000/todos/check/${id}`,
        method: "PATCH",
      });
      setTodos(data.data);
    } catch (e) {
      setError(e);
    }
  };
  const onRemove = async (id) => {
    try {
      const data = await axios({
        url: `http://localhost:4000/todos/delete/${id}`,
        method: "DELETE",
      });
      setTodos((data) => data.filter((data) => data.id !== id));
    } catch (e) {
      setError(e);
    }
  };

  const onUpdate = async (id, text) => {
    try {
      const data = await axios({
        url: `http://localhost:4000/todos/input/${id}`,
        method: "PUT",
      });
      setTodos((data) =>
        data.map((data) => (data.id === id ? { ...data, text } : data))
      );
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: "http://localhost:4000/todos",
          method: "GET",
        });

        console.log(data.data);
        setTodos(data.data);
        setIsLoading(false);
        // throw new Error("조회중 에러발생!!");
        // await new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     resolve()
        //   }, 3000)
        // })
      } catch (e) {
        setError(e);
      }
    };

    getData();
  }, []);

  if (error) {
    return <>에러: {error.message}</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList
        todos={todos}
        onRemove={onRemove}
        onToggle={onToggle}
        onInsertToggle={onInsertToggle}
        setSelectedTodo={setSelectedTodo}
      />
      {insertToggle && (
        <TodoEdit selectedTodo={selectedTodo} onUpdate={onUpdate} />
      )}
    </TodoTemplate>
  );
}

export default App;
