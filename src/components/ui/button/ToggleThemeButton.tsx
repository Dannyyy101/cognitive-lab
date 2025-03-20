import sunIcon from "../../../media/sun-24.svg"
import moonIcon from "../../../media/moon-24.svg"
import Image from "next/image";
import {useTheme} from "@/components/Theme";

export const ToggleThemeButton = () => {

    const {theme, toggleTheme} = useTheme()

    const handleThemeChange = () => {

        const temp = theme === "dark" ? "light" : "dark"
        localStorage.setItem("theme", temp)
        toggleTheme()
    }

    return <button onClick={handleThemeChange}><Image className={`${theme === "dark" && "filter invert"}`}
                                                      src={theme === "dark" ? moonIcon : sunIcon} alt={"icon"}/>
    </button>
}