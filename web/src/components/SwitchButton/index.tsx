import styles from "./styles.module.scss";

export function SwitchButton() {
  return (
    <label className={styles.switchButton}>
      <input type="checkbox"/>
      <span className={styles.slider}></span>
    </label>
  );
}