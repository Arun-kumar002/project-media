const socket = io();
let messageArea = document.querySelector(".message_area");
let username;
let textarea = document.querySelector("#textarea");

    if(!username){
        setInterval(data,5000)
        async function data(){
            console.log('im set inter fun');
            let dat=await fetch('http://localhost:5000/user/login/email')
            let json=await dat.json()
            username= json.email
            console.log(username);
        }
    }

    textarea.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
          sendMsg(e.target.value);
        }
      });
      
      function sendMsg(messages) {
        let msg = {
          user: username,
          message: messages.trim(),
        };
        // append
        appendMsg(msg, "outgoing");
        textarea.value = "";
        scrltobtm();
      
        // sending to server
        socket.emit("message", msg);
      }
      function appendMsg(msg, type) {
        //type of msg in /out
        let mainDiv = document.createElement("div");
        let className = type;
        mainDiv.classList.add(className, "message");
        let output = `
      <h4>${msg.user}</h4>
      <p>${msg.message}</p>
      
      `;
        console.log(messageArea);
        console.log(mainDiv);
        console.log(output);
        mainDiv.innerHTML = output;
        messageArea.appendChild(mainDiv);
      }
      // recieve message runs only in browser not on server
      
      socket.on("message", (msg) => {
        // console.log(msg)
        appendMsg(msg, "incoming");
        scrltobtm();
      });
      
      function scrltobtm() {
        messageArea.scrollTop = messageArea.scrollHeight;
      }

