const addItemBtn = document.getElementById('addItemBtn');
const itemInput = document.getElementById('itemInput');
const checklist = document.getElementById('checklist');

// Load saved checklist from localStorage
window.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('checklistItems')) || [];
  saved.forEach(item => addListItem(item.text, item.checked));
});

// Save to localStorage
function saveList() {
  const items = [];
  document.querySelectorAll('#checklist li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const checked = li.querySelector('input[type="checkbox"]').checked;
    items.push({ text, checked });
  });
  localStorage.setItem('checklistItems', JSON.stringify(items));
}

// Add item to list (used by both button and loading)
function addListItem(text, checked = false) {
  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" class="checkItem" ${checked ? 'checked' : ''} />
    <span class="${checked ? 'checked' : ''}">${text}</span>
    <button class="removeBtn">Remove</button>
  `;
  checklist.appendChild(li);
  saveList();
}

// Add new item from input
addItemBtn.addEventListener('click', () => {
  const text = itemInput.value.trim();
  if (text !== '') {
    addListItem(text);
    itemInput.value = '';
  }
});

// Handle check and remove
checklist.addEventListener('click', (e) => {
  if (e.target.classList.contains('removeBtn')) {
    e.target.parentElement.remove();
    saveList();
  }

  if (e.target.classList.contains('checkItem')) {
    const span = e.target.nextElementSibling;
    span.classList.toggle('checked');
    saveList();
  }
});
