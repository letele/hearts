import { createContext, useContext, useEffect, useState } from "react";
import { playingCards } from "../../cardUtilities";
import { GameContext,UIContext } from "../Context";

export const HeartsContext = createContext();

export const withHeartsContext = Component => props => {

    const [eastCards, setEastCards] = useState(null)
    const [westCards, setWestCards] = useState(null)
    const [northCards, setNorthCards] = useState(null)
    const [southCards, setSouthCards] = useState(null)

    const [eastAcc,  setEastAcc] = useState([])
    const [westAcc,  setWestAcc] = useState([])
    const [northAcc, setNorthAcc] = useState([])
    const [southAcc, setSouthAcc] = useState([])

    
    const [eastDiscard, setEastDiscard] = useState(null)
    const [westDiscard, setWestDiscard] = useState(null)    
    const [southDiscard, setSouthDiscard] = useState(null)
    const [northDiscard, setNorthDiscard] = useState(null)
       
    
    const [compIIICards, setCompIIICards] = useState(null)  
    const [playerIIICards, setPlayerIIICards] = useState([])

    const [activeCard, setActiveCard] = useState(null)

    const [activePlayer, setActivePLayer] = useState(null)
    
    const [tricks ,setTricks] = useState(0)

    const [swaped, setSwaped] = useState(false)
    
    const [handOver ,setHandOver] = useState(false)

    const [hand ,setHand] = useState(0)

    const [heartBroken, setHeartBroken] = useState(false)

    const [trickIDone ,setTrickIDone] = useState(false)

    
    const {setToggled} = useContext(UIContext)

    const { evaluateScore,startNew  } = useContext(GameContext)
   
    const { 
        heartsDealer,
        players,
        threeSelector, 
        swapCards,
        orderOfPlayers,
        oneSelector,
        orderCardsByRank,
        compDiscardI,
        shuffleArray,
        group,
    } = playingCards()
    
    const setCards = {
        east:setEastCards,
        west:setWestCards,
        north:setNorthCards,
        south:setSouthCards,
    }

    const setDiscard = {
        west:setWestDiscard,
        east:setEastDiscard,
        north:setNorthDiscard,
        south:setSouthDiscard,
    }

    const setAcc = {
        west:setWestAcc,
        east:setEastAcc,
        north:setNorthAcc,
        south:setSouthAcc,
    }
    const acc = {
        west:westAcc,
        east:eastAcc,
        north:northAcc,
        south:southAcc,
    }

    const eqArray = (a,b) => 
    a.length && b.length && a.join() === b.join()

    const delay = 150
            

    // Player (South)
    const discardOne = val => {
        if(trickIDone && !southDiscard){
            
            setTrickIDone(false)
            
            const cards = { 
                west:westCards,  east:eastCards, 
                north:northCards, south:southCards,
            }
            
            const southHand = () => {
                !heartBroken && val[1] === '♥' && setHeartBroken(true)
                setSouthDiscard(val)
                setSouthCards(southCards.filter(i => !eqArray(i, val)))
            }

            const autoPlay = n => {
                southHand()
                players.slice(0,n).forEach((i,j) => {
                    const selected = oneSelector(activeCard,cards[i])
                    
                    !heartBroken && selected[1] === '♥' && setHeartBroken(true)

                    setTimeout(() => {
                        setDiscard[i](selected)
                        setCards[i](cards[i].filter(j => !eqArray(j,selected)))
                    }, delay*(j+1))

                })
            }

            westDiscard && northDiscard  && eastDiscard 
            && eqArray(westDiscard, activeCard) && southHand()

            northDiscard  && eastDiscard && 
            eqArray(northDiscard, activeCard) && autoPlay(1)
            
            eastDiscard &&
            eqArray(eastDiscard, activeCard) && autoPlay(2)
            
            eqArray(val, activeCard) && autoPlay(3)       
        }
    }


    // Player (South)
    const discardThree = val => {
        playerIIICards.length < 3 ? (
            playerIIICards.includes(val) ?
            setPlayerIIICards([...playerIIICards.filter(i => !eqArray(i,val)) ]) 
            : setPlayerIIICards([...playerIIICards, val]) 
        ) : 
        playerIIICards.includes(val) && 
        setPlayerIIICards([...playerIIICards.filter(i => !eqArray(i,val)) ]) 
    }
    


    // Players swap their three selected cards
    const passCards = () => {
        const cards = { westCards,  eastCards, northCards, southCards }

        players.forEach(i => setCards[i](
           i==='south' ?
           group(swapCards(i,playerIIICards,cards,hand)).flat() :
           shuffleArray(swapCards(i,playerIIICards,cards,hand))
        ))

        setCompIIICards(null)
        setPlayerIIICards([])  
        setSwaped(true)
        
    }

    const checkCard = (card,hand) => {
        const heartsOnly = hand.every(i => i[1] === '♥')

        const q = ['Q', '♠']
        
        if(activePlayer!=='south'){
            
            const suitPresent = hand.some(i=>i[1]===activeCard[1])
        
            if(suitPresent && card[1]===activeCard[1]){
                discardOne(card)
            }
            
            if(!suitPresent){
                if(tricks===1){
                    if((!eqArray(card,q) && card[1]!=='♥')||heartsOnly){   
                        discardOne(card)
                    }
                }
                
                if(tricks>1){       
                    discardOne(card)
                }
            }
        }

        if(activePlayer==='south'){
            if(activeCard && eqArray(card,activeCard)){
                discardOne(card)
            }

            if(!activeCard){
                if(heartsOnly || heartBroken){
                    setActiveCard(card)
                }

                if(!heartBroken  && card[1]!=='♥'){
                    setActiveCard(card)
                }
            }
        }
    }
    


    // Automatically plays tricks before South
    const playTricksBeforeSouth = () => {
        const cards = { 
            west:westCards,  east:eastCards, 
            north:northCards, south:southCards,
        }

        const playerOrder = orderOfPlayers(activeCard,cards)


        const pool = playerOrder.reduce((prev, curr) => {
            prev[curr] = oneSelector(activeCard,cards[curr])
            return prev
        },{})

        const play = n => playerOrder.slice(0,n).forEach((i,j) => {
            setTimeout(() => {
                
                !heartBroken && pool[i][1]==='♥' && setHeartBroken(true)

                setDiscard[i](pool[i])
                
                setCards[i](cards[i].filter(j => !eqArray(j,pool[i])))
            }, delay*j);
        }) 

        const autoPlay = n => {
            play(n)
            setTimeout(() => setTrickIDone(true) , delay*n);
        }

        playerOrder[0] === 'east' &&  autoPlay(1) 

        playerOrder[0] === 'north' && autoPlay(2) 

        playerOrder[0] === 'west' &&  autoPlay(3) 
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

    // deal cards to 4 players
    useEffect(() => {     
        const allHands = heartsDealer(4)
        
        const {east, north, west,south} = allHands

        !(hand%4===3) ? setCompIIICards({
            east: threeSelector(east),
            north: threeSelector(north),
            west: threeSelector(west),
        }) : setSwaped(true)

        setActiveCard(['2', '♣'])

        const hands = {
            east: shuffleArray(east),
            west: shuffleArray(west),
            north: shuffleArray(north),
            south: group(south).flat()
        }

        

        players.forEach(i => setCards[i](hands[i]))

    // eslint-disable-next-line
    },[hand,startNew]) 

    useEffect(() => {
        if(swaped){
            setSwaped(false)
            const cards = { 
                west:westCards,  east:eastCards, 
                north:northCards, south:southCards,
            }

            // resets swaped cards to be uniform with others
            hand%4!==3 && setTimeout(() => {
                players.forEach(i => 
                    setCards[i](cards[i].map(i => [i[0],i[1]]))
                )
            }, delay*2)
            
            // Find player with active card
            const findActivePlayer = Object.keys(cards)
            .filter(key => cards[key].map(i=>i.slice(0,2).join())
                .includes(activeCard.join()) && key
            ).pop()

            
            setTimeout(() => {
                findActivePlayer==='south' && setTrickIDone(true)
                setActivePLayer(findActivePlayer)
                setTricks(tricks + 1)
         
            }, 4*delay)
        }
    // eslint-disable-next-line    
    },[swaped])


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

            const updatedCards =Object.entries(cards)
            .reduce((prev, [key,value]) => {
                prev[key] = value.filter(i => !eqArray(discards[key], i))
                return prev
            },{})

            const discardsOrder = orderCardsByRank(
                Object.values(discards).filter(i => i[1]===activeCard[1])
            ).map(i => i.join())
            
            const cond =(arr,a,b)=> 
            arr.indexOf(a.join()) > arr.indexOf(b.join())
            
            const discardsOwner = Object.keys(discards).reduce(
                (a,b) => cond(discardsOrder,discards[a],discards[b])? a:b 
            )
            
            const accCards = Object.values(discards)
            .filter(i => i[1]==='♥'||eqArray(i,['Q', '♠']))

            
            
            
            setTimeout(() => {

                const activeHand = updatedCards[discardsOwner]
                
                setActiveCard(discardsOwner !== 'south'?
                    compDiscardI(activeHand,heartBroken) : null
                )

                discardsOwner === 'south' && setTrickIDone(true)

                setActivePLayer(discardsOwner)
                
                setAcc[discardsOwner](
                    [...acc[discardsOwner],...accCards]
                )

                Object.keys(setDiscard)
                .forEach(key=> setDiscard[key](null))

                setTricks(tricks + 1)

            }, 0.5*delay)
        }

    // eslint-disable-next-line 
    },[eastDiscard, westDiscard, southDiscard, northDiscard])

    useEffect(()=>{
        if(tricks && activeCard){
            
            playTricksBeforeSouth()
            
        }
        if(tricks===14){
            setTricks(0)
            setActivePLayer(null)
            setActiveCard(null)
            setHandOver(true)
            setToggled("ScoreTable")
            
        }
    // eslint-disable-next-line
    },[tricks])
    
    useEffect(()=>{
        
        activeCard && activePlayer==='south' && 
        !eqArray(activeCard,['2', '♣'])  && discardOne(activeCard)
        
        

    // eslint-disable-next-line
    },[activeCard])


    // Updates score for each hand
    useEffect(() => {
        if(handOver){
            
            const accScores = {eastAcc, westAcc ,northAcc, southAcc}
            
            evaluateScore(accScores)      
            
        }
    
     // eslint-disable-next-line
    },[handOver])
     
         
 
    const children = {
        
        // Used in Hands.js 
        eastCards, westCards, northCards, southCards, 
        eastAcc, northAcc, southAcc, westAcc,  
       
        // Used in DiscardPlie.js
        eastDiscard, westDiscard, northDiscard, southDiscard,

        // Used in Arrows.js
        hand, passCards,

        // Used in Hand.js, Arrow.js
        compIIICards, 
        
        // Used in Hand.js,
        playerIIICards,
        checkCard, discardThree,

        // Used in Hand.js Hands.js, GameScore.js
        handOver,

        // Used in withModal.js
        playNextHand, playAgain
    }

    return(
        <HeartsContext.Provider value={{...children}} >
            <Component {...props} />    
        </HeartsContext.Provider>
    )
}