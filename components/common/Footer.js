export default function Footer({ position }) {
    console.log(position)
    const footerClasses = `text-center bg-gradient text-black mt-5 ${position}`
    console.log(footerClasses)
    return (
        <footer className={ footerClasses } style={{backgroundColor: '#dbefdb'}}>
            <div className="container p-4 pb-0">
                <section className="mb-4">

                    <a className="btn btn-outline-dark btn-floating mx-3" href="#!" role="button">
                        <i className="fab fa-youtube"></i>
                    </a>

                    <a className="btn btn-outline-dark btn-floating mx-3" href="#!" role="button">
                        <i className="fab fa-facebook"></i>
                    </a>

                    <a className="btn btn-outline-dark btn-floating mx-3" href="#!" role="button">
                        <i className="fab fa-github" />
                    </a>
                </section>
            </div>

            <div className="text-center p-3" style={{backgroundColor: '#cdd9cd'}}>
                © 2022 Copyright 4bita Corp
            </div>
        </footer>
    );
}