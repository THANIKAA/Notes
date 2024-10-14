const popupModal = document.getElementById('popupModal');
const addBtn = document.getElementById('add');
const popupIframe = document.getElementById('popupIframe');
let isEditMode = false;
let currentEditNoteIndex = null;


popupModal.style.display = 'none';


addBtn.addEventListener('click', () => {
    popupIframe.src = './pop.html'; 
    popupModal.style.display = 'block';
    isEditMode = false; 
});


window.addEventListener('message', (event) => {
    if (event.data === 'closeModal') {
        popupModal.style.display = 'none';
    } else if (event.data.note) {
        if (isEditMode) {
            updateGridItem(event.data.note); 
        } else {
            addToGrid(event.data.note); 
        }
        popupModal.style.display = 'none';
    }
});


window.onload = () => {
    const savedGrid = localStorage.getItem('gridContent');
    if (savedGrid) {
        document.getElementById('grid').innerHTML = savedGrid;
        attachNoteClickListeners(); 
    }
};

function addToGrid(note) {
    const grid = document.getElementById('grid');
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.innerHTML = note;


    grid.appendChild(gridItem);

    localStorage.setItem('gridContent', grid.innerHTML);
    

    attachNoteClickListeners();
}

function updateGridItem(note) {
    const gridItems = document.querySelectorAll('.grid-item');
    if (currentEditNoteIndex !== null && gridItems[currentEditNoteIndex]) {
        gridItems[currentEditNoteIndex].innerHTML = note;
        localStorage.setItem('gridContent', document.getElementById('grid').innerHTML);
    }
}


function attachNoteClickListeners() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            editNotePopup(index); 
        });
    });
}


function editNotePopup(index) {
    const gridItems = document.querySelectorAll('.grid-item');
    const noteContent = gridItems[index].innerHTML;


    isEditMode = true;
    currentEditNoteIndex = index;

  
    popupIframe.src = `./pop.html?note=${encodeURIComponent(noteContent)}`;
    popupModal.style.display = 'block';
}


const searchInput = document.getElementById('search');

searchInput.addEventListener('input', function() {
    const searchQuery = searchInput.value.toLowerCase();
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        const noteTitle = item.querySelector('h3') ? item.querySelector('h3').textContent.toLowerCase() : '';
        
        if (noteTitle.includes(searchQuery)) {
            item.style.display = 'block'; 
        } else {
            item.style.display = 'none'; 
        }
    });
});
