'use strict';

class User {
  #id;
  #name;
  #userName;
  #email;

  constructor(id, name, userName, email) {
      this.#id = id;
      this.#name = name;
      this.#userName = userName;
      this.#email = email;
  }

  getInfo() {
      return `
          Name: ${this.#name}<br>
          Username: ${this.#userName}<br>
          Email: ${this.#email}
      `;
  }

  get name() {
      return this.#name;
  }
}

class Subscriber extends User {
  #pages;
  #groups;
  #canMonetize;

  constructor(id, name, userName, email, pages, groups, canMonetize) {
      super(id, name, userName, email);
      this.#pages = pages;
      this.#groups = groups;
      this.#canMonetize = canMonetize;
  }

  getInfo() {
      return `${super.getInfo()}<br>
          Pages: ${this.#pages.join(', ')}<br>
          Groups: ${this.#groups.join(', ')}<br>
          Can Monetize: ${this.#canMonetize ? 'Yes' : 'No'}`;
  }
}

const currentUser = new Subscriber(
  1, "Isaac Nunez", "isaac_n", "isaac@example.com",
  ["Tech Tips", "Programming Hub"],
  ["JavaScript Group", "Web Dev Community"],
  true
);

document.querySelector('.file-input').addEventListener('change', function(event) {
  const fileName = this.files[0]?.name || '';
  document.querySelector('.file-name').textContent = fileName;
});

document.querySelector('.post-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const textarea = document.querySelector('.post-textarea');
  const fileInput = document.querySelector('.file-input');
  const errorMessage = document.querySelector('.error-message');
  const text = textarea.value.trim();
  const file = fileInput.files[0];

  if (!text && !file) {
      errorMessage.textContent = 'Please enter some text or upload an image.';
      return;
  }
  
  createPost(text, file);
  this.reset();
  errorMessage.textContent = '';
  document.querySelector('.file-name').textContent = '';
});

function createPost(text, file) {
  const postsSection = document.querySelector('.posts-section');
  const post = document.createElement('div');
  post.classList.add('post');
  post.innerHTML = `
      <div class="post-header">
          <img src="./assets/img/my image.jpg" alt="Profile">
          <div>
              <strong>${currentUser.name}</strong>
              <small>${new Date().toLocaleDateString()}</small>
          </div>
      </div>
  `;
  if (text) post.innerHTML += `<p>${text}</p>`;
  if (file) {
      const reader = new FileReader();
      reader.onload = function () {
          post.innerHTML += `<img src="${reader.result}" alt="Post Image">`;
      };
      reader.readAsDataURL(file);
  }
  postsSection.prepend(post);
}

function openModal() {
  document.querySelector('.user-info').innerHTML = currentUser.getInfo();
  document.querySelector('.modal').style.display = 'flex';
}

function closeModal() {
  document.querySelector('.modal').style.display = 'none';
}
