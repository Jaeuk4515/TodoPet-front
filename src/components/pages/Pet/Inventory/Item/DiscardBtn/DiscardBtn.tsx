import { ReactComponent as DiscardIcon } from "@/assets/images/trash.svg";

import { ButtonStyled } from "./DiscardBtn.styles";

interface parameterType {
    onClick(e: any): void;
}

export default function ThrowBtn({ onClick }: parameterType) {
    return (
        <ButtonStyled onClick={onClick}>
            <DiscardIcon />
        </ButtonStyled>
    );
}
