import Head from "next/head";
import { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../styles/globals.css';

import { ServerContext } from "../components/AppContext";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import { initServerContext } from '../lib/init';


function App({ Component, pageProps }) {
    const [serverContext, setServerContext] = useState(null);

    useEffect(() => {
        initServerContext(setServerContext).catch(console.error);
    }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header />

            <main className="container" style={{ minHeight: "86vh", paddingTop: '85px' }}>
                <div className="row justify-content-md-center">
                    <div className="col-sm-12 col-md-8 align-self-center">
                        <ServerContext.Provider value={serverContext}>
                            <Component {...pageProps} />
                        </ServerContext.Provider>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default App;
