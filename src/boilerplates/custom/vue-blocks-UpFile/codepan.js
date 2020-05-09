new Vue({
  name: 'action',
  data () {
    return {
      fileList: [],//上传文件列表，无论单选还是支持多选，文件都以列表格式保存
    }
  },
  created () {
  },
  props: [],
  components: {
    myUpload
  },
  mounted () {
  },
  methods: {
    removeFile (index) {
      let fileList = [...this.fileList]
      if (fileList.length) {
        fileList.splice(index, 1)
        this.onChange(fileList)
      }
    },
    onChange(fileList){//监听文件变化，增减文件时都会被子组件调用
      this.fileList = [...fileList];
      console.log(this.fileList,'调用onChange');
    },
    uploadSuccess(response, file){//某个文件上传成功都会执行该方法，index代表列表中第index个文件
      console.log(response,file,'某个文件上传成功调用uploadSuccess');
      if(response.code==='0000'){
        var fileobj = {originalFileName:'',jssFileName:'',name:'', status:'',type:''}
        fileobj.originalFileName = response.data.originalFileName
        fileobj.jssFileName = response.data.jssFileName
        fileobj.status = 'success'
        fileobj.type = file.datame.type
        let fileList = [...this.fileList];
        fileList.push(fileobj)
        this.onChange(fileList);
      }else{
        console.log('上传失败，');
      }
    },
    uploadProgress(progress){//上传进度，上传时会不断被触发，需要进度指示时会很有用
      const{ percent } = progress;
      console.log(percent,'上传进度调用uploadProgress');
    },
    uploadFailed( err){//某文件上传失败会执行，index代表列表中第index个文件
      console.log(err,'某文件上传失败uploadFailed');
    },
    uploadFinished(result){//所有文件上传完毕后（无论成败）执行，result: { success: 成功数目, failed: 失败数目 }
      console.log(result,'所有文件上传完毕onFinished');
    }
  }
}
).$mount('#app')
