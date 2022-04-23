// creates range of numbers
const range = (low, high,step) => ( 
    [...Array(Math.ceil((high-low + 1) / step))].map((_, i) => i*step+low)
)

export default range