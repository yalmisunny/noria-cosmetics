document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
          root: null,
          rootMargin: '0px',
          threshold: 0.15
    };

                            const observer = new IntersectionObserver((entries, observer) => {
                                  entries.forEach(entry => {
                                          if (entry.isIntersecting) {
                                                    entry.target.classList.add('visible');
                                                    observer.unobserve(entry.target); // Stop observing once it's visible
                                          }
                                  });
                            }, observerOptions);

                            const targets = document.querySelectorAll('.fade-in');
    targets.forEach(target => {
          observer.observe(target);
    });
});
