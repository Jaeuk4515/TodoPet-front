import styled, { css } from "styled-components";
interface DropDownProps {
    $isDropped: boolean;
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    font-weight: 500;
`;

const DropdownContainer = styled.div`
    position: relative;
    text-align: center;
`;

const DropdownButton = styled.div`
    cursor: pointer;
`;

const Menu = styled.div.attrs<DropDownProps>((props) => {
    return {
        $isDropped: props.$isDropped
    };
})`
    position: absolute;
    top: 25px;
    right: 0;
    width: 100px; //컴포넌트마다 수정하기
    text-align: center;
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
    opacity: 0;
    visibility: hidden;
    transform: translate(0, -20px);
    transition:
        opacity 0.4s ease,
        transform 0.4s ease,
        visibility 0.4s;
    z-index: 9;

    ${({ $isDropped }) =>
        $isDropped &&
        css`
            opacity: 1;
            visibility: visible;
            transform: translate(0, 0);
            right: 0;
        `};
`;

const Ul = styled.ul`
    & > li {
        box-sizing: border-box;
        padding: 8px 12px;
        border-bottom: 1px solid #d9d9d9;
        width: 100%;
        line-height: 100%;
    }

    & > li:last-of-type {
        border-bottom: none;
    }

    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Li = styled.li<{ centerContent?: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: ${(props) =>
        props.centerContent ? "space-between" : "center"};
    align-items: center;
`;
const Link = styled.a`
    text-decoration: none;
    color: black;
`;

export { Wrapper, DropdownContainer, DropdownButton, Menu, Ul, Li, Link };
