import { createContext, ReactNode, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setCycleActiveId: (id: string | null) => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export const CyclesProvider = ({ children }: { children: ReactNode }) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  // vai procurar o id que seja igual o id do ativado

  const markCurrentCycleAsFinished = () => {
    setCycles((states) =>
      states.map((cycle) => {
        if (cycle.id === activeCycleId) {
          // se ciclos id for igual o id do ativo
          // colocar nele o finishedDate
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
          // se nao for igual retorna o cycle nao alterando ele
        }
      }),
    )
  }

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const setCycleActiveId = (cycleId: string | null) => {
    setActiveCycleId(cycleId)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setCycleActiveId,
        setSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
