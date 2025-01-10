import {FC} from "react";
import {SetNewPassword} from "@/containers/setNewPassword/SetNewPassword";

interface Props {
    searchParams: { oobCode?: string }
}

const SetNewPasswordPage: FC<Props> = ({searchParams: {oobCode}}) => {
    return (
        <SetNewPassword oobCode={oobCode}/>
    )
}

export default SetNewPasswordPage;
