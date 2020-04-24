import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducer/rootReducer';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk'
import { reduxFirestore, createFirestoreInstance, getFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase, isLoaded} from 'react-redux-firebase'
import firebase from 'firebase/app'
import fbConfig from "./config/fbConfig"

//UI Stuff
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import themeFile from './config/theme';
const theme = createMuiTheme(themeFile);

const styles = makeStyles((theme) => ({
  pageLoading:{
      position: 'absolute',
      marginLeft: '50%',
      marginTop: '20%'
  }
}));

const store = createStore(rootReducer, 
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(fbConfig)
));

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

 const rrfProps = {
      firebase,
      config: rrfConfig,
      dispatch: store.dispatch,
      createFirestoreInstance // <- needed if using firestore
    }

function AuthIsLoaded({ children }) {
  const classes = styles();
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div className={classes.pageLoading}><CircularProgress size={50} /></div>; //handle loading page
      return children
}

ReactDOM.render(<MuiThemeProvider theme={theme}><Provider store={store}><ReactReduxFirebaseProvider {...rrfProps}><AuthIsLoaded><App /></AuthIsLoaded></ReactReduxFirebaseProvider></Provider></MuiThemeProvider>, document.getElementById('root'));


serviceWorker.unregister();
