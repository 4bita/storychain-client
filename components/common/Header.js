import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";


export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#dbefdb'}}>
            <a href="#" className="navbar-brand m-lg-3">
                <Image
                    src={logo}
                    width={50}
                    height={50}
                />
            </a>
            <ul className="navbar-nav navbar-brand ms-auto pe-5 me-lg-5">
                <li className="nav-item active me-3">
                    <Link href="/stories">
                        <a className="nav-link">Home</a>
                    </Link>
                </li>
                <li className="nav-item me-3">
                    <Link href="/about">
                        <a className="nav-link">About us</a>
                    </Link>
                </li>
                <li className="nav-item me-3">
                    <Link href="/contacts">
                        <a className="nav-link">Contacts</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}