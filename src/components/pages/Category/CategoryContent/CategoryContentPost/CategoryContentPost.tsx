import React, { MouseEventHandler, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Input from "@/components/Input/Input";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";
import {
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
} from "./CategoryContentPost.styles";
import axiosRequest from "@/api";
import { category, res } from "@/@types/index";

interface CategoryPostProps {
    subject: string;
    onTextSend: (text: string) => void;
    id: string | null;
}

interface ConfirmContentProps {
    message: React.ReactNode;
    onCancel: MouseEventHandler<HTMLButtonElement>;
    onConfirm: MouseEventHandler<HTMLButtonElement>;
}

const ConfirmContent: React.FC<ConfirmContentProps> = ({
    message,
    onCancel,
    onConfirm
}) => {
    return (
        <>
            <ModalText>{message}</ModalText>
            <ModalButtonWrap>
                <ModalButton onClick={onCancel}>
                    <Text>취소</Text>
                </ModalButton>
                <ModalButton onClick={onConfirm}>
                    <Text>확인</Text>
                </ModalButton>
            </ModalButtonWrap>
        </>
    );
};

const CategoryContentPost: React.FC<CategoryPostProps> = ({
    subject,
    onTextSend,
    id
}) => {
    const [isEndModalOpen, setIsEndModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState<string>("");

    const getCategory = async () => {
        if (id) {
            try {
                const response: res<category> = await axiosRequest.requestAxios<
                    res<category>
                >("get", `/todoCategories/${id}`);
                setInputValue(response.data.category);
                onTextSend(response.data.category);
            } catch (error) {
                alert(
                    "데이터를 가져오던 중 에러가 발생했습니다. 다시 시도해 주세요."
                );
                console.error("Failed to fetch categories:", error);
            }
        }
    };
    const handleOpenEndModal = () => {
        setIsEndModalOpen(true);
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEndModalOpen(false);
        setIsDeleteModalOpen(false);
    };

    const handleConfirmEndModal = async () => {
        handleCloseModal();
        if (id) {
            try {
                // PATCH 요청으로 목표를 종료
                const response: res<category> = await axiosRequest.requestAxios<
                    res<category>
                >("patch", `/todoCategories/endCategory/${id}`);
                if (!response.error) {
                    alert("목표가 종료되었습니다.");
                    navigate("/category/list");
                } else {
                    throw new Error("목표 종료를 실패했습니다.");
                }
            } catch (error) {
                console.error("Failed to end category:", error);
                alert("목표를 종료하지 못했습니다. 다시 시도해 주세요.");
            }
        }
    };

    const handleConfirmDeleteModal = async () => {
        handleCloseModal();
        if (id) {
            try {
                // PATCH 요청으로 목표를 종료
                const response: res<category> = await axiosRequest.requestAxios<
                    res<category>
                >("delete", `/todoCategories/${id}`);
                if (!response.error) {
                    alert("목표가 삭제되었습니다.");
                    navigate("/category/list");
                } else {
                    throw new Error("목표 삭제를 실패했습니다.");
                }
            } catch (error) {
                console.error("Failed to delete category:", error);
                alert("목표를 삭제하지 못했습니다. 다시 시도해 주세요.");
            }
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onTextSend(e.target.value);
    };

    const SettingButton = (subject: string) => {
        return (
            subject === "수정" && (
                <>
                    <ActionButtonWrap>
                        <ActionButton type="exit" onClick={handleOpenEndModal}>
                            종료하기
                        </ActionButton>
                        <ActionButton
                            type="delete"
                            onClick={handleOpenDeleteModal}
                        >
                            삭제
                        </ActionButton>
                    </ActionButtonWrap>
                    {isEndModalOpen && (
                        <ConfirmModal>
                            <ConfirmContent
                                message={
                                    <>
                                        <SpanText isred={"false"}>
                                            목표를 종료하시겠습니까?
                                        </SpanText>
                                        <SpanText isred={"false"}>
                                            기존의 할 일 목록은 유지되지만,
                                        </SpanText>
                                        <SpanText isred={"false"}>
                                            새로운 입력은 제한됩니다.
                                        </SpanText>
                                    </>
                                }
                                onConfirm={handleConfirmEndModal}
                                onCancel={handleCloseModal}
                            />
                        </ConfirmModal>
                    )}
                    {isDeleteModalOpen && (
                        <ConfirmModal>
                            <ConfirmContent
                                message={
                                    <>
                                        <SpanText isred={"false"}>
                                            목표를 삭제하시겠습니까?
                                        </SpanText>
                                        <SpanText isred={"false"}>
                                            기존의 할 일 목록이 모두 삭제됩니다.
                                        </SpanText>
                                    </>
                                }
                                onConfirm={handleConfirmDeleteModal}
                                onCancel={handleCloseModal}
                            />
                        </ConfirmModal>
                    )}
                </>
            )
        );
    };

    return (
        <>
            <InputContainer>
                <StyledInput
                    type="text"
                    value={inputValue}
                    onChange={handleInput}
                    placeholder="목표를 입력하세요!"
                    autoFocus
                />
            </InputContainer>
            {SettingButton(subject)}
        </>
    );
};

export default CategoryContentPost;
