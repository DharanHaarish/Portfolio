document.addEventListener('DOMContentLoaded', function() {
    function collapseAllProjectCards() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.remove('expanded');
            const details = card.querySelector('.card-details');
            if (details) details.style.display = 'none';
        });
    }

    document.querySelectorAll('.project-card').forEach(card => {
        const showMoreBtn = card.querySelector('.show-more-btn');
        const showLessBtn = card.querySelector('.show-less-btn');
        const cardDetails = card.querySelector('.card-details');

        showMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            collapseAllProjectCards();
            card.classList.add('expanded');
            cardDetails.style.display = 'block';
        });

        showLessBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            card.classList.remove('expanded');
            cardDetails.style.display = 'none';
        });
    });

    // Collapse on click outside or escape
    document.addEventListener('click', function(e) {
        document.querySelectorAll('.project-card.expanded').forEach(card => {
            if (!card.contains(e.target)) {
                card.classList.remove('expanded');
                const details = card.querySelector('.card-details');
                if (details) details.style.display = 'none';
            }
        });
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            collapseAllProjectCards();
        }
    });
}); 