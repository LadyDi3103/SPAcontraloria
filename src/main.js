
document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.sidenav');
    let instance = M.Sidenav.getInstance(elems);
    instance = M.Sidenav.init(elems);

    const elemCarousel = document.querySelectorAll('.carousel');

    let instanceCarousel = M.Carousel.getInstance(elemCarousel);
     instanceCarousel = M.Carousel.init(elemCarousel, {
        fullWidth: true,
        indicators: true
      });
     
} );
