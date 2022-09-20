function incNumber(num){
    return{
        type:"INCREASE",
        payload:num
    }
}

function setUploadedImages(images){
    return{
        type:"SETIMAGES",
        payload:images
    }
}

export {setUploadedImages};