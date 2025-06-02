import { Link, useLocation } from "react-router-dom";
import { ToDoItem } from "../ToDoItem/ToDoItem";
import styles from "./ToDoList.module.css";
import { useTodoContext } from "../../contexts/TodoContext";

interface ToDoListProps {
    filter: string;
}

export function ToDoList({ filter }: ToDoListProps) {
    const location = useLocation();
    const { todos, setTodos } = useTodoContext();

    const activeTodos = todos.filter((item) => !item.isDone);
    const hasCompletedTodo = todos.find((item) => item.isDone);
    const allCompleted = todos.length > 0 && todos.every((todo) => todo.isDone);

    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.isDone;
        if (filter === "completed") return todo.isDone;
        return true;
    });

    function handleToggleAll() {
        const allCompleted = todos.every((todo) => todo.isDone);

        const updatedTodos = todos.map((todo) => ({
            ...todo,
            isDone: !allCompleted,
        }));

        setTodos(updatedTodos);
    }

    function handleClearCompleted() {
        setTodos(
            todos.filter((item) => {
                return !item.isDone;
            })
        );
    }

    return (
        <>
            {todos.length > 0 && (
                <div>
                    <input
                        id="toggle-all"
                        type="checkbox"
                        className={styles["toggle-all"]}
                        checked={allCompleted}
                        onChange={handleToggleAll}
                    />
                    <label htmlFor="toggle-all">Toggle All Input</label>
                </div>
            )}

            <ul>
                {filteredTodos.reverse().map((item, index) => (
                    <ToDoItem key={index} item={item} />
                ))}
            </ul>

            {todos.length > 0 && (
                <div className={styles.summary}>
                    <span className={styles.counter}>
                        {activeTodos.length}{" "}
                        {activeTodos.length > 1 ? "items" : "item"} left!
                    </span>

                    <ul className={styles.filters}>
                        <li>
                            <Link
                                to="/"
                                className={
                                    location.pathname === "/"
                                        ? styles.selected
                                        : ""
                                }
                            >
                                All
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/active"
                                className={
                                    location.pathname === "/active"
                                        ? styles.selected
                                        : ""
                                }
                            >
                                Active
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/completed"
                                className={
                                    location.pathname === "/completed"
                                        ? styles.selected
                                        : ""
                                }
                            >
                                Completed
                            </Link>
                        </li>
                    </ul>

                    <button
                        className={styles["clear-completed"]}
                        disabled={!hasCompletedTodo}
                        onClick={handleClearCompleted}
                    >
                        Clear Completed
                    </button>
                </div>
            )}
        </>
    );
}
