import styles from "./Header.module.css";

export function Header() {
    return (
        <header>
            <h1 className={styles.title}>todos</h1>
        </header>
    );
}
