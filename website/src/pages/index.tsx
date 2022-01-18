import Head from "next/head";
import { Card } from "../components/Card";
import { SwitchButton } from "../components/SwitchButton";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <div className={styles.homepage}>
      <Head>
        <title>Bit</title>
      </Head>

      <Card title="Portas Digitais">
        <SwitchButton label="Digital 1"/>
        <SwitchButton label="Digital 2"/>
        <SwitchButton label="Digital 3"/>
        <SwitchButton label="Digital 4"/>
      </Card>
    </div>
  );
}
