import React from 'react'
import classes from  "../body/body.module.css"
import Card from '../../components/card'

export default function Body() {
  return (
    <>
        <div className={classes.container}>
            <div className={classes.buttons}>
                <button>PDF to DOC</button>
                <button>DOC to PDF</button>
                <button>PDF to JPG</button>
                <button>JPG to PDF</button>
                <button>PDF to PNG</button>
                <button>PNG to PDF</button>
                <button>PDF to Comress</button>
                <button>Conbine PDF</button>
            </div>
        </div>
        <Card />
    </>
  )
}
