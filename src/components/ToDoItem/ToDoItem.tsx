import { useEffect, useRef, useState } from "react";
import { todo } from "../../types/todo";
import styles from "./ToDoItem.module.css";
import { useTodoContext } from "../../contexts/TodoContext";

interface ToDoItemProps {
    item: todo;
}

export function ToDoItem({ item }: ToDoItemProps) {
    const { editTodo, deleteTodo, toggleTodo } = useTodoContext();

    const [newText, setNewText] = useState<string>(item.title);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            const input = inputRef.current;
            input.focus();

            const length = input.value.length;
            input.setSelectionRange(length, length);
        }
    }, [isEditing]);

    useEffect(() => {
        setNewText(item.title);
    }, [item.title]);

    function handleDeleteTodo() {
        if (!item.id) {
            return;
        }
        deleteTodo(item.id);
    }

    function handleBlur() {
        setIsEditing(false);
        setNewText(item.title);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            editTodo(item.id, newText);
            setIsEditing(false);
        }
    }

    function handleEditTodo() {
        setIsEditing(true);
    }

    return (
        <li
            className={`${styles["todo-item"]} ${
                item.isDone && styles.completed
            }`}
        >
            <div>
                {isEditing ? (
                    <input
                        type="text"
                        className={styles["editing-todo"]}
                        onBlur={handleBlur}
                        onKeyDown={(e) => handleKeyDown(e)}
                        onChange={(e) => setNewText(e.target.value)}
                        value={newText}
                        ref={inputRef}
                    />
                ) : (
                    <>
                        <input
                            className={styles.toggle}
                            type="checkbox"
                            checked={item.isDone}
                            onChange={() => toggleTodo(item.id)}
                        />
                        <label onDoubleClick={handleEditTodo}>
                            {item.title}
                        </label>
                        <button
                            className={styles["delete"]}
                            onClick={handleDeleteTodo}
                        ></button>
                    </>
                )}
            </div>
        </li>
    );
}
