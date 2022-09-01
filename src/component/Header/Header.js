import React from "react"
import { useMoralis } from "react-moralis"
import { Button, AppBar, Toolbar, Grid } from "@material-ui/core"

import "./header.css"
import { colors } from "../../utils/constants"
import { useNavigate } from "react-router-dom"

var userAddress
function Header() {
  const { authenticate, isAuthenticated, user, logout } = useMoralis()
  if (isAuthenticated) {
    userAddress = user.get("ethAddress")
  }

  const navigate = useNavigate()

  const connectBtn = (
    <Button
      variant="contained"
      className="header-connect-btn"
      onClick={() => authenticate({ signingMessage: "Connect to Kagami" })}
    >
      <b>CONNECT</b>
    </Button>
  )

  const disconnectBtn = (
    <Button
      variant="contained"
      className="header-disconnect-btn "
      onClick={() => logout()}
    >
      <b>DISCONNECT</b>
    </Button>
  )

  return (
    <AppBar
      position="static"
      className="header-bar"
      style={{ backgroundColor: colors.main }}
    >
      <Toolbar>
        <Grid
          justifyContent="space-between" // Add it here :)
          container
        >
          <Grid
            item
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <span className="logo-title">KAGAMI</span>
          </Grid>

          <Grid item>
            <div className="header-btn">
              {isAuthenticated ? disconnectBtn : connectBtn}
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
