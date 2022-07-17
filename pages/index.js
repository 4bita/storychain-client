import Head from 'next/head';

import styles from '../styles/Home.module.css';


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Story-chain app</title>
      </Head>

      <main className={styles.main}>

      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}


export const getServerSideProps = async () => {
    return {
        redirect: {
            permanent: true,
            destination: '/stories'
        }
    }
}