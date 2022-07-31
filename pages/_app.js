import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../styles/globals.css';

import AppContext from "../components/AppContext";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

import { initUserContext } from '../lib/init';


function App({ Component, pageProps }) {
    const [appContext, setAppContext] = useState(null);
    useEffect(() => {
        initUserContext(setAppContext).catch(console.error);
    }, []);

    const { asPath } = useRouter();

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header />

            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-8 align-self-center">
                        <AppContext.Provider value={appContext}>
                            <Component {...pageProps} />
                        </AppContext.Provider>
                    </div>
                </div>
            </div>

            <Footer position={ asPath.startsWith('/stories') ? '' : 'fixed-bottom' }/>
        </>
    );
}

export default App;
