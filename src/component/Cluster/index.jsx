import Modal from "../Modal/Modal"
import React from "react"
import Wizard from "./Wizard"

export default function index({
  isCreateModalVisible,
  setIsCreateModalVisible,
}) {
  return (
    <Modal
      open={isCreateModalVisible}
      onClose={() => setIsCreateModalVisible(false)}
      height="80%"
    >
      <Wizard setIsCreateModalVisible={setIsCreateModalVisible} />
    </Modal>
  )
}
