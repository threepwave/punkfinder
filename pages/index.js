import useSWR from 'swr'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, error } = useSWR('/api/punks', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>Punks</title>
        <meta name="description" content="Info on punks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Latest offers
        </h1>
        <ul>
          {data.map((p, index) => {
            return(
            <li key={index}>
              <a href={p.url} target="_blank">
                <img src={p.img} className={styles.punk} />
                <p><strong>#{p.id}</strong></p>
                <p>{p.offer}Ξ</p>
                <p>{p.date}</p>
              </a>
            </li>)
          })}
        </ul>

        <p className={styles.description}>
          Get recent offers on a specific type of punk
        </p>

        <div className={styles.grid}>
            <h2>Time</h2>
            <p>Last 'n' days</p>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Price</h2>
            <p>HIGH to LOW</p>
          </a>

          <div className={styles.description}>
            Attributes: +
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        by @threepwave
      </footer>
    </div>
  )
}
