import { ReactNode } from "react";
import styles from "./styles.module.scss";

type CardProps = {
  title: string;
  children: ReactNode;
}

export function Card(props: CardProps) {
  return (
    <div className={styles.card}>
      <h1>{props.title}</h1>
      
      <div className={styles.items}>
      { props.children }
      </div>
    </div>
  );
}