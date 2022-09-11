import CampaignIcon from "@mui/icons-material/Campaign"
import GrainIcon from "@mui/icons-material/Grain"
import PanToolIcon from "@mui/icons-material/PanTool"
import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import React from "react"
import { useMoralis } from "react-moralis"
import PageWrapper from "../component/PageWrapper"
import { colors } from "../utils/constants"

export default function Landing() {
  const { isAuthenticated } = useMoralis()

  return (
    <PageWrapper>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          margin: "auto",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3" color="text.secondary" sx={{ width: 250 }}>
            Monitoring <span style={{ color: colors.main }}>Clusters</span> of
            Wallets
          </Typography>

          <Box style={{ display: "flex", marginLeft: 50 }}>
            <div
              style={{
                borderRadius: "50%",
                backgroundColor: colors.main,
                width: 50,
                height: 50,
                marginTop: 20,
              }}
            />
            <div
              style={{
                borderRadius: "50%",
                backgroundColor: colors.main,
                width: 150,
                height: 150,
              }}
            />
            <div
              style={{
                borderRadius: "50%",
                backgroundColor: colors.main,
                width: 70,
                height: 70,
                margin: "50px 0px 0px 10px",
              }}
            />
          </Box>
        </Box>

        {!isAuthenticated && (
          <Stack direction="row" spacing={2} style={{ marginTop: 50 }}>
            <Card>
              <CardContent style={{ textAlign: "center", paddingTop: 25 }}>
                <GrainIcon style={{ color: colors.main, fontSize: 50 }} />

                <Typography
                  sx={{ fontSize: 14, marginTop: 3 }}
                  color="text.secondary"
                >
                  Nominate a cluster
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent style={{ textAlign: "center", paddingTop: 25 }}>
                <PanToolIcon style={{ color: colors.main, fontSize: 50 }} />

                <Typography
                  sx={{ fontSize: 14, marginTop: 3 }}
                  color="text.secondary"
                >
                  Set policies and limits
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent style={{ textAlign: "center", paddingTop: 25 }}>
                <CampaignIcon style={{ color: colors.main, fontSize: 50 }} />

                <Typography
                  sx={{ fontSize: 14, marginTop: 3 }}
                  color="text.secondary"
                >
                  Notify when these are exceeded
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        )}
      </Box>
    </PageWrapper>
  )
}
