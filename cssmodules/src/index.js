import index from './style/index.scss';
import './style/global.scss'
var html = `<div class="${index.header}">
    <h2 class="${index.title}">CSS Modules</h2>
</div>`

document.getElementById('container').innerHTML = html;