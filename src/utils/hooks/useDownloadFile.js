import React, {useContext} from "react";
import UserContext from "../../context/UserContext";
import DownloadFile from "../downloadFile";

const useDownloadFile = () => {
    const context = useContext(UserContext);
    return (fileId, fileName, typeId) => DownloadFile(fileId,fileName,context,typeId)
}

export default useDownloadFile;