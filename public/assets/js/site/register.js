'use strict';

const $formRegister = document.querySelector('#form-register');

// -----------------------------------------------------------------------------------
$formRegister.addEventListener("submit", async function(e){
    e.preventDefault();
    const $this     = this,
          action    = $this.getAttribute('action'),
          method    = $this.getAttribute('method'),
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
        const result = await fetch(action, request);
        if(result.status === 'error') {
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