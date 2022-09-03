import { createTheme } from "@mui/material/styles"
import { grey, green, deepOrange } from "@mui/material/colors"
import { colors } from "./constants"

const theme = createTheme({
  palette: {
    primary: {
      main: colors.main,
    },
    secondary: {
      main: "#00b0ff",
    },
    grey: {
      main: grey[300],
    },
    green: {
      main: green[400],
    },
    deepOrange: {
      main: deepOrange[400],
    },
  },
})

export default theme
