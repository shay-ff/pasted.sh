import { createContext, useContext, useState } from 'react';

export const codeContext = createContext<{ code: string; setCode: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined);

import { ReactNode } from 'react';

export function CodeProvider({ children }: { children: ReactNode }) {
    const [code, setCode] = useState('');

    return (
        <codeContext.Provider value={{ code, setCode }}>
            {children}
        </codeContext.Provider>
    );
}

export function useCode() {
    return useContext(codeContext);
}