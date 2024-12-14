
let draggingItem = null;
let originalParent = null;
let originalNextSibling = null;
let placeholder = document.createElement('li');
placeholder.className = 'placeholder';

const isMobile = window.innerWidth <= 768;

document.querySelectorAll('ul').forEach(list => {
  list.addEventListener('dragstart', handleDragStart);
  list.addEventListener('dragover', handleDragOver);
  list.addEventListener('drop', handleDrop);
  list.addEventListener('dragleave', handleDragLeave);
  list.addEventListener('dragend', handleDragEnd);
  checkEmptyList(list);

  if (isMobile) {
    list.addEventListener('click', handleItemClick);
  }
});

function handleItemClick(e) {
  const clickedItem = e.target.closest('li');
  if (clickedItem && clickedItem !== placeholder && clickedItem !== e.currentTarget.querySelector('.empty-message')) {
    const targetList = e.currentTarget.id === 'unused-items' ? document.getElementById('used-items') : document.getElementById('unused-items');
    targetList.appendChild(clickedItem);
    checkEmptyList(e.currentTarget);
    checkEmptyList(targetList);
  }
}

function handleDragStart(e) {
  draggingItem = e.target;
  originalParent = draggingItem.parentNode;
  originalNextSibling = draggingItem.nextSibling;
  e.dataTransfer.setData('text/plain', null);
  setTimeout(() => {
    draggingItem.classList.add('hidden');
  }, 0);
}

function handleDragOver(e) {
  if (!isMobile) {
    e.preventDefault();
    const dropTarget = e.target.closest('li');
    const dropTargetList = e.target.closest('ul');
    if (dropTarget && dropTarget !== draggingItem) {
      dropTargetList.insertBefore(placeholder, dropTarget.nextSibling);
    } else if (dropTargetList && !dropTargetList.contains(placeholder)) {
      dropTargetList.appendChild(placeholder);
    }
  }
}

function handleDrop(e) {
  if (!isMobile) {
    e.preventDefault();
    const dropTargetList = e.target.closest('ul');
    if (dropTargetList) {
      dropTargetList.insertBefore(draggingItem, placeholder);
      draggingItem.classList.remove('hidden');
      placeholder.remove();
      checkEmptyList(originalParent); // Kiểm tra danh sách nơi mục được kéo đi
      checkEmptyList(dropTargetList); // Kiểm tra danh sách nơi mục được kéo đến
      draggingItem = null;
    }
  }
}

function handleDragLeave(e) {
  if (!isMobile) {
    const dropTarget = e.target.closest('li');
    if (dropTarget && dropTarget.parentNode.contains(placeholder)) {
      placeholder.remove();
    }
  }
}

function handleDragEnd(e) {
  if (!isMobile) {
    if (draggingItem) {
      if (draggingItem.classList.contains('hidden')) {
        originalParent.insertBefore(draggingItem, originalNextSibling);
        draggingItem.classList.remove('hidden');
      }
      placeholder.remove();
      draggingItem = null;
      checkEmptyList(originalParent); // Kiểm tra danh sách nơi mục được kéo đi
    }
  }
}

function checkEmptyList(list) {
  if (list.children.length === 0) {
    let emptyLi = document.createElement('li');
    emptyLi.className = 'card-body text-light m-b-15 empty-message';
    list.appendChild(emptyLi);
  } else {
    let emptyMessage = list.querySelector('.empty-message');
    if (emptyMessage && list.children.length > 1) {
      emptyMessage.remove();
    }
  }
}

// Thay đổi khi thay đổi kích thước màn hình
window.addEventListener('resize', function () {
  if (window.innerWidth <= 768 && !isMobile) {
    window.location.reload();
  }
});

