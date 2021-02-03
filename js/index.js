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
             _this.render();
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
            callback(ret.valie.subject);
        }).fail(function(){
            _this.$container.text('获取数据失败');
        })
    },

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
            _this.$panels.hide().eq($(this).index()).fadeIn(1000);
        })
    },
    start : function(){
    }
}
app.init();
