import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  // useState that updates the state with the value of the input field url
  const [url, setUrl] = useState("");
  // usestate for time taken
  const [timeTaken, setTimeTaken] = useState(false);
  // useEffect that hits the API and returns how long it took to get the data
  const [submit, setSubmit] = useState("false");

  function handleClick(e) {
    setSubmit("true");
  }

  // styling for input field

  useEffect(() => {
    if (submit) {
      // calculate how long it took the api to get the data
      const start = new Date().getTime();
      fetch(url)
        .then((res) => res.json())
        .then(
          (data) => {
            const end = new Date().getTime();
            const time = end - start;
            setTimeTaken(time);
            setSubmit(false);
          }
          // if the url is invalid, display an error message
        )
        .catch((err) => {
          console.log("error");
        });
    }
  }, [submit]);

  return (
    <div className={styles.container}>
      <Head>
        <title>How Long to Load API</title>
        <meta
          name="description"
          content="Quickly see how long it took for an API request to load with a simple interface"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>How Long to Load an API?</h1>

        <p className={styles.description}>
          Simple interface to check how long an API request takes in
          milliseconds
        </p>
        <p>Just enter your API Endpoint in below</p>

        <div className={styles.grid}>
          {/* input text field that takes in a url */}
          <input
            className={styles.input}
            type="text"
            placeholder="Enter a URL"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          {/* button that takes in the url and onSubmit updates state with input url value */}
          <button className={styles.button} onClick={handleClick}>
            GET
          </button>

          {/* add a breakline */}
          <br />

          {/* div card showcasing time */}
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h3>Time Taken</h3>
              <p>{timeTaken}ms</p>
            </div>
          </div>

          {/* div that shows the loading time */}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
