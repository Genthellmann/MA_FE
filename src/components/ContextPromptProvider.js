import React from 'react';
import {ProjectContext} from "./ProjectContextProvider";
import ExitPrompt from "./ExitPrompt";

export const PromptContext = React.createContext();

export function ContextPromptProvider({children}) {

    const [showExitPrompt, setShowExitPrompt] = ExitPrompt(false);

    return (
        <PromptContext.Provider value={{showExitPrompt, setShowExitPrompt}}>
            {children}
        </PromptContext.Provider>
    );
}

