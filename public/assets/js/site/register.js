'use strict';

const $formRegister = document.querySelector('#form-register');

// -----------------------------------------------------------------------------------
$formRegister.addEventListener("submit", async function(e){
    e.preventDefault();
    const action    = $formRegister.getAttribute('action'),
          method    = $formRegister.getAttribute('method'),
          name      = document.querySelector("#name").value,
          email     = document.querySelector("#email").value,
          password  = document.querySelector("#password").value,
          body      = JSON.stringify({name, email, password});


    const request = {
        method,
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'text/html,application/json'
        }),
        body
    };
    
    try {
        const result     = await fetch(action, request);
        const resultJson = await result.json();

        if(resultJson.status === 'error') {
            alert('Oops, ocorreu algum erro. Tente novamente mais tarde');
        }else{
            alert('Cadastro realizado com sucesso');
            window.location = "/";
        }
    } catch (e){
        alert('Oops, ocorreu algum erro. Tente novamente mais tarde');
    }
})
// -----------------------------------------------------------------------------------