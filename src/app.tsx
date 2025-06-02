import { ToDoInput } from "./components/ToDoInput/ToDoInput";
import { ToDoList } from "./components/ToDoList/ToDoList";
import "./global.css";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

interface AppProps {
    filter: "all" | "active" | "completed";
}

export function App({ filter }: AppProps) {
    return (
        <div className={styles.wrapper}>
            <Header />
            <section className={styles.main}>
                <ToDoInput />
                <ToDoList filter={filter} />
            </section>
            <Footer />
        </div>
    );
}
