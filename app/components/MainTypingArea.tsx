import { useEffect, useRef } from "react";

interface Props {
    renderTextCharacters: () => React.JSX.Element[];
    isComplete: boolean;
    userInput: string;
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const MainTypingArea = ({
                            renderTextCharacters,
                            isComplete,
                            userInput,
                            handleInputChange
                        }: Props) => {
    const textDisplayRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const handleClick = () => {
            if (inputRef.current && !isComplete) {
                inputRef.current.focus();
            }
        };

        const textDisplay = textDisplayRef.current;
        if (textDisplay) {
            textDisplay.addEventListener("click", handleClick);
        }

        return () => {
            if (textDisplay) {
                textDisplay.removeEventListener("click", handleClick);
            }
        };
    }, [isComplete]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Prevent new lines
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };
    return (
        <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 overflow-hidden">
            <div
                ref={textDisplayRef}
                className="p-8 cursor-text min-h-[250px] bg-gray-50"
            >
                <div className="leading-loose break-all">{renderTextCharacters()}</div>

                {/* Hidden textarea for input */}
                <textarea
                    ref={inputRef}
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    disabled={isComplete}
                    className="fixed opacity-0 pointer-events-none"
                    style={{ position: "fixed", top: "-9999px", left: "-9999px" }}
                    spellCheck={false}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                />
            </div>
        </div>
    );
};

export default MainTypingArea;
