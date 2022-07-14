import { ThemeProvider } from 'styled-components'
import { CyclesProvider } from './contexts/CyclesContext'
import { Router } from './router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <CyclesProvider>
        <Router />
      </CyclesProvider>
    </ThemeProvider>
  )
}
