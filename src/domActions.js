const body = document.querySelector('body');

export function init() {
  const titleDiv = document.createElement('div');
  const header = document.createElement('h1');
  titleDiv.id = 'title';
  header.innerText = '.battleship';
  titleDiv.appendChild(header);
  body.appendChild(titleDiv);
  const content = document.createElement('div');
  content.id = 'content';
  body.appendChild(content);
}

export function greeter() {
  const cont = document.getElementById('content');
  const wrapper = document.createElement('div');
  for (let i = 0; i < 2; i += 1) {
    const div = document.createElement('div');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.classList.add('name');
    input.placeholder = `Player ${i + 1}`;
    div.classList.add(`player${i + 1}`);
    div.appendChild(input);
    // make the slider later, stick with checkbox for now
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('computer');
    div.appendChild(checkbox);
    wrapper.appendChild(div);
  }
  wrapper.classList.add('wrapper');
  const begin = document.createElement('input');
  begin.setAttribute('type', 'button');
  begin.value = 'Begin';
  begin.id = 'begin';
  wrapper.appendChild(begin);
  cont.appendChild(wrapper);
}
