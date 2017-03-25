var doc = app.activeDocument;
var theSelect = doc.selection;
var s=15*2.834645;//标尺距离物体边沿宽度
var tsize=8*2.834645; //标尺字体大小
doc.selection = null; // 还原选择的图案为系统默认
doc.defaultFilled = false;
doc.defaultStroked = true;
doc.defaultStrokeWidth = 0.3*2.834645;
doc.defaultStrokeColor = redColor();
function redColor(){
redColor = new CMYKColor();//标尺用红色
redColor.black = 0;
redColor.cyan = 0;
redColor.magenta =100;
redColor.yellow = 100;
return redColor;
}
for (i=0;i<theSelect.length;i++){ //加入批处理
sW=(theSelect[i]=='[PathItem ]' && theSelect[i].stroked==true)?theSelect[i].strokeWidth:0;
x=theSelect[i].left;
y=theSelect[i].top;
w=theSelect[i].width+sW;
h=theSelect[i].height+sW;
var asize=(h<50 || w<50)?10:20;//简单的自适应，太小的物体用小箭头
var g1 = doc.groupItems.add();//将标尺群组
var line1=g1.pathItems.add(); //画高度标尺
line1.setEntirePath( [[x-s, y],[x-s, y-h]]) ;
var line1=g1.pathItems.add(); 
line1.setEntirePath( [[x-s-s/2, y],[x-s/2, y]]) ;
var line1=g1.pathItems.add(); 
line1.setEntirePath( [[x-s-s/2, y-h],[x-s/2, y-h]]) ;
var ar1=g1.pathItems.add(); //画箭头
ar1.stroked=false;
ar1.fillColor= redColor();
ar1.setEntirePath( [[x-s, y],[x-s-asize/2,y-asize],[x-s+asize/2,y-asize]]) ;
ar1.closed=true 
var ar1=g1.pathItems.add(); 
ar1.stroked=false;
ar1.fillColor= redColor();
ar1.setEntirePath( [[x-s, y-h],[x-s-asize/2,y-h+asize],[x-s+asize/2,y-h+asize]]) ;
ar1.closed=true 
var t1 = g1.textFrames.add();
t1.contents = (h/2.834645).toFixed(1)+" mm"; //小数位四舍五入取整数
t1.textRange.characterAttributes.size=tsize; 
t1.textRange.characterAttributes.fillColor= redColor();
t1.left = x-s-s-t1.width;
t1.top = y-h/2+t1.height/2;
var line2=g1.pathItems.add(); //画长度标尺
line2.setEntirePath( [[x, y-h-s],[x+w, y-h-s]]) ;
var line2=g1.pathItems.add(); 
line2.setEntirePath( [[x, y-h-s-s/2],[x, y-h-s/2]]) ;
var line2=g1.pathItems.add(); 
line2.setEntirePath( [[x+w, y-h-s-s/2],[x+w, y-h-s/2]]) ;
var ar1=g1.pathItems.add(); //画箭头
ar1.stroked= false;
ar1.fillColor= redColor();
ar1.setEntirePath( [[x,y-h-s],[x+asize,y-h-s-asize/2],[x+asize,y-h-s+asize/2]]) ;
ar1.closed=true 
var ar1=g1.pathItems.add(); 
ar1.stroked= false;
ar1.fillColor= redColor();
ar1.setEntirePath( [[x+w,y-h-s],[x+w-asize,y-h-s-asize/2],[x+w-asize,y-h-s+asize/2]]) ;
ar1.closed=true 
var t2 = g1.textFrames.add();
t2.contents =(w/2.834645).toFixed(1)+" mm"; //小数位四舍五入取整数
t2.textRange.characterAttributes.size=tsize; 
t2.textRange.characterAttributes.fillColor= redColor();
t2.left = x+w/2-t2.width/2;
t2.top = y-h-s-s;
}