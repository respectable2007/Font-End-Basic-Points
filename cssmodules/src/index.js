import index from './style/index.css';
import './style/global.css'
var html = `<div class="${index.header}">
    <h2 class="${index.title}">CSS Modules</h2>
</div>`

document.getElementById('container').innerHTML = html;