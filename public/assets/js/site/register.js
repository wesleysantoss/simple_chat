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
          jsonBody  = JSON.stringify({name, email, password});

    try {
        const result = await requestAjax(action, method, jsonBody); // utils.js
        if(result.status === 'error') {
            alert('Oops, ocorreu algum erro. Tente novamente mais tarde');
        }else{
            alert('Cadastro realizado com sucesso');
        }
    } catch (e){
        alert('Oops, ocorreu algum erro. Tente novamente mais tarde');
    }
})
// -----------------------------------------------------------------------------------