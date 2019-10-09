import React from 'react'
//gif
import SpinnerGif from '../../img/spinner.gif';

export default function Spinner() {
  return (
    <div>
      <img src={SpinnerGif}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..." />
    </div>
  )
}
