import { ThemeProvider } from "styled-components"
import { Button } from "./components/Button"
import { GlobalStyle } from "./styles/global"
import { defaultTheme } from './styles/themes/default'

export const App = () => {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <h1>hello word</h1>
      <Button title="enviar" />
      <Button title="enviar" />
      <Button title="enviar" />

    </ThemeProvider>
  )
}


