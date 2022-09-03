import { Button } from "@material-ui/core"
import React from "react"
import { useMoralis } from "react-moralis"
import { useNavigate } from "react-router-dom"
import CreateCluster from "../component/Cluster/CreateCluster"
import PageWrapper from "../component/PageWrapper"

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

      <div>
        <Button
          variant="contained"
          onClick={() => navigateTo("/layout")}
          style={{ marginTop: 20 }}
        >
          Go to Layout
        </Button>

        <CreateCluster />
      </div>
    </PageWrapper>
  )
}
