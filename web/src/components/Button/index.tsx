import { ButtonContainer, ButtonVariant } from './styles'
import { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

export const Button = ({ variant = 'primary', children, ...rest }: Props) => {
  return (
    <ButtonContainer {...rest} variant={variant}>
      {children}
    </ButtonContainer>
  )
}
