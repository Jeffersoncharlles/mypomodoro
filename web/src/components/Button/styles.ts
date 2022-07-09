import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface Props {
    variant: ButtonVariant;
}



export const ButtonContainer = styled.button<Props>`
    width: 100px;
    height: 40px;
    border: 0;
    border-radius: 0.25rem;
    margin: 8px;

    

    /* ${({ variant }) => {
        return css`
            background-color: }
        `
    }} */
`;