import ReactMarkdown from 'react-markdown';
import Link from "next/link";


const Story = ({ title, id, content }) => {
    return (
        <Link href={`/stories/${id}`}>
            <a className="block rounded-sm mb-3 text-gray-600 hover:text-gray-600 active:text-gray-600 visited:text-gray-600 hover:border-gray-500 !border border-gray-300 bg-white p-4">
                <h6 className="font-medium text-gray-700 mb-2">{title}</h6>
                <p className="text-gray-500">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </p>
            </a>
        </Link>
    );
};

export default Story;
