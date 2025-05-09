import { useEffect, useState } from "react";

import { CalendarViewWeekSharp, GridOnSharp, ViewCozyOutlined, ViewStreamOutlined, ViewWeekOutlined } from "@mui/icons-material";

interface Props {
    onChange: (cols: number) => void;
}

const ColumnSwitcher = ({ onChange }: Props) => {
    const [screen, setScreen] = useState<"mobile" | "md" | "lg">("lg");
    const [selected, setSelected] = useState<number>(5);

    const updateScreen = () => {
        const width = window.innerWidth;
        if (width < 768) setScreen("mobile");
        else if (width < 1024) setScreen("md");
        else setScreen("lg");
    };

    // Get available options for columns based on the screen size
    const getOptions = (scr: typeof screen) => {
        switch (scr) {
            case "lg": return [3, 4, 5];
            case "md": return [2, 3];
            case "mobile": return [1, 2];
        }
    };

    // Get corresponding icons based on selected columns
    const getIcons = (cols: number) => {
        switch (cols) {
            case 5: return <CalendarViewWeekSharp />;
            case 4: return <GridOnSharp />;
            case 3: return <ViewWeekOutlined />;
            case 2: return <ViewCozyOutlined />;
            case 1: return <ViewStreamOutlined />;
            default: return <ViewStreamOutlined />;
        }
    };

    // Detect screen on mount
    useEffect(() => {
        updateScreen();
        window.addEventListener("resize", updateScreen);
        return () => window.removeEventListener("resize", updateScreen);
    }, []);

    // Set default column on screen change (based on max value)
    useEffect(() => {
        const options = getOptions(screen);
        const defaultCol = Math.max(...options);
        setSelected(defaultCol);
        onChange(defaultCol);
    }, [screen]);

    return (
        <div className="flex justify-end gap-2 mt-4">
            {getOptions(screen).map((col) => (
                <button
                    key={col}
                    onClick={() => {
                        setSelected(col);
                        onChange(col);
                    }}
                    className={`lg:p-4 md:p-3 p-2 rounded ${selected === col && "bg-gray-800 text-white"}`}
                >
                    {getIcons(col)}
                </button>
            ))}
        </div>
    );
};

export default ColumnSwitcher;
