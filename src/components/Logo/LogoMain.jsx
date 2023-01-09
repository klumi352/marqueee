import React from 'react'
import { Link } from 'react-router-dom'

function LogoMain({image,addClass}) {
  return (
  <img src={image} alt="" className={`${addClass}`} />
  )
}

export default LogoMain