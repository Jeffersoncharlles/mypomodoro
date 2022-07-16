import { ActionTypes } from './actions'
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const cyclesReducers = (state: CyclesState, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      // return {
      //   ...state, // copia tudo que tem la
      //   cycles: [...state.cycles, action.payload.newCycle], // muda o que quero mudar
      //   activeCycleId: action.payload.newCycle.id,
      // }

      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      // return {
      //   ...state, // copia tudo que tem la
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, interruptedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }), // muda o que quero mudar
      //   activeCycleId: null,
      // }

      return produce(state, (draft) => {
        const currentCycleIndex = draft.cycles.findIndex((cycle) => {
          return cycle.id === draft.activeCycleId
        })
        if (currentCycleIndex < 0) {
          return draft
        }

        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.activeCycleId) {
      //       return { ...cycle, finishedDate: new Date() }
      //     } else {
      //       return cycle
      //     }
      //   }), // muda o que quero mudar
      //   activeCycleId: null,
      // }

      return produce(state, (draft) => {
        const currentCycleIndex = draft.cycles.findIndex((cycle) => {
          return cycle.id === draft.activeCycleId
        })
        if (currentCycleIndex < 0) {
          return draft
        }

        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })

    default:
      return state
  }
}
