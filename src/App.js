import "./styles.css"
import { useMoralis } from "react-moralis"
import Dashboard from "./component/Dashboard/Dashboard"
import Header from "./component/Header/Header"
import Layout from "./component/Layout/Layout"
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"

export default function App() {
  const { isAuthenticated } = useMoralis()

  //   const location = useLocation()
  //   const navigate = useNavigate()

  //   if (!isAuthenticated && location.pathname && location.pathname !== "/") {
  //     console.log("HERE")
  //     navigate("")
  //   }
  //   console.dir(location)

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/layout" element={<Layout />}></Route>
      </Routes>
    </div>
  )
}
