import styled from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 74rem; //1184px
  height: calc(100vh- 10rem); //ele vai utilizar o 100% ai tiro 10rem
  margin: 5rem auto; //margem 5rem em cima em em baixo
  padding: 2.5rem;

  background: ${({ theme }) => theme['gray-800']};
  border-radius: 8px; //normalmente e px nao rem

  display: flex;
  flex-direction: column;
`
