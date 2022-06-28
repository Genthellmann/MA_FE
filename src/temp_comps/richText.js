import React, {useCallback, useRef, useState} from 'react';
import {EditorState, Editor as DraftEditor, RichUtils} from 'draft-js';

function RichText(props) {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    // const onEditorStateChange = useCallback(
    //     (rawcontent) => {
    //         setEditorState(rawcontent.blocks[0].text);
    //     },
    //     [editorState]
    // );

    const onChange = editorState =>{
        setEditorState(editorState);
    }

    const handleKeyCommand = (command, editorState)=>{
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            // onEditorStateChange(newState);
            onChange(newState)
            return 'handled';
        }

        return 'not-handled';
    }
    return (
        <div>
            <div style={styles.EditorWrapper}>
                {/*<Toolbar*/}
                {/*editorState={editorState}*/}
                {/*updateEditorState={onEditorStateChange}></Toolbar>*/}
            </div>
            <div style={styles.EditorContainer}>
                <DraftEditor
                placeholder="Explore your way in..."
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                // onChange={onEditorStateChange}
                onChange={setEditorState}
                // customStyleFn={customStyleFn}
                >

                </DraftEditor>
            </div>
        </div>
    );
}

export default RichText;

const styles ={
    EditorWrapper:{
        minWidth: '700px',
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        marginTop: '3em',
    },
    EditorContainer:{
        display: 'flex',
        height: '9em',
        minHeight:  '9em',
        borderRadius: '0 0 3px 3px',
        backgroundColor: '#fff',
        padding: '5px',
        fontSize: '17px',
        fontWeight: 300,
        boxShadow: '0px 0px 3px 1px rgba(15, 15, 15, 0.17)',
    }
}