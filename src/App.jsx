import { useContext } from 'react';
import {Hearts} from '@letele/svg-icons'
import { 
	withUIContext,withHeartsContext,withGameContext, 
	UIContext 
} from './context';
import { 
	Arrows, DiscardPile ,Hands, MenuBar,Modals, StatusBar 
} from './components';

import {boardImgs} from './imgs'

function App() {

	const {background} = useContext(UIContext)

	const img = boardImgs[background[1]]
	
	const mainClasses = `
		poa h-98pc w-98pc l-1pc t-1pc bd-aaaaaa flex flex-col
	`
	const sectionClasses = 'w-100pc flex flex-1 al-center jus-center'
	const sectionStyles = { backgroundImage:`url(${img})`}

	const articleClasses = 'ff-arial por h-41vmax w-75vmax mw-45vmax'

	const footerClasses = `
		poa w-100pc p-3px-0 b-0 bg-ececec ff-arial flex jus-end
	`

  	return (
		<main className={mainClasses}>
			<header className="bg-ececec ff-arial">
				<h1 className="fw-normal fs-9pt p-3px"> 
					<span className='mr-3px'><Hearts /></span>
					<span>Hearts</span>
				</h1>
				
				<MenuBar />
			</header>

			<section className={sectionClasses} style={sectionStyles}>
				<article className={articleClasses}>
					<Hands />
					
					<Arrows />

					<DiscardPile />
				</article>
			</section>

			<Modals />
			
			<footer className={footerClasses} >
				<StatusBar />
			</footer>
		</main>
  	)
}

const compose = (...rest) => x => rest.reduceRight((y, f) => f(y), x)

export default compose(
    withUIContext,withGameContext,withHeartsContext
)(App)
