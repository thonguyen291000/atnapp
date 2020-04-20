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
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>Loading Screen...</div>; //handle loading page
      return children
}

ReactDOM.render(<Provider store={store}><ReactReduxFirebaseProvider {...rrfProps}><AuthIsLoaded><App /></AuthIsLoaded></ReactReduxFirebaseProvider></Provider>, document.getElementById('root'));


serviceWorker.unregister();
