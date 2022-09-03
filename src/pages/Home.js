import { Box, Button } from "@mui/material"
import React from "react"
import { useMoralis } from "react-moralis"
import { useNavigate } from "react-router-dom"
import CreateCluster from "../component/Cluster/CreateCluster"
import PageWrapper from "../component/PageWrapper"
import { grey } from "@mui/material/colors"

export default function Home() {
  const { isAuthenticated } = useMoralis()

  const navigate = useNavigate()
  const navigateTo = (path) => {
    navigate(path)
  }

  return (
    <PageWrapper>
      <h2>Home</h2>

      {!isAuthenticated && <div>Please connect to your wallet.</div>}

      <Box>
        <Button
          variant="contained"
          color="grey"
          onClick={() => navigateTo("/layout")}
        >
          Go to Layout
        </Button>

        <CreateCluster />
      </Box>
    </PageWrapper>
  )
}
