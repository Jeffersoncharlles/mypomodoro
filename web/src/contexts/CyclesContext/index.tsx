import { createContext, useState, ReactNode } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setCycleActiveId: (id: string | null) => void
  setSecondsPassed: (seconds: number) => void
  interruptCurrentCycle: () => void
  createNewCycle: (data: CreateCycleData) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export const CyclesProvider = ({ children }: { children: ReactNode }) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  // vai procurar o id que seja igual o id do ativado
  //= ==============================================================================//
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

  const interruptCurrentCycle = () => {
    setCycles(updateCycles(cycles))

    function updateCycles(cycles: Cycle[]) {
      const result = cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          // se ciclos id for igual o id do ativo
          // colocar nele o interruptedDate
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
          // se nao for igual retorna o cycle nao alterando ele
        }
      })

      return result
    }

    setCycleActiveId(null)
  }

  const createNewCycle = (data: CreateCycleData) => {
    const uid = () => {
      const head = Date.now().toString(36)
      const tail = String(Math.random().toString(36).slice(2))

      return head + tail
    }

    const newCycle: Cycle = {
      id: uid(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    // sempre que o valor do estado depende do valor anterior pego estado atual e passo ele como function

    setCycleActiveId(newCycle.id)
    setSecondsPassed(0) // reset o quando segundos se passaram
  }
  //= ==============================================================================//
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setCycleActiveId,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
