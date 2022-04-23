// shuffles an array: used to randomly position elements in an array
const shuffleArray = array => {
    // generate a random number
    const i = Math.floor(Math.random()*array.length);
    //use number as index to randomly select element from array
    return array.length === 1 ?
    array : [array[i], ...shuffleArray(array.filter((_,j) => j !== i))];
};

export default shuffleArray