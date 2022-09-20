const initialImages = [];

function imageContainer(state=initialImages, action){
    switch(action.type){
        case "SETIMAGES":
            return state = action.payload;
        default:
            return state;
    }
}

export default imageContainer;