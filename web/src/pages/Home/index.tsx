import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { useContext } from 'react'
import { NewCycleForm } from '../../components/NewCycleForm'
import { Countdown } from '../../components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

//= ==========================================================//
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})
//= ==========================================================//
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // type of e para usar uma variável javascript
//= ==========================================================//

export const Home = () => {
  const { interruptCurrentCycle, createNewCycle, activeCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const handleOnSubmit = (data: NewCycleFormData) => {
    createNewCycle(data)
    reset()
  }

  const isDisabledButton = !watch('task')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountDownButton onClick={interruptCurrentCycle} type="button">
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
