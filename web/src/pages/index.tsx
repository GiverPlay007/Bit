import Head from "next/head";
import { Card } from "../components/Card";
import { SwitchButton } from "../components/SwitchButton";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <div className={styles.homepage}>
      <Head>
        <title>Untitled Controller</title>
      </Head>

      <Card title="Digital">
        <SwitchButton label="D1"/>
        <SwitchButton label="D2"/>
        <SwitchButton label="D3"/>
        <SwitchButton label="D4"/>
      </Card>
    </div>
  );
}
