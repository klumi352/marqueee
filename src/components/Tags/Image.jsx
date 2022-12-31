import React from 'react'

function Image({image,addclass}) {
  return (
    <img src={image} alt="" className={`${addclass}`} />
  )
}

export default Image