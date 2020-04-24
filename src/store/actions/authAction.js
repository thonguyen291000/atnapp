import firebase from 'firebase/app'

export const signIn = (credentials) => {
  return ( dispatch, getState) => {
    
    //const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS'})
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err})
    })

  }
}

export const signOut = () => {
  return (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
      dispatch({type: "SIGNOUT_SUCCESS"})
    })
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((res) => {
      return firestore.collection("users").doc(res.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0],
        shopName: newUser.shopName
      })
    }).then(() => {
      dispatch({type: "SIGNUP_SUCCESS"})
    }).catch((err) => {
      dispatch({type: "SIGNUP_ERROR", err})
    })
  }
}

export const updateUser = (userData) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection("users").doc(userData.id).set({
      firstName: userData.firstName,
      lastName: userData.lastName,
      initials: userData.firstName[0] + userData.lastName[0],
      shopName: userData.shopName
    })
    .then(() => {
      dispatch({ type: "UPDATE_USER" });
    })
    .catch((err) => {
      console.log(err)
      dispatch({ type: "UPDATE_USER_FAILED", error: err });
    })
  }
}