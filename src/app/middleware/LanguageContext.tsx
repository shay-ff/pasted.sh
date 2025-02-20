import { createContext, useContext, useState } from "react";

const LanguageContext = createContext<{ language: string; setLanguage: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined);

import { ReactNode } from "react";

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState("plaintext");

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
