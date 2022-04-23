import { useContext } from "react"
import { UIContext, HeartsContext,GameContext } from "../../../Context"

const withModal = (title) => Component => props => {

    const {
        toggled, setToggled, 
        handleAppearance, 
        tab, 
        setChecked,
    } = useContext(UIContext)

    const {playNextHand,playAgain} = useContext(HeartsContext)

    const {gameOver, places,resetGame,resetScores} = useContext(GameContext)

    const handleScoreTable = () =>{
        setToggled(false)
        playNextHand()
    }
    
    const handleNewGame = () =>{
        setToggled(false)
        resetGame()
        playAgain()
    }

    const closeTab = () => {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
    
    const ScoreTableTitle = () =>
    <span>Current Game Score - {places && places.southScore} Place</span>

    const GameOverTitle = () => places && places.southScore==="First" ?
    <span>Game Won</span> : <span>Game Lost</span> 

    return( toggled===title &&
        <div className="overlayer">
             <div className="info-card">
                <header>
                    {toggled==='ScoreTable' ?
                    <ScoreTableTitle /> : toggled==='GameOver' ?
                    <GameOverTitle />: <span>{title}</span> 
                    }
                    <button onClick={
                        toggled==='ScoreTable' ?
                        handleScoreTable :  () => setToggled(false)
                    }>
                        &#215;
                    </button>
                </header>
        
                <Component {...props}/>
                
                <footer>
                    
                    {(toggled==='About'||toggled==='Help') &&
                    <button onClick={() => setToggled(false)}>OK</button> }

                    {toggled==='Appearance' && <> 
                    <button onClick={handleAppearance}>OK</button>
                    <button onClick={() => {
                        setChecked(false)   
                        setToggled(false)
                    }}>Cancel</button>
                    </>}
                    
                    {toggled==='Statistics' && <> 
                    <button onClick={() => setToggled(false)}>Close</button>
                    <button 
                        disabled={tab}
                        onClick={resetScores}
                    >Reset</button>
                    </>}
                    
                    {toggled==='Exit' && <> 
                    <button onClick={closeTab} >Exit</button>
                    <button onClick={() => setToggled(false)}>Cancel</button>
                    </>}
                    
                    {toggled==='ScoreTable' && <>{ gameOver ?
                    <button onClick={() => setToggled('GameOver')}>Ok</button> :
                    <button onClick={handleScoreTable}>Play Next Hand</button> 
                    }</>}
                    
                    {toggled==='GameOver' && <>
                    <button onClick={handleNewGame}>Play again</button> 
                    <button onClick={closeTab}>Exit</button> 
                    </>}
                
                </footer>
             </div>
        </div>
    )
}

export default withModal