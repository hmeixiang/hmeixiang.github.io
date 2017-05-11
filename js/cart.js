window.onload=function(){
    deleteFn();
    changeNum()
}
// 分析
// 1、点击delete_btn,mask显示，同时delete_up逆时针旋转30deg
// 2、点击取消按钮，mask隐藏，delete_up逆时针旋转0deg
// 3、点击确定按钮，mask隐藏，当前delete_btn所在的商品信心消失
// 4、如果某个商店商品信息全部消失该商店消失；
// 5、点击+，商品数量+1，点击-，商品数量-1；
// 6、点击选中按钮，按钮被选中
function deleteFn(){
    //0 获取事件源和相关元素
    var delBtnArr=document.getElementsByClassName("delete_btn");
    var mask = document.querySelector(".mask");
    // var deleteUpArr = document.querySelectorAll(".delete_up");
    // 1、点击delete_btn,mask显示，同时delete_up逆时针旋转30deg
    for(var i=0;i<delBtnArr.length;i++){
        delBtnArr[i].onclick=function(){
            mask.style.display="block";
            this.children[0].className = "delete_up del";
            // 2、点击取消按钮，mask隐藏，delete_up逆时针旋转0deg
            var cancelBtn = mask.children[0].children[1].children[0];
            var yesBtn = mask.children[0].children[1].children[1];
            //用that缓存住当前被点击的那个垃圾桶按钮
            var that = this;
            // 2、点击取消按钮，mask隐藏，delete_up逆时针旋转0deg
            cancelBtn.onclick=function(){
                mask.style.display="none";
                that.children[0].className ="delete_up";
            }
            // 3、点击确定按钮，mask隐藏，当前delete_btn所在的商品信心消失
            yesBtn.onclick=function(){
                mask.style.display="none";
                var currProduct = that.parentNode.parentNode.parentNode.parentNode;
                var currShopCon = currProduct.parentNode;
                currShopCon.removeChild(currProduct);
                var currShop = currShopCon.parentNode;
                // 4、如果某个商店商品信息全部消失该商店消失；
                if(currShopCon.children.length<=0){
                    currShop.parentNode.removeChild(currShop);
                }
            }

        }
    }
}
//分析
//1、点击+，数字加1，不能超过99，加号变灰色
//2、点击-，数字减1，不能小于1，减号变灰色
function changeNum(){
    //0 获取事件源和相关元素
    var  change = document.querySelectorAll(".change_num");
    for(var i=0;i<change.length;i++){
        change[i].onclick=function(){
            var con = event.target.innerHTML;
            var inp = this.children[1];
            if(con=="-"&&inp.value>1){
                inp.value--;
            }else if(con=="+"&&inp.value<99){
                inp.value++;
            }
        }
    }
    //如果用户输入非数字，改为1
    var inpArr = document.querySelectorAll("input");
    for(var j=0;j<inpArr.length;j++){
        inpArr[j].onblur=function(){
            var val = this.value;
            if(isNaN(val)){
                this.value=1;
            }
        }
    }
}