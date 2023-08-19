import { playingCards } from '.';

export function selectIIICards(cards){

    // Order the given hand
    const {groupCards,ranks} = playingCards()
    

    // Splits cards in their respective suits 
    const clubsCards =  groupCards(cards.filter(i => i[0] === 'C'))
    const spadesCards = groupCards(cards.filter(i => i[0] === 'S'))
    const heartsCards = groupCards(cards.filter(i => i[0] === 'H'))
    const diamondsCards = groupCards(cards.filter(i => i[0] === 'D'))

    // Get the largest n cards from clubs and diamonds
    const clubsDiamondSelection = n => [...clubsCards,...diamondsCards].sort(
        (a,b) => ranks.indexOf(a.slice(1)) - ranks.indexOf(b.slice(1))
    ).slice(-n)

    // Selecting from Hearts suit
    // define hearts cards of high ranks
    const indices = [['H8', 'H9', 'H10'],['Hj', 'Hq', 'Hk', 'Ha']]
    const badHeartsI = heartsCards.filter(i => indices[0].includes(i)) 
    const badHeartsII = heartsCards.filter(i => indices[1].includes(i)) 
    const badHearts = [...badHeartsI, ...badHeartsII]

    // Check if Q is present in spades
    const qPresent  = spadesCards.includes('Sq')
    // Get QKA from spades suit
    const QKA = spadesCards.slice(spadesCards.indexOf("Sq"))

    // Variable that will store selected cards
    let selected
    const set = arr => selected = arr
    
    const qkaLengthI = () => QKA.length === 1 ? 
    ( qPresent ?  
        set([...QKA, ...clubsDiamondSelection(2)]) :
        ((clubsCards.length<5 || diamondsCards.length<5) ?
        set(clubsDiamondSelection(3)) : set([...QKA, ...clubsDiamondSelection(2)]))
    ) :  set(clubsDiamondSelection(3))

    const qkaLengthII = () => QKA.length === 2 ? 
    set([...QKA, ...clubsDiamondSelection(1)]) : qkaLengthI()
    
    const qkaLengthIII = () =>
    QKA.length === 3 ? set(QKA) : qkaLengthII()
    
    const qkaLengthIV = () =>
    QKA.length ? (
        (badHearts.length) ? (
            badHearts.length<3 ?
            set([...badHearts, ...clubsDiamondSelection(3-badHearts.length)]) :
            set(badHearts.slice(-3))  
        ) : set(clubsDiamondSelection(3)) 
    ) :  set(clubsDiamondSelection(3))

    // Case 1: 0 spades
    const caseI = () => 
    (spadesCards.length===0) && set(clubsDiamondSelection(3))
    // Case 2: 1 Spade
    const caseII = () => (spadesCards.length === 1) && qkaLengthI() 
    // Case 3: 2 Spades
    const caseIII = () => (spadesCards.length === 2) && qkaLengthII()
    // Case 4: 3 or 4 Spades
    const caseIV = () => 
    (spadesCards.length === 3 || spadesCards.length === 4) && qkaLengthIII()
    // Case 5: Spades > 4
    const caseV = () => (spadesCards.length>4) && qkaLengthIV()
           
    caseI()
    caseII()
    caseIII()
    caseIV()
    caseV()

    
    return selected
}