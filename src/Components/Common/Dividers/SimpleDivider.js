import React from 'react'

let dividerStyle = {
    width: "100%",
    height: "1px",
    background: "linear-gradient(to right, #ddd, #888)",
    margin: "10px 0",
    padding: "1px"
}

const SimpleDivider = () => {
  return (
    <div style={dividerStyle}></div>
  )
}

export default SimpleDivider