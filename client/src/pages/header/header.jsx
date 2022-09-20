import React from 'react'
import classes from "../header/header.module.css"
import sampleData from '../../constants/data'

export default function Header() {
  return (
    <>
        <div className={classes.container}>
            <div className={classes.brand_name}>
                <span className={classes.head}>JPG</span>
                <span className={classes.middle}>to</span>
                <span className={classes.tail}>PDF</span>
            </div>
            <div>
                <div className={classes.steps}>
                    <p className={classes.desc}>{sampleData.desc}</p>
                    <ol>
                    <li>{sampleData.stepOne}</li>
                    <li>{sampleData.stepTwo}</li>
                    </ol>
                </div>
            </div>
        </div>
    </>
  )
}
