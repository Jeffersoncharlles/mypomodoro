import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme['gray-100']};
  }
`
export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: max(100%, 600px);
    border-collapse: collapse; //se eu colocar borda ele so vai pegar 1 e nao de dois elementos
    /* width: 100%;
    min-width: 600px; */

    th {
      background-color: ${({ theme }) => theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${({ theme }) => theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        //selecionar a primeira th
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        //selecionar a ultima th
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${({ theme }) => theme['gray-700']};
      border-top: 4px solid ${({ theme }) => theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        //selecionar a primeira th
        width: 50%; //ocupar mas espaço
        padding-left: 1.5rem;
      }
      &:last-child {
        //selecionar a ultima th
        padding-right: 1.5rem;
      }
    }
  }
`
