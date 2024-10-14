const params = new URLSearchParams(window.location.search);
const noteContent = params.get('note');


if (noteContent) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = noteContent;
    
    document.getElementById('note-title').value = tempDiv.querySelector('h3').textContent;
    document.getElementById('notearea').value = tempDiv.querySelector('p').textContent;
}

function displayDateTime() {
    const now = new Date();

    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0'); 
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12; 
    hours = hours ? hours : 12; 

    const date = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

    document.getElementById('datetime').textContent = `Modf: ${hours}.${minutes} ${ampm}, ${date}`;
}

displayDateTime();

document.getElementById('createbtn').addEventListener('click', () => {
    const noteTitle = document.getElementById('note-title').value;
    const noteContent = document.getElementById('notearea').value;

    if (noteTitle === '' && noteContent === '') {
        alert('Note is empty. It will not be saved.');
        window.parent.postMessage('closeModal', '*'); 
        return;
    }
    
    const note = `
        <h3>${noteTitle}</h3>
        <p>${noteContent}</p>
    `;

    window.parent.postMessage({ note: note }, '*');

    window.parent.postMessage('closeModal', '*');
});

document.getElementById('cancelbtn').addEventListener('click', () => {
    document.getElementById('note-title').value = '';  
    document.getElementById('notearea').value = '';
    window.parent.postMessage('closeModal', '*');
});


window.addEventListener('message', (event) => {
    if (event.data === 'openModal') {
        displayDateTime();
    }
});
