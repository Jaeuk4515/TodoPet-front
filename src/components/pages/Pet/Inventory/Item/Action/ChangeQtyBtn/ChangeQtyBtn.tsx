import { ButtonStyled } from "./ChangeQtyBtn.styles";

import { ReactComponent as IncreaseIcon } from "@/assets/icons/increase.svg";
import { ReactComponent as DecreaseIcon } from "@/assets/icons/decrease.svg";

interface ChangeQtyBtnProps {
    modalType: "useModal" | "discardModal";
    operationType: "increase" | "decrease";
    onClick(): void;
    isCountPositiveNum: boolean;
}

//모달종류(아이템사용/아이템버리기), 연산종류(+,-)에 따라서 색과 내용이 달라짐
export default function ChangeQtyBtn({
    modalType,
    operationType,
    onClick,
    isCountPositiveNum
}: ChangeQtyBtnProps) {
    let border = "3px solid";

    if (modalType === "useModal") {
        border += "#c5f4c4";
    } else {
        border += "#d9d9d9";
    }

    return (
        <ButtonStyled modalType={modalType} border={border} color="#ffffff" onClick={onClick} isCountPositiveNum={isCountPositiveNum}>
            {operationType === "increase" ? <IncreaseIcon /> : <DecreaseIcon />}
        </ButtonStyled>
    );
}