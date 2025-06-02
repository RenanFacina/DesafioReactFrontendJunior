import { FormEvent, useState } from "react";
import styles from "./ToDoInput.module.css";
import { useTodoContext } from "../../contexts/TodoContext";

export function ToDoInput() {
    const { addTodo, isLoading } = useTodoContext();

    const [newTodoText, setNewTodoText] = useState("");

    function handleCreateNewTodo(e: FormEvent) {
        e.preventDefault();

        if (newTodoText.length < 2 || !newTodoText.trim()) {
            return;
        }

        addTodo(newTodoText);
        setNewTodoText("");
    }

    return (
        <form onSubmit={handleCreateNewTodo}>
            <input
                className={styles["todo-input"]}
                type="text"
                placeholder="What needs to be done?"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                disabled={isLoading}
                autoFocus
            />
        </form>
    );
}
