import index from './style/index.scss';
import index1 from './style/index.scss';
import './style/global.scss';
var style = index,
    html = `<div class="${style.header}">
    <h2 class="${style.title}">CSS Modules</h2>
</div>`;
document.getElementById('container').innerHTML = html;
var skin = document.getElementById('skin');
function changeSkin(){
  style = index1;
}
skin.addEventListener('click',changeSkin,false);