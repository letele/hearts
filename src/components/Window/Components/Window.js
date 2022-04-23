import '../styles.css'
import {
    withGameContext, withHeartsContext, withUIContext 
} from '../../Context'
import {compose} from '../../../utilities'
import Modal from './Modals'
import {
     StatusBar, MenuBar,TitleBar, WorkArea
} from '.'

function Window() {

    return(
        <div id="window">
            <header>
                <TitleBar title={"Hearts"} />
                <MenuBar />
            </header>
            
            <Modal.About />

            <Modal.Appearance />

            <Modal.Exit />

            <Modal.Help />

            <Modal.Statistics />

            <Modal.ScoreTable />

            <Modal.GameOver />
            
            <WorkArea />
            
            <footer> 
                <StatusBar />
            </footer>
        </div>
    )
}

export default compose(
    withGameContext,withUIContext,withHeartsContext
)(Window)