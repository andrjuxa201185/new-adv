function MyParallax (wrapper, inner) {
    let windowHeight = window.innerHeight;
    let startInnerOffset = wrapper.offsetHeight - inner.offsetHeight;
    let k = (- windowHeight / startInnerOffset) / 2;
    let y = (windowHeight - wrapper.getBoundingClientRect().bottom) / k+ startInnerOffset;
    inner.style.transform = 'translateY(' + y + 'px)';

    window.addEventListener("scroll", function(){
        let wrapperBounding = wrapper.getBoundingClientRect();
        if (wrapperBounding.top < windowHeight && wrapperBounding.bottom > 0) {
            y = (windowHeight - wrapperBounding.bottom) / k + startInnerOffset;
            inner.style.transform = 'translateY(' + y + 'px)';
        }
    });
}

window.addEventListener("load", function(){
    let wrapper = document.getElementsByClassName('wrapper-parallax');
    let inner = document.getElementsByClassName('inner-parallax');

    for (let i = 0; i < wrapper.length; i++) {
        new MyParallax(wrapper[i], inner[i]);
    }
});