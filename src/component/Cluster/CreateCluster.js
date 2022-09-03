import {
  Box,
  Button,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core"
import AddIcon from "@mui/icons-material/Add"
import { ListItemButton } from "@mui/material"
import React, { useState } from "react"
import Modal from "../Modal"
import RemoveIcon from "@mui/icons-material/Remove"

const initState = {
  name: "",
  walletAddress: "",
  clusterAddresses: [],
}

export default function CreateCluster() {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)

  const [newCluster, setNewCluster] = useState(initState)
  const [error, setError] = useState({})

  function setNewClusterField(key, value) {
    setNewCluster({
      ...newCluster,
      [key]: value,
    })
  }

  function addWalletAddressToCluster() {
    if (!newCluster.clusterAddresses.includes(newCluster.walletAddress))
      setNewCluster({
        ...newCluster,
        walletAddress: "",
        clusterAddresses: [
          ...newCluster.clusterAddresses,
          newCluster.walletAddress,
        ],
      })
  }

  function removeFromCluster(walletAddr) {
    setNewClusterField(
      "clusterAddresses",
      newCluster.clusterAddresses.filter((addr) => addr !== walletAddr)
    )
  }

  function cancel() {
    setNewCluster(initState)
    setIsCreateModalVisible(false)
  }

  function create() {
    if (!newCluster.name || newCluster.clusterAddresses.length === 0) {
      const error = {}
      if (!newCluster.name) error.name = true
      if (newCluster.clusterAddresses.length === 0)
        error.clusterAddresses = true

      setError(error)
      return
    }

    // TODO
    console.log("Not implemented yet!")
    console.log("Creating Cluster with")
    console.log(JSON.stringify(newCluster))

    setIsCreateModalVisible(false)
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setIsCreateModalVisible(true)}
        style={{
          marginTop: 20,
          marginLeft: "20%",
          borderRadius: "50%",
          height: 200,
        }}
      >
        Create New Wallet Cluster
      </Button>

      <Modal
        open={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        height="80%"
      >
        <Box style={{ height: "100%" }}>
          <Typography variant="h6" component="h6">
            Create Cluster
          </Typography>

          <Box
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Input
              placeholder="Cluster name"
              value={newCluster.name}
              onChange={(e) => setNewClusterField("name", e.target.value)}
              error={error.name}
            />

            <Box style={{ marginTop: 20 }}>
              <Input
                placeholder="Add Wallet address"
                value={newCluster.walletAddress}
                onChange={(e) =>
                  setNewClusterField("walletAddress", e.target.value)
                }
                error={error.clusterAddresses}
              />

              <IconButton color="primary" onClick={addWalletAddressToCluster}>
                <AddIcon />
              </IconButton>
            </Box>

            <Box style={{ marginTop: 20, overflowY: "auto" }}>
              <Typography variant="h6" component="h6">
                Wallets in Cluster
              </Typography>

              <List>
                {newCluster.clusterAddresses.map((walletAddr) => {
                  return (
                    <ListItem key={walletAddr} disablePadding disableGutters>
                      <ListItemText>
                        <IconButton
                          onClick={() => removeFromCluster(walletAddr)}
                          color="primary"
                        >
                          <RemoveIcon />
                        </IconButton>{" "}
                        {walletAddr}
                      </ListItemText>
                    </ListItem>
                  )
                })}
              </List>
            </Box>

            <Box style={{ marginBottom: 20 }}>
              <Button onClick={create} color="primary">
                Create
              </Button>
              <Button onClick={cancel} color="error">
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
