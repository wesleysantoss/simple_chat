'use strict';

const socket            = io(),
      $domContainerChat = document.querySelector('#container-chat'),
      $btnLogout        = document.querySelector('#btn-logout'),
      $domConteudo      = document.querySelector('#conteudo'),
      $domListUsers     = document.querySelector('#list-users'),
      $btnSendMessage   = document.querySelector('#btn-send-message'),
      $domMessage       = document.querySelector('#message');
// ------------------------------------------------------------------------------------------------------
// FUNCTIONS
const heightadjustment = () =>  {
    $domConteudo.style.height = `${window.innerHeight}px`;
    $domContainerChat.style.maxHeight = `${window.innerHeight - 170}px`;
}
// ------------------------------------------------------------------------------------------------------
const eventNewUser = data => {
    getAllUser();
    let div = document.createElement('div');
    let html = `
        <div class="p-2 mt-2 other-message">
            <p class="m-0 font-weight-bold color-green-light">${data.message}</p>
        </div>
    `;

    div.classList.add('col-md-12');
    div.innerHTML = html;
    $domContainerChat.appendChild(div);
}
// ------------------------------------------------------------------------------------------------------
const eventLogoutUser = data => {
    let div = document.createElement('div');
    let html = `
        <div class="p-2 mt-2 other-message">
            <p class="m-0 font-weight-bold color-red-light">${data.message}</p>
        </div>
    `;

    div.classList.add('col-md-12');
    div.innerHTML = html;
    $domContainerChat.appendChild(div);
    
    $domListUsers.childNodes.forEach(e => {
        if(e.dataset.email === data.email){
            e.classList.remove('color-green-light');
            e.classList.add('color-grey-light');
        }
    });
}
// ------------------------------------------------------------------------------------------------------
const getAllUser = async () => {
    const request = {
        method: 'GET',
        credentials: 'include'
    };

    try {
        const result     = await fetch('/users', request);
        const resultJson = await result.json();
        
        if(resultJson.status === 'success'){
            $domListUsers.innerHTML = '';
            resultJson.message.forEach(e => {
                const {email, name, status} = e;
                
                let li     = document.createElement('li'),
                    classe = (status) ? 'color-green-light' : 'color-grey-light';

                li.innerHTML = (getCookie('email') === email) ? `<a>${name} <small>(Você)</small></a>` : `<a href="/chat/chat-private/${email}">${name} <small>(${email})</small></a>`;

                li.dataset.email = email;
                li.classList.add(classe);
                $domListUsers.appendChild(li);
            })
        }else{
            alert(`Oops, ocorreu algum erro. Tente novamente mais tarde`);
        }
    } catch (e){
        alert(`Oops, ocorreu algum erro. Tente novamente mais tarde`);
    }
}
// ------------------------------------------------------------------------------------------------------
const setMessageDom = data => {
    let div = document.createElement('div');
    div.classList.add('col-md-12');
    let html = `
    <div class="p-2 mt-2 other-message">
        <p class="m-0 font-weight-bold"><span>${(data.name === getCookie('name') ? 'Você' : data.name)}</span> diz:</p>
        <p class="m-0">
            ${data.message}
        </p>
    </div>`;
    div.innerHTML = html;
    $domContainerChat.appendChild(div);
    $domContainerChat.scrollTop = $domContainerChat.scrollHeight;
}
// ------------------------------------------------------------------------------------------------------
// EVENTS DOM 
window.onload = () => {
    heightadjustment();
    socket.emit('newUser-client-serve', {name: getCookie('name'), email: getCookie('email'), message:`${getCookie('name')} acabou de entrar`});
    $domListUsers.innerHTML = 'Buscando...';
    setTimeout(getAllUser, 500);
}
// ------------------------------------------------------------------------------------------------------
$btnLogout.addEventListener('click', () => {
    socket.emit('logoutUser-client-serve', {name: getCookie('name'), email: getCookie('email'), message:`${getCookie('name')} acabou de sair`})}
)
// ------------------------------------------------------------------------------------------------------
$domMessage.addEventListener('keyup', e => e.keyCode === 13 && $btnSendMessage.click())
// ------------------------------------------------------------------------------------------------------
$btnSendMessage.addEventListener('click', () => {
    let message = $domMessage.value;
    const regex = /(<[^>]+>|<[^>]>|<\/[^>]>)/g;
    message = message.replace(regex , '');
    socket.emit('newMessage-client-serve', {name: getCookie('name'), email: getCookie('email'), message});
    $domMessage.value = '';
})
// LISTEN EVENTS IO
socket.on('newUser-serve-client', data => eventNewUser(data))
// ------------------------------------------------------------------------------------------------------
socket.on('logoutUser-serve-client', data => eventLogoutUser(data))
// ------------------------------------------------------------------------------------------------------
socket.on('newMessage-serve-client', data => setMessageDom(data))
// ------------------------------------------------------------------------------------------------------
