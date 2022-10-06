/**
 * These hooks re-implement the now removed useBlocker and usePrompt hooks in 'react-router-dom'.
 */
import {useContext, useEffect, useCallback} from 'react';
import {UNSAFE_NavigationContext as NavigationContext} from 'react-router-dom';
import {PromptContext} from "./ContextPromptProvider";

/**
 * Blocks all navigation attempts.
 * @param  blocker
 * @param  when
 * @see https://reactrouter.com/api/useBlocker
 */

export function useBlocker(blocker, when = true) {
    const {navigator} = useContext(NavigationContext);

    useEffect(() => {
        if (!when) return;

        const unblock = navigator.block((tx) => {
            const autoUnblockingTx = {
                ...tx,
                retry() {
                    // Automatically unblock the transition so it can play all the way
                    // through before retrying it. TODO: Figure out how to re-enable
                    // this block if the transition is cancelled for some reason.
                    unblock();
                    tx.retry();
                },
            };

            blocker(autoUnblockingTx);
        });


        return unblock;
    }, [navigator, blocker, when]);
}


/**
 * Prompts the user with an Alert before they leave the current screen.
 * @param  message
 * @param  when
 */

export function usePrompt(message, when = true, setShowExitPrompt) {
    const blocker = useCallback(
        (tx) => {
            // eslint-disable-next-line no-alert
            if (window.confirm(message)) tx.retry();
            setShowExitPrompt(false);
        },
        [message]
    );

    useBlocker(blocker, when);


}