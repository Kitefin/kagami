import { Box, Button, Typography } from "@mui/material"
import React from "react"
import { colors } from "../../utils/constants"

export default function WelcomeStep(props) {
  return (
    <Box style={{ textAlign: "center" }}>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            borderRadius: "50%",
            backgroundColor: colors.main,
            width: 50,
            height: 50,
            margin: "auto",
            marginTop: 20,
          }}
        />

        <Box
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography>
            Let's add wallets to create clusters and alerts
          </Typography>

          <Button
            style={{
              width: "fit-content",
              alignSelf: "center",
              marginTop: "auto",
            }}
            onClick={props.nextStep}
            variant="contained"
            color="grey"
          >
            Next Step
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
