import React from 'react';
import FileSystem from 'systems/FileSystem.js';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import './Code.css';


export default class CodeEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: null,
			mode: null
		};
        this.watcher = null;
	}
	
    componentWillMount() {}
    componentDidMount() {
        if(this.props.path)
		{
			this.guessMode();
			this.watcher = FileSystem.watch(this.props.path);
			FileSystem.read(this.props.path).then(::this.handleRead);
		}
    }
    
    componentWillUnmount() {
        if(this.watcher)
        {
            FileSystem.unwatch(this.watcher);
            this.watcher = null;
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.path !== this.props.path)
        {
            if(this.props.path) FileSystem.unwatch(this.watcher);
            this.watcher = nextProps.path? FileSystem.watch(nextProps.path) : null;
        }
    }
    
	componentWillUpdate(nextProps, nextState) {}
	componentDidUpdate(prevProps, prevState) {}
	
	guessMode() {
		if(this.props.path.endsWith('.html')) this.setState({ mode: 'htmlmixed' });
		else if(this.props.path.endsWith('.css')) this.setState({ mode: 'css' });
		else if(this.props.path.endsWith('.js')) this.setState({ mode: 'javascript' });
		else this.setState({ mode: 'null' });
	}
	
	handleRead(content) {
		this.setState({ content });
	}
	
	handleEdit(newCode) {
		this.watcher.pause();
		FileSystem.write(this.props.path, newCode).then(() => this.watcher.resume());
	}
	
	render() {
        if(!this.props.path) return (
            <div className="editor"/>
        );
		
		if(this.state.content == null) return (
			<div className="editor"/>
		);
		
		return (
			<CodeMirror
				className="editor"
                value={this.state.content || ''}
                onChange={::this.handleEdit}
                options={{
                    lineNumbers: true,
                    mode: this.state.mode
                }}
            />
		);
	}
}
