// import 'todomvc-app-css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';

render(
    <AppContainer component={Root}/>,
    document.body
);


if(module.hot)
{
    module.hot.accept('./containers/Root', () => {
        render(
            <AppContainer component={require('./containers/Root').default}/>,
            document.body
        );
    });
}
