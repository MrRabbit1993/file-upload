import FileUpload from "./src"
FileUpload.install = function (Vue) {
    Vue.component(FileUpload.name, FileUpload)
}

export default FileUpload
