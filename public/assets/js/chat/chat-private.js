'use strict';

const socket = io(),
      $domContainerChat = document.querySelector('#container-chat'),
      $domConteudo      = document.querySelector('#conteudo');

// ------------------------------------------------------------------------------------------------------
// FUNCTIONS
const heightadjustment = () =>  {
    $domConteudo.style.height = `${window.innerHeight}px`;
    $domContainerChat.style.maxHeight = `${window.innerHeight - 170}px`;
}
// ------------------------------------------------------------------------------------------------------
// EVENTS DOM 
window.onload = () => {
    heightadjustment();
}
// ------------------------------------------------------------------------------------------------------