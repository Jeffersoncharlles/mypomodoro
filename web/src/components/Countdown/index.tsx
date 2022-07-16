import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { CountdownContainer, Separator } from './styles'

/**
 * Prop Drilling = Quando a gente tem muitas props apenas para comunicação entre components
 * Resolve usando Context API => que permite compartilhar inf entre vários components ao mesmo tempo
 */

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  //= =============================LOGICA COUNTDOWN =========================//

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

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds) // colocar ele no total de segundos atual que nesse caso e 0
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference) // setar a diferença da data atual com a data que ele começou
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
      // limpando o interval
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])
  //= =============================================================================================//

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`
    // criando um title com countdown
  }, [activeCycle, minutes, seconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
