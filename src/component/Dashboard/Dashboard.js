import React from "react"
import mainImg from "../../assets/img/main.png"

function Dashboard() {
  var w = window.innerWidth

  return (
    <div className="content-center">
      <img src={mainImg} alt="main image" height={w / 2} width="100%" />
    </div>
  )
}

export default Dashboard
