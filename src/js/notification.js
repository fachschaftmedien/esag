/**
 * created by NasskalteJuni
 */

function create(title,text){
  try{
    new Notification(title, {
      body: text,
      icon: '/static/img/icons/favicon-32x32.png',
      tag: Math.random().toString(32).substring(2,9)
    })
  }catch(err){
    console.log(err);
    alert(title+'\n'+text);
  }
}

function notify(title, text){
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    }
    // Let's check whether notification permissions have alredy been granted
    else if (Notification.permission === "granted") {
      create(title,text);
    }
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          create(title,text)
        }
      });
    }

}

export default notify;
