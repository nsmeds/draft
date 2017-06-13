import React from 'react';
import { Editor, EditorState, ContentState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import Results from './Results';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            data: {
                posts: []
            }
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});
        this.logState = () => console.log(this.state.editorState.toJS());
    }

    handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    handleSubmit = event => {
        let rawdata = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
        let posts = this.state.data.posts.concat([rawdata]);
        this.setState({
            data: {
                posts: posts,
            }
        });
        const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
        this.setState({
            editorState
        })
    }


    render() {
        return (
            <div className="root">
                <div>
                    <h2>Draft.js example</h2>
                    <div className="editor" onClick={this.focus}>
                        <Editor 
                            editorState={this.state.editorState}
                            onChange={this.onChange}
                            handleKeyCommand={this.handleKeyCommand}
                            placeholder="Enter some text"
                            ref="editor"
                        />
                    </div>
                    <input
                        onClick={this.handleSubmit}
                        className="button"
                        type="button"
                        value="Submit"
                    />
                </div>
                <Results {...this.state.data}/>
            </div>
        );
    }
}