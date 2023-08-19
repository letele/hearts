import { createContext,  useState } from "react";
import { heartScores } from "../cardUtilities";

export const GameContext = createContext();

export const withGameContext = Component => props => {

    const [gameInProgress, setGameInProgress] = useState(false)

    const [gamesPlayed, setGamesPlayed] = useState(0)
    
    const [gamesWon, setGamesWon] = useState(0)

    const [bestScores, setBestScores] = useState([])

    const [currentScore, setCurrentScore] = useState([])

    const [gameOver ,setGameOver] = useState(false)

    const [places, setPlaces] = useState(null)

    const [total ,setTotal] = useState(null)

    const [date ,setDate] = useState(null)

    const [startNew ,setStartNew] = useState(0)

    const {
        cardScores,
        totalScore,
        orderScores,
    } = heartScores()

    // Function that evaluates score of cards
    const evaluateScore = accScores => {
      
        const {eastAcc, westAcc ,northAcc, southAcc}= accScores

        const [eastScore, westScore,northScore, southScore] = [
            cardScores(eastAcc), cardScores(westAcc), 
            cardScores(northAcc), cardScores(southAcc)
        ]

        const scores = {eastScore, westScore,northScore, southScore}

        const moonShot = Object.keys(scores).find( i => scores[i] === 26)

        moonShot && Object.keys(scores)
        .map( i => i===moonShot ? scores[i]=0 : scores[i]=26)
      
        const allScores = currentScore.length ? 
        [...currentScore, scores] : [scores]

        setPlaces(orderScores(totalScore(allScores)))

        setTotal(totalScore(allScores))

        setCurrentScore([...currentScore, scores])


        const highestScore = Math.max(
            ...Object.values(totalScore(allScores))
        )
        
        
        if(highestScore >= 100){
               
            const currentDate = new Date().toLocaleDateString("en-GB")

            setDate(currentDate)
            setGameOver(true)

            setGamesPlayed(gamesPlayed + 1)

            const pos = orderScores(totalScore(allScores))
            
            if(pos.southScore==='First'){
                const sortArray = arr => [...arr].sort(function (a, b) { 
                    return a[0] - b[0];
                })

                const southScores = [
                    ...bestScores,
                    [totalScore(allScores).southScore, currentDate] 
                ]

                setBestScores(sortArray(southScores).slice(0,5))
                
                setGamesWon(gamesWon + 1)
            }
         
        }
    }  

    const resetGame = () => {
        setCurrentScore([])
        setPlaces(null)
        setTotal(null)
        setGameOver(false)
    }

    const resetScores = () => {
        setGamesPlayed(0)
        setGamesWon(0)
        setBestScores([])
    }
    const newGame = () => {
        resetGame()
        setGamesPlayed(gamesPlayed +1)
        setStartNew(startNew +1)
    }

    const children = {
        gameInProgress, setGameInProgress,
        gamesPlayed, setGamesPlayed,
        gamesWon, setGamesWon,
        bestScores, setBestScores,
        currentScore, setCurrentScore,
        gameOver ,setGameOver,
        places, setPlaces,
        total ,setTotal,
        evaluateScore,
        resetGame,resetScores,
        date,newGame,startNew 
    }

    return(
        <GameContext.Provider value={{...children}} >
            <Component {...props} />    
        </GameContext.Provider>
    )
}