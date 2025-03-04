import {Dispatch, RefObject, SetStateAction, useEffect, useState} from "react";

export function useClickedOutside<T extends HTMLElement>(ref: RefObject<T | null>, initialVisible: boolean = false): [boolean, Dispatch<SetStateAction<boolean>>] {
    const [visible, setVisible] = useState<boolean>(initialVisible);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return (): void => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return [visible, setVisible]
}