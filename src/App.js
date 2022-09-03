import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Dashboard from "./component/Dashboard/Dashboard"
import Header from "./component/Header/Header"
import Layout from "./component/Layout/Layout"
import Home from "./pages/Home"
import "./styles.css"

export default function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/layout" element={<Layout />}></Route>
      </Routes>
    </div>
  )
}
