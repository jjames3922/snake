import '../scss/all.scss';
(function(){
    const fragment = document.createDocumentFragment();
    const playMap = document.querySelector('.playMap');
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 28; j++) {
            const item = document.createElement('div');
            item.className = 'playMap__item';
            fragment.append(item);
        }
    }
    playMap.appendChild(fragment);
}());