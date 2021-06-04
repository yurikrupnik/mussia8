import React from "react";
import Head from "next/head";
import Link from "next/link";
// import noop from "lodash/noop";
// import Button from "@perimeter81/test-button";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => (
    <div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <Link href="/dashboard">Go to dashboard and see api at work</Link>
            <h1 className={styles.title}>Welcome to Alfred</h1>

            <p className={styles.description}>
                Get started by editing
                <code className={styles.code}>pages/index.js</code>
            </p>
            {/*<Button onClick={noop}>Aris</Button>*/}
        </main>

        <footer className={styles.footer}>
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by
                <img
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    className={styles.logo}
                />
            </a>
        </footer>
    </div>
);

export default Home;
