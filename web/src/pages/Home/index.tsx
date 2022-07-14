import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { HandPalm, Play } from 'phosphor-react'

import { useContext, useState } from 'react'
import { NewCycleForm } from '../../components/NewCycleForm'
import { Countdown } from '../../components/Countdown'
import { CyclesContext, CyclesProvider } from '../../context/CyclesContext'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

/**
 * controller = manter em tempo real o state dentro do estado
 * resumindo = controlar pelo useState
 * //formulários mais simples
 *
 * uncontrolled = buscar a informação do valor do input so quando precisamos dela
 * usando coisas do próprio javascript
 * resumindo = colocar uma função handleSubmit e pegar pelo event.target.task.value
 * task vendo da tag name="task"
 * //formulários mas complexos mas de 100 inputs
 */

/**
 * register retorna {onChange, onBlur,onFocus... etc}
 * */

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // type of e para usar uma variável javascript

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const { setSecondsPassed, setCycleActiveId, activeCycleId, activeCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const handleCreateNewCycle = (data: NewCycleFormData) => {
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
    reset()
  }

  //= =============================LOGICA COUNTDOWN =========================//

  const isDisabledButton = !watch('task')

  const handleInterruptCycle = () => {
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

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesProvider>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CyclesProvider>

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isDisabledButton} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
