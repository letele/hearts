// Split array into  chunks of arrays with N elements each 
const splitArray = (arr, N) => [...Array(Math.ceil(arr.length/N))]
.map( (_,i) => arr.slice(i*N ,(i+1)*N))

export default splitArray
