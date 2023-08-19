import { createContext, useContext,useEffect, useState } from "react";
import { shuffleArray } from "@letele/ecmascripts";
import { GameContext,UIContext } from ".";
import { 
    playingCards, selectIIICards,selectICard,compDiscard 
} from "../cardUtilities";

export const HeartsContext = createContext();

export const withHeartsContext = Component => props => {

    const { evaluateScore,startNew  } = useContext(GameContext)

    const {setToggle} = useContext(UIContext)

    const [eastCards, setEastCards] = useState(null)
    const [westCards, setWestCards] = useState(null)
    const [northCards, setNorthCards] = useState(null)
    const [southCards, setSouthCards] = useState(null)

    const [eastDiscard, setEastDiscard] = useState(null)
    const [westDiscard, setWestDiscard] = useState(null)    
    const [southDiscard, setSouthDiscard] = useState(null)
    const [northDiscard, setNorthDiscard] = useState(null)

    const [eastAcc,  setEastAcc] = useState([])
    const [westAcc,  setWestAcc] = useState([])
    const [northAcc, setNorthAcc] = useState([])
    const [southAcc, setSouthAcc] = useState([])

    const [southIIICards,setSouthIIICards] = useState([])
    const [compIIICards, setCompIIICards] = useState(null) 

    const [activeCard, setActiveCard] = useState(null)

    const [activePlayer, setActivePLayer] = useState(null)
    
    const [hand ,setHand] = useState(0)

    const [handOver ,setHandOver] = useState(false)
    
    const [heartBroken, setHeartBroken] = useState(false)
    
    const [selectedCards, setSelectedCards] = useState([])
    
    const [swaped, setSwaped] = useState(false)
    
    const [tricks ,setTricks] = useState(0)
    
    const [tricksDone ,setTricksDone] = useState(false)
    
    const setState = {
        eastCards:setEastCards,
        westCards:setWestCards,
        northCards:setNorthCards,
        southCards:setSouthCards,
        eastAcc:setEastAcc,
        westAcc:setWestAcc,
        northAcc:setNorthAcc,
        southAcc:setSouthAcc,
    }

    const setCards = {
        eastCards:setEastCards,
        westCards:setWestCards,
        northCards:setNorthCards,
        southCards:setSouthCards,
    }

    const setAcc = {
        eastAcc:setEastAcc,
        westAcc:setWestAcc,
        northAcc:setNorthAcc,
        southAcc:setSouthAcc,
    }

    const setDiscard = {
        west:setWestDiscard,
        east:setEastDiscard,
        north:setNorthDiscard,
        south:setSouthDiscard,
    }

    const {
        heartsDealer,
        players,
        groupCards,
        orderCardsByRank,
        swapCards,
        orderOfPlayers,
    } = playingCards()

    const delay = 500
    
    // Players swap their three selected cards
    const passCards = () => {
        const allCards = { westCards,  eastCards, northCards, southCards }
        
        // Set the state of cards after they are swaped  
        players.forEach(i => setCards[`${i}Cards`](
           i==='south' ?
           groupCards(swapCards(i,southIIICards,allCards,hand)) :
           shuffleArray(swapCards(i,southIIICards,allCards,hand))
        ))
        
        // Keep track of selected cards and remove after they are swaped
        setSelectedCards([...selectedCards,...southIIICards])
        setTimeout(()=> setSelectedCards([]),900)

        // Reset selected cards
        setCompIIICards(null)
        setSouthIIICards([])  
        setSwaped(true)
        
    }

    // Function that automatically plays for players before south
    const playTricksBeforeSouth = () => {
        const cards = { 
            west:westCards,  east:eastCards, 
            north:northCards, south:southCards,
        }

        const playerOrder = orderOfPlayers(activeCard,cards)
        
        // Store selected cards in a dictionary called pool 
        const pool = playerOrder.reduce((prev, curr) => {
            prev[curr] = selectICard(activeCard,cards[curr])
            return prev
        },{})

        // Function that set sets discard cards and removes them from 
        // players hand
        const play = n => playerOrder.slice(0,n).forEach((i,j) => {
            setTimeout(() => {
                
                !heartBroken && pool[i][0]==='H' && setHeartBroken(true)

                setDiscard[i](pool[i])
                
                setCards[`${i}Cards`](cards[i].filter(j => j!==pool[i]))
            }, delay*j);
        }) 

        const autoPlay = n => {
            play(n)
            setTimeout(() => setTricksDone(true) , delay*n);
        }

        playerOrder[0] === 'east' &&  autoPlay(1) 

        playerOrder[0] === 'north' && autoPlay(2) 

        playerOrder[0] === 'west' &&  autoPlay(3) 
    }
        
    // Function that selects and removes 1 card from south player and
    // plays for players after south player
    const removeICard = card => {
        if(tricksDone && !southDiscard){
            setTricksDone(false)
            
            const cards = { 
                west:westCards,  east:eastCards, 
                north:northCards, south:southCards,
            }
            
            const southHand = () => {
                !heartBroken && card[0] === 'H' && setHeartBroken(true)
                setSouthDiscard(card)
                setSouthCards(southCards.filter(i => i!==card))
            }

            const autoPlay = n => {
                southHand()
                players.slice(0,n).forEach((i,j) => {
                    // select cards for players playing after south
                    const selected = selectICard(activeCard,cards[i])
                    
                    !heartBroken && selected[0] === 'H' && setHeartBroken(true)

                    setTimeout(() => {
                        setDiscard[i](selected)
                        setCards[`${i}Cards`](cards[i].filter(j => j!==selected))
                    }, delay*(j+1))
                })
            }
            // West has active card
            westDiscard && northDiscard  && eastDiscard 
            && westDiscard===activeCard && southHand()
            
            // North has active card
            northDiscard  && eastDiscard && 
            northDiscard===activeCard && autoPlay(1)
            
            // East has active card
            eastDiscard && eastDiscard===activeCard && autoPlay(2)
            
            // South has active card
            card===activeCard && autoPlay(3)       
        }
    }

    // Function that removes 3 cards as they are selected from south player
    const removeIIICards = card => {
        const cardPresent = southIIICards.includes(card) 
        const removeCard = [...southIIICards.filter(i => i!==card )]
        const addCard = [...southIIICards, card]
        southIIICards.length < 3 ? (
            cardPresent ? setSouthIIICards(removeCard) : setSouthIIICards(addCard) 
        ) : cardPresent && setSouthIIICards(removeCard) 
    }

    const southDrawCard = (card,hand) => {
        const heartsOnly = hand.every(i => i[0] === 'H')    
        
        if(activePlayer!=='south'){
            
            const suitPresent = hand.some(i=>i[0]===activeCard[0])
        
            if(suitPresent && card[0]===activeCard[0]){
                removeICard(card)
            }
            
            if(!suitPresent){
                if(tricks===1){
                    if((card!=='Sq' && card[0]!=='H')||heartsOnly){   
                        removeICard(card)
                    }
                }
                if(tricks>1){       
                    removeICard(card)
                }
            }
        }

        if(activePlayer==='south'){
            if(activeCard && card===activeCard){
                removeICard(card)
            }
            if(!activeCard){
                if(heartsOnly || heartBroken){
                    setActiveCard(card)
                }
                if(!heartBroken  && card[0]!=='H'){
                    setActiveCard(card)
                }
            }
        }
    }

    const playNextHand = () => {
        Object.keys(setAcc).forEach(key => setAcc[key]([]))
        setHandOver(false)
        setHand(hand+1)   
        setHeartBroken(false)
        setActivePLayer(null)
    }
    
    const playAgain = () => {
        Object.keys(setAcc).forEach(key => setAcc[key]([]))
        Object.keys(setDiscard).forEach(key => setDiscard[key](null))
        setHandOver(false)
        setHeartBroken(false)
        setActivePLayer(null)
        setHand(0)   
    }
    
    useEffect(()=>{
        activeCard && activePlayer==='south' && 
        activeCard!=='C2'  && removeICard(activeCard)
    },[activeCard])


    // Initialise cards when game/hand starts 
    useEffect(() => {     
        
        // Deal cards to the players 
        const {east, north, west,south} = heartsDealer()
        
        // Computer selects three cards to pass
        const selected = {
            east: selectIIICards(east),
            north: selectIIICards(north),
            west: selectIIICards(west),
        }
        // Skips card selection if hand is on third round
        !(hand%4===3) ? setCompIIICards(selected) : setSwaped(true)

        !(hand%4===3) && setSelectedCards([
            ...selected['east'],...selected['west'],...selected['north']
        ])
        
        // Sets the first active card to 2 of clubs
        setActiveCard('C2')

        // Update state of players cards 
        const hands = {east, north, west,south}
        players.forEach(i => setCards[`${i}Cards`](hands[i]))

    },[hand,startNew]) 

    // Find player with active card:2 clubs and increment tricks
    useEffect(() => {
        if(swaped){ 
            setSwaped(false)
            const cards = { 
                west:westCards,  east:eastCards, 
                north:northCards, south:southCards,
            }
            // Find player with active card
            const findActivePlayer = Object.keys(cards).reduce(
                (active, key) => cards[key].includes(activeCard) ? key : active
            , null)

            setTimeout(() => {
                findActivePlayer==='south' && setTricksDone(true)
                setActivePLayer(findActivePlayer)
                setTricks(tricks + 1)
            }, 4*delay)
        }
    },[swaped])
    
    // Players discard selected cards
    useEffect(() => {
        if(eastDiscard && westDiscard && southDiscard && northDiscard){
            const cards = { 
                west:westCards,  east:eastCards, 
                north:northCards, south:southCards,
            }
            
            const discards = {
                east:eastDiscard, west:westDiscard, 
                south:southDiscard, north:northDiscard
            }
            const acc = { westAcc, eastAcc, northAcc, southAcc}

            // Removes discarded cards from players cards 
            const updatedCards = Object.entries(cards)
            .reduce((prev, [key,value]) => {
                prev[key] = value.filter(i => discards[key]!== i)
                return prev
            },{})
            // Order discarded cards
            const discardsOrder = orderCardsByRank(
                Object.values(discards).filter(i => i[0]===activeCard[0])
            )
            // Find player with highest rank of discarded cards
            const cond =(arr,a,b) => arr.indexOf(a) > arr.indexOf(b)  
            const discardsOwner = Object.keys(discards).reduce(
                (a,b) => cond(discardsOrder,discards[a],discards[b])? a:b 
            )

            // Collect hearts cards or queen of spades from discarded cards
            const accCards = Object.values(discards)
            .filter(i => i[0]==='H'||i==='Sq')

            setTimeout(() => {

                const activeHand = updatedCards[discardsOwner]
                
                setActiveCard(discardsOwner !== 'south'?
                    compDiscard(activeHand,heartBroken) : null
                )

                discardsOwner === 'south' && setTricksDone(true)

                setActivePLayer(discardsOwner)
                // Add discarded cards to player with highest rank of active card
                setAcc[`${discardsOwner}Acc`](
                    [...acc[`${discardsOwner}Acc`],...accCards]
                )
                // Reset discarded cards
                Object.keys(setDiscard).forEach(key=> setDiscard[key](null))

                setTricks(tricks + 1)

            }, 0.5*delay)
        }
    },[eastDiscard, westDiscard, southDiscard, northDiscard])

    useEffect(()=>{
        tricks && activeCard && playTricksBeforeSouth()

        if(tricks===14){
            setTricks(0)
            setActivePLayer(null)
            setActiveCard(null)
            setHandOver(true)
            setToggle("ScoreTable")   
        }
    },[tricks])

    // Updates score for each hand when cards are finished
    useEffect(() => {
        if(handOver){        
            const accScores = {eastAcc, westAcc ,northAcc, southAcc}
            evaluateScore(accScores)      
        }
    
    },[handOver])
         

    const children = {
        // Collection of all states
        setState,

        // Used in Hands.jsx
        eastCards, westCards, northCards, southCards, 
        eastAcc, northAcc, southAcc, westAcc,  
        handOver,southIIICards, removeIIICards,
       
        // Used in DiscardPlie.js
        eastDiscard, westDiscard, northDiscard, southDiscard,

        // Used in Arrows.js
        hand, passCards,
        
        // Used in Hand.js, Arrow.js
        selectedCards, compIIICards, southDrawCard,
        
        // Used in Hand.js,
      
        // checkCard, discardThree,

        // Used in Hand.js Hands.js, GameScore.js
        // handOver,

        // Used in withModal.js
        playNextHand, playAgain
    }

    return(
        <HeartsContext.Provider value={{...children}} >
            <Component {...props} />    
        </HeartsContext.Provider>
    )
}
