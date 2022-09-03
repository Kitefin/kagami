import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core"
import React from "react"
import { useMoralis } from "react-moralis"
import { useNavigate } from "react-router-dom"
import { colors } from "../../utils/constants"
import "./header.css"

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
      // className="header-bar"
      style={{ backgroundColor: colors.main }}
    >
      <Toolbar>
        <Grid
          justifyContent="space-between" // Add it here :)
          container
        >
          <Grid item>
            <IconButton
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            >
              <Typography
                variant="h6"
                sx={{ flexGrow: 1 }}
                style={{
                  color: "white",
                  fontSize: "1.6rem",
                  padding: 0,
                  margin: 0,
                  // fontFamily: "Phosphate-Inline",
                }}
                // className="logo-title"
              >
                KAGAMI
              </Typography>
            </IconButton>
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
