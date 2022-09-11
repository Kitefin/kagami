import { Box, Typography } from "@mui/material"
import React, { useState } from "react"
import { useEffect } from "react"
import { useMoralis } from "react-moralis"
import { useNavigate } from "react-router-dom"
import CreateCluster from "../component/Cluster"
import PageWrapper from "../component/PageWrapper"
import { colors } from "../utils/constants"

export default function Welcome() {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [clusterData, setClusterData] = useState([])

  const { isAuthenticated } = useMoralis()

  const navigate = useNavigate()
  const navigateTo = (path) => {
    navigate(path)
  }

  useEffect(() => {
    setTimeout(() => {
      if (clusterData.length === 0) {
        setIsCreateModalVisible(true)
      }
    }, 2000)
  }, [])

  return (
    <PageWrapper>
      <CreateCluster {...{ isCreateModalVisible, setIsCreateModalVisible }} />

      <Typography variant="h3">Available Clusters</Typography>
    </PageWrapper>
  )
}
