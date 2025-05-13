import { useState } from "react";

type Props = {
    description: string;
};

export default function DescriptionToggle({ description }: Props) {
    const [showMore, setShowMore] = useState<boolean>(false);
    const toggle = () => setShowMore(prev => !prev);
    const shouldTruncate = description?.length > 300;

    const visibleText = showMore || !shouldTruncate
        ? description
        : description.slice(0, 300) + "...";

    const linkified = visibleText?.split(/(\s+)/).map((part, idx) => {
        const isUrl = /https?:\/\/[^\s]+/.test(part);
        return isUrl ? (
            <>
                <a key={idx}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                >
                    {part}
                </a>
                <br />
            </>
        ) : (
            <span key={idx}>{part}</span>
        );
    });

    return (
        <div className="mt-2 text-sm text-gray-300">
            <p className="inline">{linkified}</p>
            {shouldTruncate && (
                <button
                    className="text-blue-400 hover:underline ms-2"
                    onClick={toggle}
                >
                    {showMore ? "See Less" : "See More"}
                </button>
            )}
        </div>
    );
}
