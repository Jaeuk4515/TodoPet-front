export interface user {
    id: string;
    name: string;
    status: string;
    inventory: string[]; // TODO: 정의된 타입에 대해 수정 필요. 임시로 설정해 놓았음.
    createdAt: Date;
}

export interface myUser {
    _id: string;
    googldId?: string;
    nickname: string;
    membershipStatus?: string;
    picture: string;
    createdAt: Date;
    updatedAt?: Date;
    withPetDate: number;
    todoCount: number;
    historyCount: number;
}
