<script>
import { upload } from "./api"
export default {
    name:"file-upload",
    props:{
        chunkSize:{// 切片大小
            type:Number,
            default:1 * 1024 * 1024 // 默认1M
        }
    },
    data(){
        return{
            file: null,// 选择的文件
            fileData:[] // 文件片
        }
    },
    methods:{
        handleFileChange(event){// 处理文件
            const [file] = event.target.files;
            this.file = file;
        },
        async _uploadThunks(){// 上传切片
            console.log(this.fileData)
            const requestList = this.fileData.map(({thunk,hash,currentIndex,total})=>{
                const formData = new FormData();
                formData.append("chunk", thunk);
                formData.append("hash", hash);
                formData.append("currentIndex", currentIndex);
                formData.append("total", total);
                formData.append("hash", hash);
                formData.append("filename", this.file.name);
                return formData
            }).map(formData=>upload(formData))// 得到一个promise的集合
            await Promise.all(requestList); // 用http并发发送切片
        },
        async handleUpload(){// 处理上传逻辑
            if (!this.file) return;
            const fileChunkList = this.createFileChunk(this.file);// 得到文件分片的集合
            this.fileData = fileChunkList.map(({file},index)=>({
                thunk:file,
                hash:`${this.file.name}-${index}`,
                currentIndex:index,
                total:10
            }))
            await this._uploadThunks()
        },
        createFileChunk(file,size = this.chunkSize){// 创建文件分片
            const fileChunkList = []
            let i = 0
            while (i < file.size) {
                fileChunkList.push({ file: file.slice(i, i + size) });
                i += size;
            }
            return fileChunkList;
        }
    },
    render(){
        return(
            <div class="file-upload-container">
                <input type="file" on-change={this.handleFileChange}/>
                <button on-click={this.handleUpload}>上传</button>
            </div>
        )
    }
}
</script>
<style lang="scss" scoped>
.file-upload-container{
    width:100%;
}
</style>