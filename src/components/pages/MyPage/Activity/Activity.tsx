import {
    CardWrapper,
    ActivityCard,
    Icon,
    Description
} from "./Activity.styles";

interface activityInfo {
    activityType: string;
    data: string;
}

export default function Activity({ activityType, data }: activityInfo) {
    return (
        <CardWrapper>
            {activityType === "heart" && (
                <ActivityCard color="#FCF5FF">
                    <Icon activitytype="heart"></Icon>
                    <Description>펫과 함께한지 {data}일 됐어요!</Description>
                </ActivityCard>
            )}
            {activityType === "calendar" && (
                <ActivityCard color="#F6FFF7">
                    <Icon activitytype="calendar"></Icon>
                    <Description>
                        지금까지 {data}일 동안 todo를 달성했어요!
                    </Description>
                </ActivityCard>
            )}
            {activityType === "check" && (
                <ActivityCard color="#F3FDFF">
                    <Icon activitytype="check"></Icon>
                    <Description>
                        지금까지 {data}개의 todo를 완료했어요!
                    </Description>
                </ActivityCard>
            )}
        </CardWrapper>
    );
}
