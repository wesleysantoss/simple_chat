'use strict';

/**
* Requisições GET o body não deve ser enviado.
*/
const requestAjax = async (action, method, body) => {
   const request = {
       method,
       headers: new Headers({
           'Content-Type': 'application/json',
           'Accept': 'text/html,application/json'
       }),
       body
   };

   let result = await fetch(action, request);
   return await result.json();
}
// -----------------------------------------------------------------------------------