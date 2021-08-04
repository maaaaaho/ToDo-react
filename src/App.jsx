import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./compornents/InputTodo";
import { IncompleteTodos } from "./compornents/IncompleteTodos";
import { CompleteTodos } from "./compornents/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");

  const [incompleteToDos, setIncompleteToDos] = useState([
    // "ああああ",
    // "いいいい"
  ]);

  const [completeToDos, setCompleteToDos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteToDos, todoText];
    setIncompleteToDos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteToDos];
    newTodos.splice(index, 1); //1：何番目の引数、2:何個
    setIncompleteToDos(newTodos);
  };

  const onClickComplete = (index) => {
    const newImcompleteTodos = [...incompleteToDos];
    newImcompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeToDos, incompleteToDos[index]];

    setIncompleteToDos(newImcompleteTodos);
    setCompleteToDos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newImcompleteTodos = [...incompleteToDos, completeToDos[index]];

    const newCompleteTodos = [...completeToDos];
    newCompleteTodos.splice(index, 1);

    setIncompleteToDos(newImcompleteTodos);
    setCompleteToDos(newCompleteTodos);
  };

  return (
    //JSX記法のため、<></>フラグメントで囲う
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteToDos.length >= 5}
      />
      {incompleteToDos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるtodo５個までだよー。消化しな。</p>
      )}

      <IncompleteTodos
        todos={incompleteToDos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeToDos} onClickBack={onClickBack} />
    </>
  );
};
