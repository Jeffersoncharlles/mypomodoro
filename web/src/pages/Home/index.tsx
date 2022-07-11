import {
  HomeContainer,
  CountdownContainer,
  FormContainer,
  Separator,
  StartCountDownButton,
  TaskInput,
  MinutesAmountInput,
} from './styles'
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from 'react'

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
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // type of e para usar uma variável javascript

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { handleSubmit, register, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  const uid = () => {
    const head = Date.now().toString(36)
    const tail = String(Math.random().toString(36).slice(2))

    return head + tail
  }

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const newCycle: Cycle = {
      id: uid(),
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle])
    // sempre que o valor do estado depende do valor anterior pego estado atual e passo ele como function

    setActiveCycleId(newCycle.id)
    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  // vai procurar o id que seja igual o id do ativado

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  // se eu tiver activeCycle vai ser os minutes dela vezes 60

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  // se eu tiver ativo vai ser o total de segundos menos os segundos que ja passou

  const minutesAmount = Math.floor(currentSeconds / 60)
  // pego o total de segundo e divido por 60
  // ele arredonda para baixo pq sempre vai ter pq o outro minuto falta sempre alguns segundos para dar
  // números de minutos que existe nos meus segundos

  const secondsAmount = currentSeconds % 60
  // pegando os resto dos segundos
  // quantos segundos sobram que nao cabem em uma divisão

  const minutes = String(minutesAmount).padStart(2, '0')
  // padStart  = ele preenche uma string ate um tamanho se ela nao tiver eu vou incluir 0 ate completar 2 caracteres

  const seconds = String(secondsAmount).padStart(2, '0')

  const isDisabledButton = !watch('task')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou Trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountDownButton disabled={isDisabledButton} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
