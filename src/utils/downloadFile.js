import jwtAxios from "./jwtAxios";

const DownloadFile = (fileId, fileName, context, typeId) => {
    jwtAxios.get(`/api/Course/downloadFile?typeId=${typeId}&fileId=${fileId}`,{context:context, responseType: 'blob'})
    .then(response => {
      const blob = new Blob(
        [response.data]
        )
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download',fileName);
        document.body.appendChild(link);
        link.click();

        setTimeout(function() {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 200)
    })
    .catch(err => {
      console.log(err);
    })
}

export default DownloadFile;