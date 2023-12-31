import styled from "styled-components";

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 30px;
`;

const StyledInput = styled.input`
    background: none;
    border: none;
    border-bottom: 1.8px solid #000;
    outline: none;
    font-size: 16px;
    padding: 5px 0;
    width: 90%;
    transition: border-color 0.3s ease;
`;

const Text = styled.div`
    font-size: 15px;
`;

const ButtonWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const CircleButton = styled.button`
    width: 4.8125rem;
    height: 2rem;
    flex-shrink: 0;
    border-radius: 1rem;
    background: #f5f5f5;
    border: none;
    margin: 10px 0;

    &:last-child {
        margin-bottom: 30px;
    }
`;
const ActionButtonWrap = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 36px;
`;

const ActionButton = styled.button<{ type: string }>`
    width: 10.1875rem;
    height: 2.375rem;
    flex-shrink: 0;
    border: none;
    border-radius: 0.5rem;
    background: #f5f5f5;
    color: ${(props) => (props.type === "exit" ? "black" : "#FA4D28")};
    font-weight: 400;
    cursor: pointer;
`;

const ModalText = styled.div`
    display: flex;
    height: 3.8125rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;

    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: pre-wrap;
`;

const ModalButtonWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const ModalButton = styled.button`
    width: 7.07894rem;
    height: 2rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    background: #e7e8ea;
    border: none;
    cursor: pointer;
`;

interface SpanTextProps {
    isred: string;
}
const SpanText = styled.span<SpanTextProps>`
    margin-bottom: 5px;
    color: ${(props) => (props.isred === "true" ? "red" : "black")};
`;

export {
    InputContainer,
    StyledInput,
    Text,
    CircleButton,
    ButtonWrap,
    ActionButtonWrap,
    ActionButton,
    ModalText,
    ModalButtonWrap,
    ModalButton,
    SpanText
};
