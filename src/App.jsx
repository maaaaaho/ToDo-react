import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./compornents/InputTodo";

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
      />
      <div className="incomplete-area">
        <p className="title">未完了のToDo</p>
        <ul>
          {/* mapを使うときはkey必須 */}
          {incompleteToDos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                {/* 関数内で引数を渡すときは、アロー関数で書かないと全実行される */}
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のToDo</p>
        <ul>
          {completeToDos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
