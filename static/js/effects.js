document.addEventListener('DOMContentLoaded', function() {
    const title = document.getElementById('hover-title');
    const text = title.textContent;
    title.textContent = '';

    for (let char of text) {
        const span = document.createElement('span');
        if (char === ' ') {
            span.classList.add('space');
            span.innerHTML = '&nbsp;';
        } else {
            span.textContent = char;
        }
        title.appendChild(span);
    }

    const spans = title.querySelectorAll('span');

    spans.forEach((span, index) => {
        span.addEventListener('mouseover', () => {
            highlightLetters(index);
        });

        span.addEventListener('mouseout', () => {
            spans.forEach(s => s.classList.remove('highlight'));
        });
    });

    function highlightLetters(index) {
        const totalChars = spans.length;
        const spread = 3; // Número de caracteres para espalhar para cada lado

        for (let i = Math.max(0, index - spread); i <= Math.min(totalChars - 1, index + spread); i++) {
            spans[i].classList.add('highlight');
        }
    }
});