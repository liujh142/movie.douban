# 移动端 豆瓣电影
在开发项目时，首先是对功能的拆解然后逐一实现。  
项目具备3个功能，并且每一个功能对应了一个tab。这种场景下又可以分为单页应用和多页应用，如果是单页的只需要把三个功能都放在一个页面上这样不需要进行跳转，也可以作为多页应用来实现点击对应tab时直接跳转到对应功能的页面。这里项目使用单页完成  
![](http://m.qpic.cn/psc?/V534a6R1474JQl2rA0ky3JEBYR4VX4Yr/45NBuzDIW489QBoVep5mcZNISAMgckVt3PUiUJfxqMB.*u9rxMjV.BzebY7Bl1IHB9fDxvGsD5S0BIRrmq.VVKHRnl92gtZyMb2Q1dNu2Co!/b&bo=YQF*AgAAAAADFy8!&rf=viewer_4)  

#### html结构
```
<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale = 1">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <link rel="stylesheet" href="http://at.alicdn.com/t/font_2362030_ct6aod8i9h.css">
    <link rel="stylesheet" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
    <link rel="stylesheet" href="css/index.css">
    <link rel="falicon" href="">
    <title>豆瓣电影</title>
</head>
<body>
    <main>
        <section class=" container">
           <div id="top250">
           </div>
           <div class="loading"><span class="iconfont icon-loading">
           </span></div>
        </section>
        <section class="container">
            <div id="comaing">

            </div>
            <div class="loading"><span class="iconfont icon-loading">
            </span></div>
        </section>
        <section class="search">
            <div class="searchBox"><input type="text" placeholder="搜索电影"><button></button></div>
            <div class="container">
            </div>
        </section>
    </main>
    <footer>
        <div class="active"><span class="iconfont icon-top250"></span><span>TOP250</span></div>
        <div><span class="iconfont icon-us" ></span><span></span>即将上映</div>
        <div><span class="iconfont icon-search"></span><span></span>搜索</div>
    </footer>
```

#### 功能实现
为了让多个功能之间的变量不会相互干扰，我们将每个功能实现都包装在一个对象里面，再设置一个管理中心。这种设置就会让每一个功能都变成一个独立的对象，全局环境下也只要4个对象。这样看起来就会直观很多并且不会互相干扰有助于后期维护
```
var top250 = {
    init : function(){
        this.$section = $('section').eq(0);
        this.$container = $('#top250');
        this.$loading = $('.loading')
        this.isLoading = false;
        this.index = 0;
        this.isFinish = false;
        this.bind();
        this.start();
    },
    bind : function(){
        var _this = this;
        this.$section.on('scroll',function(){
            if(_this.isToBottom()){
                _this.start();
            }
        })
    },
    start : function(){
        var _this = this
        this.getData(function(data){
            _this.render(data);
        })
    },
    getData : function(callback){
        var _this = this;
        if(_this.isLoading) return;
        _this.isLoading = true;
        _this.$loading.show();
        $.ajax({
            url : 'http://39.105.38.10:8081/movie/top250',
            data : {
                page : _this.index
            },
            type : 'GET',
            dataType : 'json'
        }).done(function(ret){
            _this.index += 1;
            if(_this.index == 10){
                _this.isFinish = true
            }
            callback(ret.data.subject);
        }).fail(function(){
            console.log('error')
        }).always(function(){
            _this.isLoading = false;
            _this.$loading.hide();
        })

    },
    render : function(data){
        var _this = this;
        data.forEach(function(value,index){
        var tal = `<div class="item">
            <a href="#">
                <div class="cover">
                    <img src="https://images.weserv.nl/?url=img2.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
                </div>
                <div class="datail">
                    <h2 class="name">肖申克的救赎</h2>
                    <div class="extra"><span class="score">9.7</span>分</div>
                    <div class="extra"><span class = "quote">希望让人自由。</span></div>
                    <div class="extra">主演：<span class = "director">弗兰克·德拉邦特 Frank Darabont</span></div>
                </div>
            </a>
        </div>
        `
        var $node = $(tal);
        $node.find('.cover img').attr('src',_this.getImgUrl(value.img))
        $node.find('h2').text(value.name)
        $node.find('.score').text(value.star)
        $node.find('.quote').text(value.quote)
        $node.find('.difector').text(value.difector)
        _this.$container.append($node);

        })
    },
    isToBottom : function(){
        return this.$section.scrollTop() + this.$section.height()  >= this.$container.height() -10 ;
    },
    getImgUrl : function(url){
        if(url){
        let _u = url.substring(7);
        return 'https://images.weserv.nl/?url=' + _u;
        }
    }
}

var comaing = {
    init : function(){
        this.$container = $('section').eq(1);
        this.$comaing = $('#comaing');

        this.start();
    },
    bind : function(){
        
    },
    start : function(){
        var _this = this;
        this.getData(function(data){
            _this.render(data);
        })
    },
    render : function(data){
        var _this = this;
        data.forEach(function(value,index){
            var tal = `<div class="item">
            <a href="#">
                <div class="cover">
                    <img src="https://images.weserv.nl/?url=img2.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
                </div>
                <div class="datail">
                    <h2 class="name">肖申克的救赎</h2>
                    <div class="extra">上映时间：<span class="date">02月09日</span></div>
                    <div class="extra"><span class = "see">3690人想看</see></div>
                    <div class="extra">类型：<span class = "plot">剧情</span></div>
                    <div class="extra">国家：<span class = "region">匈牙利</span></div>
                </div>
            </a>
        </div>
        `
            var $node = $(tal);
            $node.find('.cover img').attr('src',_this.getImgUrl(value.img))
            $node.find('h2').text(value.title)
            $node.find('.date').text(value.date)
            $node.find('.plot').text(value.plot)
            $node.find('.region').text(value.region)
            _this.$container.append($node);
        })
    },
    getData : function(callback){
        $.ajax({
            url : 'http://39.105.38.10:8081/movie/showing',
            data : {
                city : 'guanzhou'
                },
            type : 'get',
            dataType : 'json' 
        }).done(function(ret){
            callback(ret.data.subject)
        }).fail(function(){
            console.log(error)
        }).always(function(){
        
        })
    },
    getImgUrl : function(url){
        if(url){
        let _u = url.substring(7);
        return 'https://images.weserv.nl/?url=' + _u;
        }
    }
}

var search = {
    init : function(){
        this.$text = $('.search input');
        this.$button = $('.search button')
        this.$container = $('.search').find('.container')
        this.key = ''

        this.bind();
    },
    bind : function(){
        var _this = this;
        this.$button.on('click',function(){
             _this.key = _this.$text.val();
             _this.start();
            _this.$container.empty()
        })
    },
    render : function(data){
        var _this = this;
        data.forEach(function(value,index){
        var tal = `<div class="item">
            <a href="#">
                <div class="cover">
                    <img src="https://images.weserv.nl/?url=img2.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
                </div>
                <div class="datail">
                    <h2 class="name">肖申克的救赎</h2>
                    <div class="extra"><span class="score">9.7</span>分</div>
                </div>
            </a>
        </div>
        `
        var $node = $(tal);
        $node.find('.cover img').attr('src',_this.getImgUrl(value.img))
        $node.find('h2').text(value.title)
        $node.find('.score').text(value.rating)
        $node.find('.quote').text(value.quote)
        $node.find('.difector').text(value.difector)
        _this.$container.append($node);

        })
       
    },
    start : function(){
        var _this = this
        this.getData(function(data){
            _this.render(data);
        })
    },
    getData : function(callback){
        var _this = this;
        $.ajax({
            url : 'http://39.105.38.10:8081/movie/search',
            type : "get",
            data : {
                q : _this.key
            },
            dataType : 'json'
        }).done(function(ret){
            console.log(ret)
            callback(ret.data.subject);
        }).fail(function(){
            _this.$container.text('获取数据失败');
        })
    },
    getImgUrl : function(url){
        if(url){
        let _u = url.substring(7);
        return 'https://images.weserv.nl/?url=' + _u;
        }
    }

}


var app = {
    init : function(){
        this.$tabs = $('footer>div');
        this.$panels = $('section')
        this.bind();

        top250.init();
        comaing.init();
        search.init();
    },
    bind : function(){
        var _this = this
        this.$tabs.on('click',function(){
            $(this).addClass('active').siblings().removeClass('active')
            _this.$panels.hide().eq($(this).index()).fadeIn(100);
        })
    },
    start : function(){
    }
}
app.init();

```

























