const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase)
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

const createNotification = (notification) => {
    return admin.firestore().collection("notifications").add(notification).then(doc => console.log("Added new notification", doc))
}

exports.projectCreated = functions.firestore.document("projects/{projectId}").onCreate(doc => {
    const project = doc.data();
    const notification = {
        content: "posted a saling result",
        user: `${project.authLastName} ${project.authFirstName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification)
})

exports.commentCreated = functions.firestore.document("comments/{commentId}").onCreate(doc => {
    const comment = doc.data();
    const notification = {
        content: "a comment",
        user: `${comment.sender} send to ${comment.receiver}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification)
})

exports.userJoined = functions.auth.user().onCreate(user => {
    return admin.firestore().collection("users").doc(user.uid).get()
    .then(doc => {
        const newUser = doc.data();
        const notification = {
            content: "registered successully!",
            user: `${newUser.lastName} ${newUser.firstName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification)
    })
})


