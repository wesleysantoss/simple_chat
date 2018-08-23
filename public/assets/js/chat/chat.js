const userLogged        = document.querySelector('#name-user-logged').innerHTML,
      emailLogged       = document.querySelector('#email-user-logged').innerHTML,
      socket            = io(),
      $domContainerChat = document.querySelector('#container-chat'),
      $btnLogout        = document.querySelector('#btn-logout'),
      $domConteudo      = document.querySelector("#conteudo");

// functions
const heightadjustment = () => $domConteudo.style.height = `${window.innerHeight}px`;
const eventUser = data => {
    let div = document.createElement('div');
    let html = `
        <div class="p-2 mt-2 other-message">
            <p class="m-0 font-weight-bold">${data}</p>
        </div>
    `;

    div.classList.add('col-md-12');
    div.innerHTML = html;
    $domContainerChat.appendChild(div);
}
// ------------------------------------------------------------------------------------------------------
// events dom.
window.onload = heightadjustment;
$btnLogout.addEventListener('click', () => {
    socket.emit('userLogout-client-serve', {user: userLogged, email: emailLogged, message:`${userLogged} acabou de sair`})}
)
// ------------------------------------------------------------------------------------------------------
// listen events io.
socket.on('eventUser-serve-client', data => eventUser(data))
// ------------------------------------------------------------------------------------------------------
// emit events io.
socket.emit('newUser-client-serve', {user: userLogged, email: emailLogged, message:`${userLogged} acabou de entrar`});
// ------------------------------------------------------------------------------------------------------