import React, { useEffect, useState } from 'react'
import classes from '../core-ui/card.module.css'
import Axios from "axios";
import {saveAs} from "file-saver";


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {} from "@fortawesome/free-brands-svg-icons"
import {faArrowAltCircleUp, faCircleXmark, faCircleRight, faCircleLeft} from "@fortawesome/free-regular-svg-icons"
import DragAndDrop from './draganddrop'
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setUploadedImages} from "../actions/index";


export default function Card() {

  const myState =  useSelector((state)=>state.imageContainer);
  const dispatch = useDispatch();


  const [allimages, updateAllImages] = useState(null);

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
      dispatch(setUploadedImages(response.data));
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
    
},[allimages]);


useEffect(()=>{
  const  fetchData = async()=>{
    const response = await Axios.get("/getfiles");
    dispatch(setUploadedImages(response.data));
  }
  fetchData();
},[]);

function combine(){

  let allPath = [];
  
  myState.map((path)=>{
      allPath.push(path.file);
      return null;
  })

  const saveFile = () => {
    saveAs(
        "http://localhost:3001/download",
      "example.pdf"
    );
}

  const combineData = async()=>{
    await Axios.post("/combine",{paths:allPath});
    saveFile();
  }

  combineData();

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

  function clearQueue(){
    const clearQueueExecution = async()=>{
      const response = await Axios.post("/deleteall",{filepaths:myState});
      console.log(response.data);
      dispatch(setUploadedImages([]));
    }
    clearQueueExecution();
  }


  return (
    <>
        <div className={classes.container}>
            <div className={classes.card}>
                <div className={classes.buttons}>
                  <button className={classes.upload_btn}  onClick={(e)=>{uploadFile(e)}}>
                  <FontAwesomeIcon className={classes.upload_icon} icon={faArrowAltCircleUp}/>
                  <p>UPLOAD FILES</p>
                  </button>
                  <input id="upload-file" multiple type='file' accept=".jpg" onChange={addImage} />
                  <button disabled={myState.length>0?false:true} className={classes.clear_btn} onClick={()=>{clearQueue()}}>
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
                    myState.length > 0
                    ?
                    <div className={classes.carousel} id="carousel">
                    <DragAndDrop/>
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
                <div disabled={myState.length>0?false:true} className={classes.counter}>
                  <h4>{myState.length}</h4>
                </div>
                <button disabled={myState.length>0?false:true} className={classes.combine_btn} onClick={(e)=>{combine()}}>
                  <FontAwesomeIcon className={classes.combine_icon} icon={faCircleXmark} />
                  <p>COMBINE</p>
                </button>
                </div>
            </div>
        </div>
    </>
  )
}
