import { createContext, useState, ReactNode, useReducer } from 'react'
import { ActionTypes, cyclesReducers } from '../../reducers/cycles'

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
  setSecondsPassed: (seconds: number) => void
  interruptCurrentCycle: () => void
  createNewCycle: (data: CreateCycleData) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export const CyclesProvider = ({ children }: { children: ReactNode }) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducers, {
    cycles: [],
    activeCycleId: null,
  })

  const { activeCycleId, cycles } = cyclesState

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  // vai procurar o id que seja igual o id do ativado
  //= ==============================================================================//
  const markCurrentCycleAsFinished = () => {
    dispatch(
      dispatch({
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
        payload: {
          activeCycleId,
        },
      }),
    )
  }

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const interruptCurrentCycle = () => {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId,
      },
    })
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

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    })
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
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
