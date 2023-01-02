let  register, to_sign_up, to_sign_in, form_back, login;

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    register = document.getElementById('register');
    to_sign_up = document.getElementById('to_sign_up');
    to_sign_in = document.getElementById('to_sign_in');
    form_back = document.getElementsByClassName('form_back')[0];
    login = document.getElementById('login');

    /* ----------------------------------------- 
        01 := animation login/register
    ----------------------------------------- */

    to_sign_up.addEventListener('click', function(){
        form_back.style.visibility = 'visible';
    })

    to_sign_in.addEventListener('click', function(){
        form_back.style.visibility = 'hidden';
    })



    /* ---------------------------------------------------- 
            02 := password and username valid ? sign up
    ----------------------------------------------------  */

    function isPasswordValid(passwordValue){
        let create = false;
        if(passwordValue.length < 5){
            alert('your password is too short, please change it');
            create = false;
        }else if(passwordValue.length > 12){
            alert('your password is too big, please change it');
            create = false;
        }else if(isNaN(parseFloat(passwordValue)) && isFinite(passwordValue))  // if the password is only numbers
        {
            alert('your password contains only numbers, please change it');
            create = false;
        }else{
            create = true;
        }
        
        return create;
    }

    function isUsernameValid(userName){
        let creat = false;

        if(userName.length>20){
            alert('your username is too big, please change it');
            creat = false;
        }else if(userName.includes('"') || userName.includes("'") || userName.includes(' ')){
            alert('you can\'t use \' or \"  or a space, please change it');
            creat = false;
        }else{
            creat = true;
        }

        return creat;
    }

    function signUp(){  
        let passwordValue = document.getElementById('passWord').value,
            userName = document.getElementById('userName').value;

        if(isPasswordValid(passwordValue) && isUsernameValid(userName)){
            fetch('http://greenvelvet.alwaysdata.net/kwick/api/signup/'+ userName + '/' + passwordValue)
            .then(res => res.json())
            .then(response => {

                if(response.result.status === 'done'){
                    alert(response.result.message);
                    sessionStorage.setItem('tokenValue', response.result.token);
                    sessionStorage.setItem('idValue', response.result.id);
                    sessionStorage.setItem('username_value', userName);   
                    window.location.href = 'message.html';
                } else{
                    alert('a problem occurred, please try again later');
                }
            })
            .catch((error) => console.error(error))
        }
    }

    register.addEventListener('click', function(){
        signUp();
    })


    /* ----------------------------------------- 
            03 := sign in
    ----------------------------------------- */

    function signIn(){
        let passwordValueIn = document.getElementById('PASSWORD').value,
            userNameIn = document.getElementById('USERNAME').value,
            isUserLogged = '';

        fetch('http://greenvelvet.alwaysdata.net/kwick/api/login/'+ userNameIn+ '/' + passwordValueIn)
        .then(res => res.json())
        .then(response => {
            isUserLogged = response.result.status;

            if(isUserLogged === 'done'){
                alert(response.result.message);
                sessionStorage.setItem('tokenValue', response.result.token);
                sessionStorage.setItem('idValue', response.result.id);
                sessionStorage.setItem('username_value', userNameIn); 
                window.location.href = 'message.html';
            }else{
                alert('a problem occurred, please try again later');
            }
        })
    }

    login.addEventListener('click', function(){
        signIn();
    })

});



