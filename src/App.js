import { useMoralis } from "react-moralis"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./component/Dashboard/Dashboard"
import Header from "./component/Header/Header"
import Layout from "./component/Layout/Layout"
import Landing from "./pages/Landing"
import Welcome from "./pages/Welcome"
import "./styles.css"

export default function App() {
  const { isAuthenticated } = useMoralis()

  //   const location = useLocation()
  //   const navigate = useNavigate()

  //   useEffect(() => {
  //     if (!isAuthenticated && location.pathname && location.pathname !== "/") {
  //       console.log("HERE", isAuthenticated)
  //       return navigate("/")
  //     }
  //     console.dir(location)
  //   }, [location, isAuthenticated])

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Welcome /> : <Landing />}
        ></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/layout" element={<Layout />}></Route>
      </Routes>
    </div>
  )
}
