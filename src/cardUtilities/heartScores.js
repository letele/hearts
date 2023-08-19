export function heartScores() {

    const cardScores = cards => 
    cards.includes('Sq') ? 12 + cards.length : cards.length
    
    const scoreOrder = arr=> Object.entries(arr)
    .sort((a,b) => a[1] - b[1])

    const grouped = array => array.reduce((prev, curr, i, arr) => {
        (arr[i - 1] && curr[1] === arr[i - 1][1]) ?
        prev[prev.length - 1].push(curr[0]) : prev.push(([curr[0]]))
        
        return prev;
    }, []);

    const places = ['First', 'Second', 'Third', 'Fourth']

    const pos = (val,arr) => grouped(scoreOrder(arr)).map((i,v) => 
    i.includes(val) && v).filter(i => Number.isInteger(i)).pop()

    const findPlaces = val => places[val]

    const orderScores = scores => {
        const allScores = {}
        Object.keys(scores).forEach(
            i => allScores[i] = findPlaces(pos(i,scores))
        )
        return allScores
    }

    const totalScore = array => array.reduce((acc,obj) => {
        Object.entries(obj)
        .forEach(([key, value]) => acc[key] = (acc[key] || 0) + value);
        return acc;
    }, {})

    return {
        cardScores,
        totalScore,
        orderScores,
    }
}