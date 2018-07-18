(function(){
let submitUserData=document.getElementById('submitUserData');
let name=document.getElementById('name');
let messages=document.getElementById('messages');
let text=document.getElementById('text');
let textSubmit=document.getElementById('textSubmit');
let nickname=document.getElementById('nickname');
let userlist=document.getElementById('userlist');
let userlogin=document.getElementById('userlogin');


submitUserData.onclick=function(){
userlogin.style.display = 'none';
}

textSubmit.onclick=function(){
  let userName, nickName;
  userName=name.value;
  nickName=nickname.value;

  if(name.value==""){
    userName="Name";
  }
  if(nickname.value==""){
nickName="nickName";
  }
   let  data={
        name:userName,
        nickname:nickName,
        text: text.value
    };
      ajaxRequest({
        method: 'POST',
        url: '/messages',
        data: data
    })
};

let ajaxRequest = function(options){
    let url = options.url || '/';
    let method = options.method || 'GET';
    let callback = options.callback || function() {};
    let data = options.data || {};
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open(method,url, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(data));
    xmlHttp.onreadystatechange=function(){
        if(xmlHttp.status==200 && xmlHttp.readyState===4){
            callback(xmlHttp.responseText);
        }
    };


};

let getData = function(){
    ajaxRequest({
        url: '/messages',
        method: 'GET',
        callback: function(msg){
            msg= JSON.parse(msg);
            messages.innerHTML='';
            for(let i in msg){
                if(msg.hasOwnProperty(i)){
                    let userElem=document.createElement('li');
                    let el = document.createElement('li');
                    userElem.innerText=msg[i].name+' ( '+msg[i].nickname+' )';
                    userlist.appendChild(userElem);
                    el.innerText=msg[i].name+' ( '+msg[i].nickname+' )'+" : "+msg[i].text;
                messages.appendChild(el);
                }}}});};
getData();

setInterval(function(){
    getData();

},1000);

})();