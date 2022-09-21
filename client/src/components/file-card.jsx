import React from 'react'
import classes from "../core-ui/file-card.module.css"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {} from "@fortawesome/free-brands-svg-icons"
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons"

import imageFile from "../assets/images/photo.jpg"


export default function FileCard(props) {
  return (
    <>
        <div className={classes.container}>
            <FontAwesomeIcon className={classes.cross_icon} icon={faCircleXmark} onClick={()=>{props.deletePhotofn(props.index)}} />
            <img className={classes.image} itemID={props.id} src={"/images/"+props.src} alt='document'/>
        </div>
    </>
  )
}


FileCard.defaultProps={
  id: "1",
  src: imageFile
}
