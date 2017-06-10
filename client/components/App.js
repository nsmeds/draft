import React from 'react';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});
        this.logState = () => console.log(this.state.editorState.toJS());
    }
    render() {
        return (
            <div className="root">
                <div className="editor" onClick={this.focus}>
                    <Editor 
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        placeholder="Enter some text"
                        ref="editor"
                    />
                </div>
                <input
                    onClick={this.logState}
                    className="button"
                    type="button"
                    value="Log State"
                />
            </div>
        );
    }
}