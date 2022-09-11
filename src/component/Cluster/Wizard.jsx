import React from "react"
import StepWizard from "react-step-wizard"
import CreateCluster from "./CreateCluster"
import WelcomeStep from "./WelcomeStep"

export default function Wizard({ setIsCreateModalVisible }) {
  return (
    <StepWizard>
      <WelcomeStep />

      <CreateCluster setIsCreateModalVisible={setIsCreateModalVisible} />
    </StepWizard>
  )
}
