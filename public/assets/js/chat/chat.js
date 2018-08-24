'use strict';

const socket            = io(),
      $domContainerChat = document.querySelector('#container-chat'),
      $btnLogout        = document.querySelector('#btn-logout'),
      $domConteudo      = document.querySelector('#conteudo'),
      $domListUsers     = document.querySelector('#list-users');

// functions
const heightadjustment = () => $domConteudo.style.height = `${window.innerHeight}px`;
// ------------------------------------------------------------------------------------------------------
const eventNewUser = data => {
    let div = document.createElement('div');
    let html = `
        <div class="p-2 mt-2 other-message">
            <p class="m-0 font-weight-bold color-verde-claro">${data.message}</p>
        </div>
    `;

    div.classList.add('col-md-12');
    div.innerHTML = html;
    $domContainerChat.appendChild(div);
    
    $domListUsers.childNodes.forEach(e => {
        if(e.dataset.email === data.email){
            e.classList.remove('color-cinza-claro');
            e.classList.add('color-verde-claro');
        }
    });
}
// ------------------------------------------------------------------------------------------------------
const eventLogoutUser = data => {
    let div = document.createElement('div');
    let html = `
        <div class="p-2 mt-2 other-message">
            <p class="m-0 font-weight-bold color-vermelho-claro">${data.message}</p>
        </div>
    `;

    div.classList.add('col-md-12');
    div.innerHTML = html;
    $domContainerChat.appendChild(div);
    
    $domListUsers.childNodes.forEach(e => {
        if(e.dataset.email === data.email){
            e.classList.remove('color-verde-claro');
            e.classList.add('color-cinza-claro');
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
                    classe = (status) ? 'color-verde-claro' : 'color-cinza-claro';

                li.innerHTML = `${name} <small>(${email})</small>`;
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
// events dom.
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
// listen events io.
socket.on('newUser-serve-client', data => eventNewUser(data));
// ------------------------------------------------------------------------------------------------------
socket.on('logoutUser-serve-client', data => eventLogoutUser(data));
// ------------------------------------------------------------------------------------------------------
