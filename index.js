var total_count = 0;
var prepps = 0;
var nowpps = 0;
var pps = null;
var intervpopcat = null;
var active = false;

var kevent = new KeyboardEvent('keydown', {
    key: 'g'
});

window.onload = function() {
    if(!location.href.endsWith('#')){
        let modal=create_modal();
        document.getElementById('close').onclick = function () {
            modal.remove();
            document.getElementById('css-src').remove();
            start();
        }
    } else {
        start();
    }
}

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        if (active) {stop();} else {start();}
    }
}

var stop = function() {
    active = false;
    clearInterval(intervpopcat);
    clearInterval(pps);
}

var start = function() {
    active = true;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function(d) {
        if (d.currentTarget.response.split('\n')[8] !== "loc=KR") return;
    }
    xmlhttp.open("GET", "https://popcat.click/cdn-cgi/trace", true);
    xmlhttp.send();
    pps = setInterval(function() {
        prepps = nowpps;
        nowpps = total_count;
        //console.log('%c' + (nowpps + ' PPS') + '%c / ' + '%c' + (nowpps - prepps + ' dPPS'), 'color: green; font-size: 24px; background: #191919;', 'color: white; font-size: 24px; background: #191919;', 'color: ' + ['red', 'yellow', 'yellow'][1 + Math.sign(nowpps - prepps)] + '; font-size: 24px; background: #191919;');
        total_count = 0;
        if (nowpps <= 924) {
            location.replace("https://popcat.click/#");
            location.reload();
        }
        if (checkCookie("bot")) {
            let date = new Date();
            date.setDate(date.getDate() - 100);
            document.cookie = `bot=;Expires=${date.toUTCString()}`;
            location.replace("https://popcat.click/#");
            location.reload();
        }
    }, 1000)
    intervpopcat = setInterval(function() {
        for (i = 0; i < 77; i++) {
            document.dispatchEvent(kevent);
            total_count++;
        }
    }, 0);
}

var create_modal = function () {
    let css = `
    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
    #modal.modal-overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.25);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(1.5px);
        -webkit-backdrop-filter: blur(1.5px);
        border-radius: 10px;
        border: 1px solid transparent;
    }
    #modal .modal-window {
        background: linear-gradient(to right, #2C5364 , #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 13.5px );
        -webkit-backdrop-filter: blur( 13.5px );
        border-radius: 10px;
        border: 1px solid transparent;
        width: 480px;
        height: 600px;
        position: relative;
        top: 0px;
        padding: 10px;
    }
    #modal .title {
        padding-left: 10px;
        display: inline;
        text-shadow: 1px 1px 2px gray;
        color: white;
        
    }
    #modal .title h2 {
        display: inline;
    }
    #modal .close-area {
        display: inline;
        float: right;
        padding-right: 10px;
        cursor: pointer;
        text-shadow: 1px 1px 2px gray;
        color: white;
    }
    
    #modal .content {
        margin-top: 20px;
        padding: 0px 10px;
        text-shadow: 1px 1px 2px gray;
        color: white;
    }`
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    style.id='css-src'

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
    style.styleSheet.cssText = css;
    } else {
    style.appendChild(document.createTextNode(css));
    }
    modal=document.createElement('div');
    modal.id='modal'
    modal.className='modal-overlay'

    modal_window=document.createElement('div')
    modal_window.className='modal-window'

    modal_title=document.createElement('div')
    modal_title.className='title'
    modal_title_text=document.createElement('h2')
    modal_title_text.innerText='제목'
    modal_title.appendChild(modal_title_text)
    modal_window.appendChild(modal_title)

    modal_close=document.createElement('div')
    modal_close.className='close-area'
    modal_close.id='close'
    modal_close.innerText='×'
    modal_window.appendChild(modal_close)

    modal_content=document.createElement('div')
    modal_content.className='content'
    modal_content_text1=document.createElement('p')
    modal_content_text1.innerText='⚠️ [주의사항] ⚠️\n[1] 이용 중 팝캣 화면 클릭을 자제해주세요!\n[2] 실행 중 페이지가 자주 새로고침 될 수 있습니다!\n\nℹ️ [사용방법] ℹ️\n해당 프로그램은 사이트 접속시 자동으로 실행됩니다.\n이용 중 잠시 중단 하기 위해서는 SPACE바를 이용해주세요!\n'
    modal_content.appendChild(modal_content_text1)
    modal_window.appendChild(modal_content)
    modal.appendChild(modal_window)

    document.body.appendChild(modal)
    return modal;
}

const checkCookie = function(name) {
    let cookies = document.cookie.split(';');
    let value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return value ? true : false;
}