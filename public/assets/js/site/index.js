'use strict';

const $formLogin = document.querySelector("#form-login");

// -----------------------------------------------------------------------------------
$formLogin.addEventListener("submit", function(e){
    e.preventDefault();

    const email    = document.querySelector("#email").value,
          password = document.querySelector("#password").value;
    
    console.log(email, password);
})
// -----------------------------------------------------------------------------------