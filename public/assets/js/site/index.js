'use strict';

const $formLogin     = document.querySelector("#form-login"),
      $conteudoLogin = document.querySelector("#conteudo-login");

// FUNCTIONS
const heightadjustment = () => $conteudoLogin.style.height = `${window.innerHeight}px`;

// EVENTS
window.onload = heightadjustment;
// -----------------------------------------------------------------------------------
$formLogin.addEventListener("submit", async function(e){
    e.preventDefault();

    const email    = document.querySelector("#email").value,
          password = document.querySelector("#password").value,
          action   = $formLogin.getAttribute('action'),
          method   = $formLogin.getAttribute('method'),
          body     = JSON.stringify({email, password});

    const request = {
        method,
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'text/html,application/json'
        }),
        body
    };

    try {
        const result     = await fetch(action, request);
        const resultJson = await result.json();
        
        if(resultJson.status === 'success'){
            window.location = "/chat";
        }
        else{
            alert(`Oops, usuário ou senha incorreto, tente novamente`);
        }
    } catch (e){
        alert(`Oops, ocorreu algum erro. Tente novamente mais tarde`);
    }
})
// -----------------------------------------------------------------------------------