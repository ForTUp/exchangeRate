//<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=F47hrcVkdz2MW5aoDkXpt42dHtRqnieG"></script>


export function drawMap(id,list){
	var map = new BMap.Map(id); // 创建地图实例
	 var city = new BMap.Point(121.41398620605469, 31.21373748779297);
	 map.centerAndZoom(city, 10);
	 map.enableInertialDragging();
	 map.enableContinuousZoom();
	 map.addControl(new BMap.OverviewMapControl());
	 map.addControl(new BMap.NavigationControl());
	 map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
	 
	 
	 map.clearOverlays();
	 //将数据遍历
	  list.forEach(value => { 
		 //自定义信息窗口内容     
		  var sContent =
		  '<div style="width:300px;"><img src=' + this.imgSrc +' id="imgDemo"><p style="font-size:16px;font-weight:bold;margin-top: 20px;">校区：' +
		  value.Name +
		  '</p><p style="font-size:13px;margin: 5px 0;">地址：' +
		  value.address +
		  "</div>";
		  var point = new BMap.Point(value.bdLNG, value.bdLAT); // 创建点坐标
		  console.log(point);
		  var myIcon = new BMap.Icon(
		  // require("../assets/mapadd.png"),
		  new BMap.Size(24, 29)
				 );
		  var marker = new BMap.Marker(point, { icon: myIcon });
		  map.addOverlay(marker);
		 //点击图标时候调用信息窗口
		 var infoWindow = new BMap.InfoWindow(sContent);
			  marker.addEventListener("click", function() {
			  this.openInfoWindow(infoWindow);
			  this.openInfoWindow(infoWindow);
			  //图片加载完毕重绘infowindow
			  document.getElementById("imgDemo").onload = function() {
				infoWindow.redraw(); //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
			   };
		 });
   });
}