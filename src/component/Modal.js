import { Box, Modal as MUIModal } from "@material-ui/core"
import React from "react"
import { colors } from "../utils/constants"

export default function Modal({ onClose, open, children, height }) {
  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxHeight: "80%",

    background: colors.modalBg,
    borderRadius: 4,
    boxShadow: 24,
    padding: 40,
  }

  if (height) {
    boxStyle.height = height
  }

  return (
    <MUIModal open={open} onClose={onClose}>
      <Box style={boxStyle}>{children}</Box>
    </MUIModal>
  )
}
