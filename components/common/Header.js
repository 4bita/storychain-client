import Link from "next/link";
import MyInput from "../UI/input/MyInput";
import logo3 from './logo3.png'
import Image from "next/image";

export default function Header() {
    const links = [
        {
            href: "/stories",
            label: "Home",
        },
        {
            href: "/about",
            label: "About",
        },
        {
            href: "contacts",
            label: "Contacts",
        }
    ]

    return (
        <nav
            className="flex bg-white fixed w-full py-3 shadow-md border-b border-gray-400 top-0 z-10"
            style={{ height: '65px' }}
        >
            <div className="flex justify-between w-full sm:w-5/6 md:w-4/6 px-3 mx-auto">
                <div className="flex items-center">
                    <Link href="/stories">
                        <a className="flex items-center gap-2">
                            <Image
                                src={logo3}
                                alt="StoryChain logo"
                                className="rounded-md"
                                width={40}
                                height={40}
                                layout="fixed"
                            />
                            <span className="font-medium duration-100">StoryChain</span>
                        </a>
                    </Link>
                    <div className="hidden md:block">
                        <MyInput
                            type='text'
                            placeholder='Find a story'
                        />
                    </div>
                </div>
                <ul className="flex items-center">
                    {links.map(({ href, label }) => (
                        <li key={href} className="mr-3" style={{ letterSpacing: '0.6px' }}>
                            <Link href={href}>
                                <a className="font-medium duration-100 text-gray-500">{label}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
