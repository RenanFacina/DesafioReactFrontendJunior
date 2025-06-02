import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { TodoProvider } from "./contexts/TodoContext";

export default function Router() {
    return (
        <TodoProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App filter="all" />} />
                    <Route path="/active" element={<App filter="active" />} />
                    <Route
                        path="/completed"
                        element={<App filter="completed" />}
                    />
                </Routes>
            </BrowserRouter>
        </TodoProvider>
    );
}
