import styles from "./Footer.module.css";

export function Footer() {
    return (
        <footer className={styles.footer}>
            <p>Double-click to edit a todo</p>
            <p>Created by the TodoMVC Team</p>
            <p>
                Part of <a href="http://todomvc.com">TodoMVC</a>
            </p>
        </footer>
    );
}
