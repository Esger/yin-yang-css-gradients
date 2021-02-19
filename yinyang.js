document.addEventListener("DOMContentLoaded", function (event) {

    // Convert from degrees to radians.
    Math.radians = (degrees) => {
        return degrees * Math.PI / 180;
    };

    const centerX = '50%';
    const centerY = '50vh';
    const size = 60;
    const halfSize = size / 2;
    const quarterSize = size / 4;
    const dotSize = size / 10;
    const black = '#191919';
    const white = '#e6e6e6';
    const foreGround = '#81d4fa';

    const dx = (angle) => {
        return (Math.sin(Math.radians(angle)) * quarterSize).toFixed(2);
    };
    const dy = (angle) => {
        return (Math.cos(Math.radians(angle)) * quarterSize).toFixed(2);
    };
    const radialGradient = (posX, posY, color1, stop1, color2, stop2, color3 = 'transparent') => {
        return ['radial-gradient(circle at ' + posX + ' ' + posY,
        color1 + ' 0 ' + stop1 + 'vmin',
        color2 + ' ' + stop1 + 'vmin ' + stop2 + 'vmin',
        color3 + ' 0 100%)']
            .join(', ');
    };
    const linearGradient = (angle, color1, stop1, color2, stop2 = '100%') => {
        const result = ['linear-gradient(' + (angle + 90) + 'deg',
        color1 + ' 0 ' + stop1,
        color2 + ' 0 ' + stop2 + ')'
        ];
        return result.join(', ');
    };

    setGradients = (angle) => {

        const blackDotX = 'calc(50vw + ' + dx(angle) + 'vmin)';
        const blackDotY = 'calc(' + centerY + ' - ' + dy(angle) + 'vmin)';
        const whiteDotX = '50vw';
        const whiteDotY = 'calc(' + centerY + ' + ' + quarterSize + 'vmin)';
        const front = 'radial-gradient(circle, transparent ' + halfSize + 'vmin, ' + foreGround + ' ' + halfSize + 'vmin 100%)';
        const whiteHead = radialGradient(blackDotX, blackDotY, black, dotSize, white, quarterSize);
        const blackHead = radialGradient(whiteDotX, whiteDotY, white, dotSize, black, quarterSize);
        const whiteLeft = linearGradient(angle, white, centerX, 'transparent');
        const whiteRight = linearGradient(angle, 'transparent', centerX, white);
        const blackLeft = linearGradient(0, black, centerX, 'transparent');
        const blackRight = linearGradient(0, 'transparent', centerX, black);
        const phase0 = [whiteHead, blackHead, whiteLeft, blackRight, whiteRight, blackLeft,];
        const phase1 = [whiteHead, blackHead, whiteLeft, whiteRight, blackRight, blackLeft,];
        const phase2 = [front, whiteHead, blackHead, whiteLeft, blackRight, whiteRight, blackLeft,];
        const phase3 = [whiteHead, blackHead, whiteLeft, blackRight, whiteRight, blackLeft,];
        const phases = [phase0, phase1, phase2, phase3];
        const phaseIndex = Math.floor((angle % 720) / 180);
        const backgroundImage = phases[phaseIndex].join(', ');
        const container = document.getElementsByTagName('body')[0];
        container.style.backgroundImage = backgroundImage;
        console.log(backgroundImage);
    };

    setGradients(20);
});