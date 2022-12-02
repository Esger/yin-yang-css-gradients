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

        const whiteHeadX = 'calc(50vw + ' + dx(angle) + 'vmin)';
        const whiteHeadY = 'calc(' + centerY + ' - ' + dy(angle) + 'vmin)';
        const whiteRightX = 'calc(' + dx(angle) + 'vmin)';
        const whiteRightY = 'calc(' + centerY + ' - ' + dy(angle) + 'vmin)';
        const blackHeadX = '50vw';
        const blackHeadY = 'calc(' + centerY + ' + ' + quarterSize + 'vmin)';
        const front = 'radial-gradient(circle, transparent ' + halfSize + 'vmin, ' + foreGround + ' ' + halfSize + 'vmin 100%)';
        const whiteHead = {
            gradient: radialGradient(whiteHeadX, whiteHeadY, black, dotSize, white, quarterSize),
            position: '0',
            size: '100%'
        };
        const blackHead = {
            gradient: radialGradient(blackHeadX, blackHeadY, white, dotSize, black, quarterSize),
            position: '0',
            size: '100%'
        };
        const whiteLeft = {
            gradient: linearGradient(angle, white, centerX, 'transparent'),
            position: '0',
            size: '100%'
        };
        const whiteRight = {
            gradient: radialGradient(whiteRightX, whiteRightY, 'transparent', quarterSize, white, 50),
            position: '100%',
            size: '50%'
        };
        const blackLeft = {
            gradient: radialGradient(blackHeadX, blackHeadY, 'transparent', quarterSize, black, 50),
            position: '0',
            size: '50%'
        };
        // const blackLeft = linearGradient(0, black, centerX, 'transparent');
        const blackRight = {
            gradient: linearGradient(0, 'transparent', centerX, black),
            position: '0',
            size: '100%'
        };
        const phase0 = [whiteRight];
        // const phase0 = [whiteHead, blackHead, whiteLeft, blackRight, whiteRight, blackLeft,];
        const phase1 = [front, whiteRight, blackLeft, whiteHead, whiteLeft, blackHead, blackRight,];
        const phase2 = [front, whiteHead, blackHead, whiteLeft, blackRight, whiteRight, blackLeft,];
        const phase3 = [whiteHead, blackHead, whiteLeft, blackRight, whiteRight, blackLeft,];

        const phases = [phase0, phase1, phase2, phase3];
        const phaseIndex = Math.floor((angle % 720) / 180);

        const backgroundImage = phases[phaseIndex].map(item => item.gradient).join(', ');
        const backgroundPosition = phases[phaseIndex].map(item => item.position).join(', ');
        const backgroundSize = phases[phaseIndex].map(item => item.size).join(', ');

        const container = document.getElementsByTagName('body')[0];
        container.style.backgroundImage = backgroundImage;
        container.style.backgroundPosition = backgroundPosition;
        container.style.backgroundSize = backgroundSize;

        console.log(backgroundImage);
    };

    setGradients(0);

    const rangeInput = document.getElementsByClassName('angleInput')[0];
    rangeInput.addEventListener('change', element => {
        setGradients(parseInt(element.target.value));
    });
});