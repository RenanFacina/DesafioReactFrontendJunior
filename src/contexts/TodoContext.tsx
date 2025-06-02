import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { todo } from "../types/todo";
import { api } from "../services/api";

interface TodoContextType {
    todos: todo[];
    isLoading: boolean;
    setTodos: React.Dispatch<React.SetStateAction<todo[]>>;
    addTodo: (title: string) => void;
    editTodo: (id: string, newTitle: string) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
    undefined
);

export function useTodoContext() {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodoContext must be used within a TodoProvider");
    }
    return context;
}

interface Props {
    children: ReactNode;
}

export function TodoProvider({ children }: Props) {
    const [todos, setTodos] = useState<todo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    function addTodo(newTodoText: string) {
        const newTodo: todo = {
            
            id: crypto.randomUUID(),
            title: newTodoText,
            isDone: false,
        };
        setTodos((prev) => [...prev, newTodo]);
    }

    function deleteTodo(todoId: string) {
        setTodos((prev) => prev.filter((item) => item.id !== todoId));
    }

    function toggleTodo(id: string) {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    }

    function editTodo(id: string, newTitle: string) {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, title: newTitle } : todo
            )
        );
    }

    useEffect(() => {
        async function fetchTodos() {
            try {
                const response = await api.get<todo[]>("/todos");
                await new Promise((resolve) => setTimeout(resolve, 1000)); //Simular delay
                setTodos(response.data);
            } catch (error) {
                console.error("Failed to load data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTodos();
    }, []);

    return (
        <TodoContext.Provider
            value={{
                todos,
                isLoading,
                setTodos,
                addTodo,
                editTodo,
                deleteTodo,
                toggleTodo,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}
