document.addEventListener("DOMContentLoaded", function (event) {

    // Convert from degrees to radians.
    Math.radians = (degrees) => {
        return degrees * Math.PI / 180;
    };

    setGradients = (angle) => {
        const centerX = '50%';
        const centerY = '50vh';
        const size = 60;
        const halfSize = size / 2;
        const quarterSize = size / 4;
        const dotSize = size / 10;
        foreGround = '#81d4fa';

        const dx = (angle) => {
            return (Math.sin(Math.radians(angle)) * quarterSize).toFixed(2);
        };
        const dy = (angle) => {
            return (Math.cos(Math.radians(angle)) * quarterSize).toFixed(2);
        };
        const blackDotX = 'calc(50vw + ' + dx(angle) + 'vmin)';
        const blackDotY = 'calc(' + centerY + ' - ' + dy(angle) + 'vmin)';
        const whiteDotX = '50vw';
        const whiteDotY = 'calc(' + centerY + ' + ' + quarterSize + 'vmin)';
        const black = '#191919';
        const white = '#e6e6e6';
        const front = 'radial-gradient(circle, transparent ' + halfSize + 'vmin, ' + foreGround + ' ' + halfSize + 'vmin 100%)';
        let whiteHead = 'radial-gradient(circle at ' + blackDotX + ' ' + blackDotY + ', ' + black + ' 0 ' + dotSize + 'vmin, ' + white + ' 0 ' + quarterSize + 'vmin, transparent 0 100%)';
        let blackHead = 'radial-gradient(circle at ' + whiteDotX + ' ' + whiteDotY + ', ' + white + ' 0 ' + dotSize + 'vmin, ' + black + ' 0 ' + quarterSize + 'vmin, transparent 0 100%)';
        let whiteHalfLeft = 'linear-gradient(' + (angle + 90) + 'deg, ' + white + ' 0 ' + centerX + ', transparent ' + centerX + ' 100%)';
        let blackHalfRight = 'linear-gradient(90deg, transparent 0' + centerX + ', ' + black + ' ' + centerX + ' 100%)';
        const gradients = [front, whiteHead, blackHead, blackHalfRight, whiteHalfLeft]; //front, 
        const backgroundImage = gradients.join(', ');
        const container = document.getElementsByTagName('body')[0];
        container.style.backgroundImage = backgroundImage;
        // console.log(backgroundImage);
    };

    setGradients(30);
});