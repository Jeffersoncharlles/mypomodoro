import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

// extrair a tipagem criada pelo typescript
type ThemeType = typeof defaultTheme

// criando uma tipagem para o modulo do styled
// como so quero sobrescrever algo por isso eu importo e declaro
// se nao importa eu crio do zero os tipos do styled component
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
  // vou extender a interface defaultTheme com a interface de tema criada por mim
}
