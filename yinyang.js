document.addEventListener("DOMContentLoaded", function (event) {

    // Convert from degrees to radians.
    Math.radians = (degrees) => {
        return degrees * Math.PI / 180;
    };

    setGradients = (angle) => {
        const centerX = '50vw';
        const centerY = '50vh';
        // const size = '60vmin';
        // const halfSize = '30vmin';
        const quarterSize = 15;
        const dotSize = 5;

        const dx = (angle) => {
            return (Math.cos(Math.radians(angle)) * quarterSize).toFixed(2);
        };
        const dy = (angle) => {
            return (Math.sin(Math.radians(angle)) * quarterSize).toFixed(2);
        };
        const blackDotX = '50%';
        const blackDotY = 'calc(' + centerY + ' - ' + quarterSize + 'vmin)';
        const whiteDotX = 'calc(50% + ' + dx(angle) + 'vmin)';
        const whiteDotY = 'calc(' + centerY + ' + ' + dy(angle) + 'vmin)';
        const black = '#191919';
        const white = '#e6e6e6';
        let blackHead = 'radial-gradient(circle at ' + whiteDotX + ' ' + whiteDotY + ', ' + white + ' 0 ' + dotSize + 'vmin, ' + black + ' 0 ' + quarterSize + 'vmin, transparent 0 100%)';
        let blackHalfRight = 'linear-gradient(' + angle + 'deg, transparent 0' + centerX + ', ' + black + ' ' + centerX + ' 100%)';
        let whiteHead = 'radial-gradient(circle at ' + blackDotX + ' ' + blackDotY + ', ' + black + ' ' + dotSize + 'vmin, ' + white + ' 0 ' + quarterSize + 'vmin, transparent 0 100%)';
        let whiteHalfLeft = 'linear-gradient(' + angle + 'deg, ' + white + ' 0 ' + centerX + ', transparent ' + centerX + ' 100%)';
        const gradients = [blackHead, whiteHead, blackHalfRight, whiteHalfLeft]; //
        const backgroundImage = gradients.join(', ');
        const html = document.getElementsByTagName('html')[0];
        html.style.backgroundImage = backgroundImage;
        console.log(backgroundImage);
    };

    setGradients(90);
});