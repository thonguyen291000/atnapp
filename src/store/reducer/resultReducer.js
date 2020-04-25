const initState = {
    projects: 
        [
            {id: 1, title: "Project 1", body: "Body 1"},
            {id: 2, title: "Project 2", body: "Body 2"},
            {id: 3, title: "Project 3", body: "Body 3"},
            {id: 4, title: "Project 4", body: "Body 4"}
        ]
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_PROJECT":
            return state
        case "CREATE_PROJECT_ERROR":
            return state
        case "CREATE_COMMENT":
            return state
        case "CREATE_COMMENT_ERROR":
            return state
        default:
            return state
    }
}

export default projectReducer