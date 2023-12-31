import styled from "styled-components";

type ToggleWrapperProps = {
    active: boolean;
};

export const ToggleDiv = styled.div`
    position: relative;
`;

export const ToggleWrapper = styled.div<ToggleWrapperProps>`
    width: 44px;
    height: 22px;
    flex-shrink: 0;
    border-radius: 15px;
    background: ${(props) => (props.active ? "#EBEBEB" : "#CBCACA")};
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background 0.3s;
    position: relative;
    margin-top: 20px;
    margin-left: 330px;
    top: 22px;
    justify-content: ${(props) => (props.active ? "flex-end" : "flex-start")};
`;

export const Switch = styled.div<{ active: boolean }>`
    width: 19px;
    height: 19px;
    flex-shrink: 0;
    background: white;
    border-radius: 50%;
    position: absolute;
    left: 1.4px;
    transition: left 0.4s ease;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) =>
        props.active &&
        `
        left: calc(100% - 20.5px);
    `}
`;
