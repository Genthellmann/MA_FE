import React, {useEffect, useState} from 'react';

const initBeforeUnLoad = (showExitPrompt) => {
    window.onbeforeunload = (event) => {
        // Show prompt based on state
        console.log(event)
        if (showExitPrompt) {
            const e = event || window.event;
            e.preventDefault();
            if (e) {
                e.returnValue = ''
            }
            return '';
        }
    };
};

//Hook
function ExitPrompt(bool) {
    const [showExitPrompt, setShowExitPrompt] = useState(bool);

    // Initialize the beforeunload event listener after the resources are loaded
    window.onload = function () {
        initBeforeUnLoad(showExitPrompt);
    };

    // Re-Initialize the onbeforeunload event listener
    useEffect(() => {
        initBeforeUnLoad(showExitPrompt);
    }, [showExitPrompt]);

    return (
        [showExitPrompt, setShowExitPrompt]
    );
}

export default ExitPrompt;