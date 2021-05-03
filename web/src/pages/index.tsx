import Head from "next/head";
import { SwitchButton } from "../components/SwitchButton";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <div className={styles.homepage}>
      <Head>
        <title>Untitled Controller</title>
      </Head>

      <SwitchButton />
    </div>
  );
}
