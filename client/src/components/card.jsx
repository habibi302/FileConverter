import React, { useEffect, useState } from 'react'
import classes from '../core-ui/card.module.css'
import Axios from "axios";


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {} from "@fortawesome/free-brands-svg-icons"
import {faArrowAltCircleUp, faCircleXmark, faCircleRight, faCircleLeft} from "@fortawesome/free-regular-svg-icons"
import DragAndDrop from './draganddrop'
import ReactDOM from 'react-dom';


export default function Card() {

  const [allimages, updateAllImages] = useState(null);
  const [uploadedImages, setUploadedImages] = useState(null);

function uploadFile(e){
  const node = document.getElementById("upload-file");
  const a = ReactDOM.findDOMNode(node);
  a.click();
}

async function addImage(e){
  updateAllImages(e.target.files);
}

useEffect(()=>{
  if(allimages != null){
    const formData = addImageToForm(allimages);
    
    const fetchData = async()=>{
      const response = await Axios.post('/upload',formData);
      setUploadedImages(response.data);
    }

    if(!formData.entries().next().done){
      fetchData();
    }
    console.log("Clicked!");
    }

    
  
    function addImageToForm(images){
      const formData = new FormData();
        
      var i = 0;
      if(images!== null){
        for(i;i<images.length;i++){
          formData.append('image',images[i]);
        }
      }

        return formData;
    }
});


function combine(){
  Axios.get("/combine").then(res=>{
    console.log(res.data);
  })
}

  function goRight(e){
      const node = document.getElementById("carousel")
      const a = ReactDOM.findDOMNode(node);
      a.scrollLeft +=138;
    }

  function goLeft(e){
    const node = document.getElementById("carousel")
      const a = ReactDOM.findDOMNode(node);
      a.scrollLeft -=138;
  }


  return (
    <>
        <div className={classes.container}>
            <div className={classes.card}>
                <div className={classes.buttons}>
                  <button className={classes.upload_btn}  onClick={(e)=>{uploadFile(e)}}>
                  <FontAwesomeIcon className={classes.upload_icon} icon={faArrowAltCircleUp}/>
                  <p>UPLOA FILES</p>
                  </button>
                  <input id="upload-file" multiple type='file' accept=".jpg" onChange={addImage} />
                  <button className={classes.clear_btn}>
                  <FontAwesomeIcon className={classes.clear_icon} icon={faCircleXmark} />
                  <p>CLEAR QUEUE</p>
                  </button>
                </div>
                
                <div className={classes.file_container}>

                  <div className={classes.left_anguler_box}>
                  <FontAwesomeIcon className={classes.left_anguler} icon={faCircleLeft} onClick={(e)=>{goLeft(e)}} />
                  </div>
                  
                  <div style={true?{border: "none", opacity: "1"}:{}} className={classes.drop_area}>
                  {
                    uploadedImages
                    ?
                    <div className={classes.carousel} id="carousel">
                    <DragAndDrop images={uploadedImages}/>
                    </div>
                    :
                    <h1>Drop Your Files Here</h1>
                  }
                  </div>
                  <div className={classes.right_anguler_box}>
                  <FontAwesomeIcon className={classes.right_anguler} icon={faCircleRight}  onClick={(e)=>{goRight(e)}} />
                  </div>
                </div>

                <div className={classes.combine_btn_container}>
                <div className={classes.counter}>
                  <h4>0</h4>
                </div>
                <button className={classes.combine_btn} onClick={(e)=>{combine()}}>
                  <FontAwesomeIcon className={classes.combine_icon} icon={faCircleXmark} />
                  <p>COMBINE</p>
                </button>
                </div>
            </div>
        </div>
    </>
  )
}
