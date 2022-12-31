import React from 'react'
import { Link } from 'react-router-dom'

function LogoMain({image,addClass}) {
  return (
    <Link to='/'><img src={image} alt="" className={`${addClass}`} /></Link>
  )
}

export default LogoMain