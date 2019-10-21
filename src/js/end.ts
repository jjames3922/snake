import '../scss/all.scss';

(function(){
    document.addEventListener("DOMContentLoaded", function(event) { 
        const score = document.querySelector('#score');
        score.textContent = localStorage.getItem('snake-score');
    });
    window.addEventListener('keyup', e => {
        if (e.key === ' ') {
            document.location.href = '/'
        }
    })
}())