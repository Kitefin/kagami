import { Button } from "@material-ui/core"
import React from "react"
import { useNavigate } from "react-router-dom"
import mainImg from "../../assets/img/main.png"

function Dashboard() {
  var w = window.innerWidth

  const navigate = useNavigate()
  const navigateTo = (path) => {
    navigate(path)
  }

  return (
    <div className="content-center">
      <Button
        variant="contained"
        onClick={() => navigateTo("/layout")}
        style={{ marginTop: 20 }}
      >
        Go to Layout
      </Button>

      <img src={mainImg} alt="main image" height={w / 2} width="100%" />
    </div>
  )
}

export default Dashboard
