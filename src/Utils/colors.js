export const getBackgroundColor = value => {
    let color;
    if (value === 0) {
        color = '';
    } else if (value >= 1 && value < 10) {
        color = 'red';
    } else if (value >= 10 && value < 20) {
        color = 'orange';
    } else if (value >= 20 && value < 30) {
        color = '#df6868';
    } else if (value >= 30 && value < 40) {
        color = ' #492222';
    } else if (value >= 40 && value < 70) {
        color = '#c96a0a';
    } else if (value >= 80 && value < 100) {
        color = ' #c90a8c';
    } else if (value >= 100 && value < 120) {
        color = ' #c9960a';
    } else if (value >= 120 && value < 130) {
        color = ' #c9960a';
    } else if (value >= 130 && value < 140) {
        color = ' #0a79c9';
    } else if (value >= 140 && value < 150) {
        color = ' #c90a56';
    } else if (value >= 150 && value < 159) {
        color = ' #e0c375';
    } else if (value >= 160 && value < 170) {
        color = ' #d83030';
    }
    return color;
};
