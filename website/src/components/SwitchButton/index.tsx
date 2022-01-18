import styles from "./styles.module.scss";

type ButtonProps = {
  label: string;
}

export function SwitchButton(props: ButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <span>{props.label}</span>

      <label className={styles.switchButton}>
        <input type="checkbox"/>
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}