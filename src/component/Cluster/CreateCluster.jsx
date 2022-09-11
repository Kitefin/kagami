import {
  Button,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import React, { useState } from "react"
import Modal from "../Modal/Modal"
import {
  MarginAutoBox,
  MarginTopBox,
  ModalBoxParent,
  ModalInputBox,
  ScrollBox,
} from "./Styled"

const initState = {
  name: "",
  description: "",
  walletAddress: "",
  clusterAddresses: [],
}

export default function CreateCluster({ setIsCreateModalVisible }) {
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
    <ModalBoxParent>
      <Typography variant="h6" component="h6">
        Create Cluster
      </Typography>

      <ModalInputBox>
        <Input
          placeholder="Cluster name"
          value={newCluster.name}
          onChange={(e) => setNewClusterField("name", e.target.value)}
          error={error.name}
        />

        <Input
          placeholder="Cluster Description"
          value={newCluster.description}
          onChange={(e) => setNewClusterField("description", e.target.value)}
          error={error.description}
          style={{ marginTop: 20 }}
        />

        <MarginTopBox>
          <Input
            placeholder="Add Wallet address"
            value={newCluster.walletAddress}
            onChange={(e) =>
              setNewClusterField("walletAddress", e.target.value)
            }
            error={error.clusterAddresses}
            style={{ width: "50%" }}
          />

          <IconButton color="primary" onClick={addWalletAddressToCluster}>
            <AddIcon />
          </IconButton>
        </MarginTopBox>

        <ScrollBox>
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
        </ScrollBox>

        <MarginAutoBox>
          <Button onClick={create}>Create</Button>
          <Button onClick={cancel} color="secondary">
            Cancel
          </Button>
        </MarginAutoBox>
      </ModalInputBox>
    </ModalBoxParent>
  )
}
