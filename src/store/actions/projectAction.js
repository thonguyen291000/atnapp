export const createProject = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authId = getState().firebase.auth.uid;
        firestore.collection("projects").add({
            ...project,
            authFirstName: profile.firstName,
            authLastName: profile.lastName,
            authId: authId,
            shopName: profile.shopName,
            createAt: new Date()
        }).then(
            dispatch({type: "CREATE_PROJECT", project: project})
        ).catch((err) => {
            dispatch({type: "CREATE_PROJECT_ERR", err: err})
        })  
    }
}

export const createComment = (comment) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        firestore.collection("comments").add({
            ...comment,
            sender: profile.shopName,
            createAt: new Date()
        }).then(
            dispatch({type: "CREATE_COMMENT", comment})
        ).catch((err) => {
            dispatch({type: "CREATE_COMMENT_ERR", err: err})
        })  
    }
}