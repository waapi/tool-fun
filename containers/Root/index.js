import React from 'react';
import 'css/fonts.css';
import 'css/Root.css';
import 'css/App.css';
import Services from 'systems/Services.js';
import NotificationCenter from 'react-notification-center';
import 'css/notification-center.css';
import Preview from 'components/Preview/Page.js';
import Editor from 'components/Editor/Code.js';


export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasServiceWorker: null
        };
    }
    
    componentDidMount() {
        Services.ready
        .then(::this.handleRegistered)
        .catch(::this.handleFailure);
    }
    
    handleRegistered() {
        this.setState({ hasServiceWorker: true });
    }
    
    handleFailure(err) {
        console.error(err);
        this.setState({ hasServiceWorker: false });
    }
    
    render() {
        if(this.state.hasServiceWorker === null) return (
            <div className="app-init">
                Initialising App
            </div>
        );
        
        else if(this.state.hasServiceWorker === false) return (
            <div className="app-init">
                Failed to register Service Worker
            </div>
        );
        
        else if(this.state.hasServiceWorker === true) return (
            <div className="app-root editor-layout">
                <header className="global">
                    <NotificationCenter
                        notificationTitle={'Notifications'}
                        noNotificationText={'🌤'}
                    />
                    <button className="primary is-active">
                        Sources
                    </button>
                    <button className="primary">
                        Animations
                    </button>
                    <button className="primary">
                        Preview
                    </button>
                </header>
                <div className="columns">
                    <div className="column left">
                        <Preview path="/foo.html"/>
                        <Editor path="/foo.html"/>
                    </div>
                    <div className="column right">
                        <Editor path="/foo.css"/>
                    </div>
                </div>
            </div>
        );
    }
}
