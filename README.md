# Flask-Login-example
Login register facebook Login - Python Flask

* [Demo](https://youtu.be/5RlzqPz9oN8)  

常看到別人的網站有登入、註冊、使用FACEBOOK登入，今天教你使用 Python [Flask](http://flask.pocoo.org/) 建立一個。

使用 Python [Flask](http://flask.pocoo.org/) 搭配 [Flask-Login](https://flask-login.readthedocs.io/en/latest/)  實現登入機制，也透過 [Facebook API](https://developers.facebook.com/)完成常見的使用Facebook登入。

## 特色
* 搭配 [Flask-Login](https://flask-login.readthedocs.io/en/latest/) 實現登入、註冊機制。
* 透過 [Facebook API](https://developers.facebook.com/) 完成常見的使用 Facebook 登入。
* 資料庫(database)使用 SQLite。

## 安裝套件 Flask-Login 
請先確定電腦有安裝 [Python](https://www.python.org/)

### Flask-Login
``` 
pip install flask-login
```
更多 Flask-Login ，可參考  [Flask-Login](https://github.com/maxcountryman/flask-login) 

## 使用Facebook登入-前置作業
請先到  [facebook-developer](https://developers.facebook.com/)，點右上角的 <b>我的應用程式</b>，選 <b>新增應用程式</b>，

接著輸入 <b>顯示名稱</b> 以及選擇 <b>類別</b>，如下圖

![alt tag](http://i.imgur.com/8szV6O9.jpg)

接著頁面會跳到
![alt tag](http://i.imgur.com/AX0Zurh.jpg)

選擇 <b>新增平台</b>，這裡選擇 <b>網站</b> 當作範例
![alt tag](http://i.imgur.com/N6dmksa.jpg)

輸入 <b>網域</b>，這裡先輸入 <b>localhost</b>
![alt tag](http://i.imgur.com/pgqvVvv.jpg)

接下來將你的 <b> 應用程式編號</b> 貼到下方

``` 
window.fbAsyncInit = function() {
      FB.init({
        appId      : 'your-app-id',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
      });
  };
```
更詳細的請看 Facebook JavaScript SDK，請到 [facebook developers](https://developers.facebook.com/docs/facebook-login/web)。

## 執行畫面
登入頁

![alt tag](http://i.imgur.com/7vgeRit.jpg)

註冊頁

![alt tag](http://i.imgur.com/4wUdDpN.jpg)

使用Facebook登入
![alt tag](http://i.imgur.com/uSAIAlY.jpg)

## 執行環境
* Python 3.4.3

## Reference 
* [Flask-Login](https://github.com/maxcountryman/flask-login) 
* [facebook developer](https://developers.facebook.com/docs/javascript) 

## External JS
* [jQuery Validation](https://jqueryvalidation.org/) 

## Donation

文章都是我自己研究內化後原創，如果有幫助到您，也想鼓勵我的話，歡迎請我喝一杯咖啡:laughing:

![alt tag](https://i.imgur.com/LRct9xa.png)

[贊助者付款](https://payment.opay.tw/Broadcaster/Donate/9E47FDEF85ABE383A0F5FC6A218606F8)

## License
MIT license
