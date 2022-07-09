import { ButtonContainer, ButtonVariant } from './styles'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  title: string
}

export const Button = ({ variant = 'primary', title, ...rest }: Props) => {
  return (
    <ButtonContainer {...rest} variant={variant}>
      {title}
    </ButtonContainer>
  )
}
