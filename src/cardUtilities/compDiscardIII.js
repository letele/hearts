import { range } from "../utilities"

function compDiscardIII(hand){
    
    const [ clubs, diamonds, spades, hearts ] = hand
    
    // Order of card values
    const ranks = [...range(2,10,1).map(String),"J", "Q", "K", "A"]

    // Function that returns ranks of suit
    const r = suit => suit.map(i=>i[0])
          
    // Checks the presence of Q
    const qPresent = r(spades).includes("Q")

    const QKA = spades.slice(r(spades).indexOf("Q"))

    const select = n =>[clubs,diamonds]
    .sort( (a, b) => b.length - a.length).flat().slice(-n)

    // Select elements from arr1 in arr2
    const selectElements = (arr1,arr2,start,end) => 
    arr1.filter(i => arr2.slice(start,end).includes(i[0]))
    
    // Divides array in four subsets. 
    const subSets = suit => [[0,3],[3,6],[6,9],[9,13]]
    .map(i => selectElements(suit,ranks,i[0],i[1]))
    
    const badHearts = subSets(hearts).slice(-2).flat()

    let selected
    
    const set = arr => selected = arr

    const qkaLengthI = () => 
    QKA.length === 1 ? 
    ( qPresent ?  
        set([...QKA, ...select(2)]) :
        ((clubs.length<5 || diamonds.length<5) ?
        set(select(3)) : set([...QKA, ...select(2)]))
    ) :  set(select(3))

    const qkaLengthII = () =>
    (QKA.length === 2) ? 
    set([...QKA, ...select(1)]) : qkaLengthI()
    
    const qkaLengthIII = () =>
    (QKA.length === 3) ? set(QKA) : qkaLengthII()
    
    const qkaLengthIV = () =>
    QKA.length ? (
        (badHearts.length) ? (
            badHearts.length<3 ?
            set([...badHearts, ...select(3-badHearts.length)]) :
            set(badHearts.slice(-3))  
        ) : set(select(3)) 
    ) :  set(select(3))
    
    // Case 1: 0 spades
    const caseI = () => 
    (spades.length===0) && set(select(3))
    // Case 2: 1 Spade
    const caseII = () => (spades.length === 1) && qkaLengthI() 
    // Case 3: 2 Spades
    const caseIII = () => (spades.length === 2) && qkaLengthII()
    // Case 4: 3 or 4 Spades
    const caseIV = () => 
    (spades.length === 3 || spades.length === 4) && qkaLengthIII()
    // Case 5: Spades > 4
    const caseV = () => (spades.length>4) && qkaLengthIV()
       
    caseI()
    caseII()
    caseIII()
    caseIV()
    caseV()

    return selected
}

export default compDiscardIII