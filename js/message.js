let logOut, section_user, conteneur_username, send, lastTimestamp = 0;

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    logOut = document.getElementById('logout-test');
    ul_user = document.getElementById('ul_user');
    conteneur_username = document.getElementById('conteneur_username'),
    send = document.getElementById('send');

    let token = sessionStorage.getItem('tokenValue'),
        id = sessionStorage.getItem('idValue'),
        usernameValue = sessionStorage.getItem('username_value'),
        conteneur_message = document.getElementById('conteneur_message');

    /* ------------------------------------------- 
            04 := ajouter username dans la nav
    ------------------------------------------- */
        // add the username in the nav
    conteneur_username.innerHTML += `<span class = "username">${usernameValue}</span>`;

        // add the username in the chat
    conteneur_message.innerHTML += `<p class="joined">${usernameValue} has joined the chat</p>`;



    /* ----------------------------------------- 
            05 := logout
    ----------------------------------------- */

    logOut.addEventListener('click', function(){
        logouttt();
    })

    function logouttt(){
        
        fetch(`http://greenvelvet.alwaysdata.net/kwick/api/logout/${token}/${id}`)
        .then(res => res.json())
        .then(response =>{
            if(response.result.status === 'done'){
                window.location.href = 'index.html';
            } else{
                alert('a problem occurred, please try again later');
            }
        })
    };



    /* ----------------------------------------- 
            06 := people logged
    ----------------------------------------- */

    function peopleLogged(){
        fetch(`http://greenvelvet.alwaysdata.net/kwick/api/user/logged/${token}`)
        .then(res => res.json())
        .then(response =>{

            if(response.result.status === 'done'){
                let people = response.result.use;

                for(let i = 0; i < people.length; i++){
                    ul_user.innerHTML += `<li>${people[i]}</li>`;
                }
            }
        })
    }

    // setInterval(peopleLogged, 3000);
    peopleLogged();


    /* ----------------------------------------- 
            07 := send message
    ----------------------------------------- */
    function sendMessage(){

        let message = document.getElementById('textarea').value,
            message_crypthé = encodeURI(message);

        if(message.length <= 140){
            fetch(`http://greenvelvet.alwaysdata.net/kwick/api/say/${token}/${id}/${message_crypthé}`);
            conteneur_message.innerHTML += `<article class="my_mess column"> 
                                                <span>${usernameValue}</span>
                                                <p>${message}</p>
                                            </article>`
        } else{
            alert('your message is too long');
        }   
    }

    send.addEventListener('click', function(){
        sendMessage();
    })


    /* ----------------------------------------- 
            07 := view messages
    ----------------------------------------- */

    function viewMessages(){
        let tabMessages = [];

        fetch(`http://greenvelvet.alwaysdata.net/kwick/api/talk/list/${token}/${lastTimestamp}`)
        .then(res => res.json())
        .then(response =>{
            tabMessages = response.result.talk;

            for(i = 0; i < tabMessages.length; i++){
                if(tabMessages[i].user_name === usernameValue){
                    conteneur_message.innerHTML += `<article class="my_mess column"> 
                                                        <span>${usernameValue}</span>
                                                        <p>${tabMessages[i].content}</p>
                                                    </article>`
                }else{
                    conteneur_message.innerHTML += `<article class="username_mess column"> 
                                                        <span>${tabMessages[i].user_name}</span>
                                                        <p>${tabMessages[i].content}</p>
                                                    </article>`
                }
            }
        })
    }

    // setInterval(viewMessages, 3000);

    viewMessages();
})