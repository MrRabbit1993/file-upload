import request from "@/utils/http"

const prefix = '/api'

/**
 * @description: 上传
 * @param  {FormData}  formData 文件
 * @return {Promise}
 */

export function upload(formData) {
    return request({
        url: `${prefix}/file/upload`,
        data: formData
    })
}