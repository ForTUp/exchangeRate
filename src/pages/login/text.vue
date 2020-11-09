<template>
  <div id="app">
    <div id="signature" style="width:100%;height:300px;"></div><!-- 画布容器 -->
    <button id="clearSignature" @click='clearSignature'>清除签名</button>
    <button id="saveSignature" @click='saveSignature'>保存签名</button>
    <div id="result"></div><!-- 预览容器 -->
  </div>
</template>
<script>
import 'jq-signature'//也可以在入口js文件main.js中导入，则此处不用在导入
export default {
  data(){
    return{
 form: {
 	firstname:'',
 	lastname:'',
 	gender:'1',
 	birthday:'', 
 	nationality_id: '', 
 	occupation_id: '',
 	email: '', 
 	areacode_id:'',
 	mobile:'',
 	areacode2_id:'',
 	mobile2:'',
 	country_id:'',
 	province:'',
 	city:'',
 	area:'',
 	address:'',
 	postcode:'',
 	sign_url:'',
 	certificate:{
 		passport:{
 			type:'',
 			issuer_id:'',
 			number:'',
 			expiration:'',
 			photos:'',
 		},
 		idcard:{
 			type_id:'',
 			issuer_id:'',
 			number:'',
 			expiration:'',
 			photos:'',
 		},
 	},
 },
    }
  },
  mounted(){
    $('#signature').jqSignature({
      width:'300',//canvas 宽度,默认值300
      height:'200',//canvas 高度,默认值100
      border:'1px solid #ff6700',//canvas 边框,默认值'1px solid red'
      background:'#ddd',//canvas 背景,默认值'#ffffff'
      lineColor:"#0A4D82",//签名线条颜色,默认值'#222222'
      lineWidth:3,//签名线条宽度,默认值1
      autoFit:true//使canvas的宽度充满父元素,默认值 false
    })
  },
  methods:{
	  // 将base64转换为blob
	  dataURLtoBlob (dataurl) {
	    var arr = dataurl.split(',')
	    var mime = arr[0].match(/:(.*?);/)[1]
	    var bstr = atob(arr[1])
	    var n = bstr.length
	    var u8arr = new Uint8Array(n)
	    while (n--) {
	  	u8arr[n] = bstr.charCodeAt(n)
	    }
	    return new Blob([u8arr], { type: mime })
	  },
	  // 将blob转换为file
	  blobToFile (theBlob, fileName) {
	    theBlob.lastModifiedDate = new Date()
	    theBlob.name = fileName
	    return theBlob
	  },
    clearSignature(){
      $('#result').html('')//清除预览img
      $('#signature').jqSignature('clearCanvas')//清除canvas
    },
    saveSignature(){
	 let _this = this;
      let signatureBox = $('#signature');
      let canvas = signatureBox.children('canvas').eq(0)[0]
      let data = signatureBox.jqSignature('getDataURL');//base64数据
      //创建一个空的canvas,判断是否画布为空
      var blankCanvas = document.createElement('canvas');
      blankCanvas.width = canvas.width;
      blankCanvas.height = canvas.height;
      if(blankCanvas.toDataURL() == canvas.toDataURL()){
        alert('请签名')
        return;
      }
      //为了解决在ios设备上修改img标签src地址无效的问题,所以每次保存重新创建一个预览img标签,在清除签名时,在移除img标签
      let img = new Image();
      img.src = data;
	  var blob = _this.dataURLtoBlob(data)
	  var tofile = _this.blobToFile(blob, '签名.jpg')
	  console.log(tofile)
	  setTimeout(async () => {
	    const formData = new FormData()
	    formData.append('file', tofile, tofile.name)
	    formData.append('fileType', 9)
	    _this.$api.upload(formData).then((response)=>{
	  	  console.log(response)
	  	  if(response.code==1){
	  		  _this.form.sign_url=response.data.url;
	  	  }else{
	  		  _this.$message({
	  			  message: '请选择买入币种',
	  			  type: 'warning'
	  		  })
	  	  }
	    })
	  })
    }
  }
}
</script>