import {
    ButtonContainer, ButtonVariant,
} from './styles'


interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    title: string;
}

export const Button = ({ variant = 'primary', title, ...rest }: Props) => {

    return (
        <ButtonContainer {...rest} variant={variant}>
            {title}
        </ButtonContainer>
    );
}