import React from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

const Results = props => {

    let data = props.posts;

    let posts = data.map(post => {
        let rawdata = JSON.parse(post);
        let contentState = convertFromRaw(rawdata);
        let editorState = EditorState.createWithContent(contentState, null);
   
        return (
            <div className="editor" key={rawdata.blocks[0].key}>
                <Editor editorState={editorState}  />
            </div>
        )  
     });

    return (
        <div>
            {posts}
        </div>
    )
}

export default Results;