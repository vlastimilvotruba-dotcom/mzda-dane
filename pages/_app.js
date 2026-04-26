import '../styles/globals.css'
import '../styles/App.css'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import CookieConsent from '../components/CookieConsent/CookieConsent'

const theme = createTheme()

export default function MyApp({ Component, pageProps }) {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <CookieConsent />
      </ThemeProvider>
    </HelmetProvider>
  )
}
