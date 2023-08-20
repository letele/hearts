import { useContext } from "react"
import { UIContext, HeartsContext,GameContext } from "../../context"

export const withModal = (title) => Component => props => {

    const {playAgain,playNextHand} = useContext(HeartsContext)
    
    const {
        toggle, 
        setToggle, 
        tab, 
        handleAppearance, 
        setChecked,
    } = useContext(UIContext)

    const {
        gameOver, places,resetGame,resetScores
    } = useContext(GameContext)

    const handleScoreTable = () =>{
        setToggle(false)
        playNextHand()
    }

    const handleNewGame = () =>{
        setToggle(false)
        resetGame()
        playAgain()
    }
    
    const closeTab = () => {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
                                                                                                  
    // Title bar of Modal
    const TitleBar = () => {
        
        // Title for score table
        // Game in progress
        const ScoreTableTitle = () =>
        <span className="ml-5px">
            Current Game Score - {places && places.southScore} Place
        </span>
        // Game in over
        const GameOverTitle = () => places && places.southScore==="First" ?
        <span className="ml-5px">Game Won</span> : 
        <span className="ml-5px">Game Lost</span> 
        
        return (
            <header className="flex al-center jus-btwn bg-fff">
                {toggle==='ScoreTable' ?
                <ScoreTableTitle /> : toggle==='GameOver' ?
                <GameOverTitle />: <span className="ml-5px">
                    {title==="NewGame"? "New Game":title}
                </span>}
                <div 
                    className="fs-15pt h-100pc hov-bgff0000 hov-cfff p-1px-6px hov-cdef"
                    onClick={
                        toggle==='ScoreTable' ?
                        handleScoreTable :  () => setToggle(false)
                    }
                >
                    &#215;
                </div>
            </header>
        )
    }

    const ModalFooter = () => {
        
        const buttonClasses = `
            m-auto-10px mw-90px p-2px-5px fs-9pt bd-0078d7 ol-0078d7
            hov-bdtrans bg-8686863d
        `
        const buttonClassesII = `
            m-auto-10px mw-90px p-2px-5px fs-9pt bd-aaaaaa bg-8686863d 
            
        `
        return (
            <footer className="p-10px txt-right">
                    
                {(toggle==='About'||toggle==='Help') &&
                <button 
                    className={buttonClasses}
                    onClick={() => setToggle(false)}
                >OK</button> }

                {toggle==='Appearance' && <> 
                <button 
                    className={buttonClasses}
                    onClick={handleAppearance}
                >OK</button>
                <button 
                    className={`${buttonClassesII} hov-bd0078d7`}
                    onClick={() => {
                        setChecked(false)   
                        setToggle(false)
                    }}
                >Cancel</button>
                </>}
            
                {toggle==='Statistics' && <> 
                <button 
                    className={buttonClasses}
                    onClick={() => setToggle(false)}
                >Close</button>
                <button 
                    className={`${buttonClassesII} ${!tab && 'hov-bd0078d7' }`}
                    disabled={tab}
                    onClick={resetScores}
                >Reset</button>
                </>}
            
                {toggle==='Exit' && <> 
                <button 
                    className={`${buttonClassesII} hov-bd0078d7`}
                    onClick={closeTab}
                >Exit</button>
                <button className={buttonClasses} onClick={() => setToggle(false)}
                >Cancel</button>
                </>}
            
                {toggle==='ScoreTable' && <>{ gameOver ?
                <button className={buttonClasses} onClick={() => setToggle('GameOver')}>Ok</button> :
                <button className={buttonClasses} onClick={handleScoreTable}>Play Next Hand</button> 
                }</>}
            
                {toggle==='GameOver' && <>
                <button className={buttonClasses} onClick={handleNewGame}>Play again</button> 
                <button 
                    className={`${buttonClassesII} hov-bd0078d7`} 
                    onClick={closeTab}>
                Exit</button> 
                </>}
            </footer>
        )
    }
    
    const articleClasses = `
        w-fcnt bd-aaaaaa mw-210px m-auto mt-108px bg-ececec ff-arial fs-9pt 
    `
    
    return( 
        <section className="poa bg-0000006e w-100pc h-100pc t-0 l-0 z-2">
            <article className={articleClasses}>
                <TitleBar />

                <div className="p-5px-15px">
                    <Component {...props}/>
                </div>

                <ModalFooter />
            </article>
        </section>
    )
}

