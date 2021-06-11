import Title from './Title'
import Video from './Video'
import Header from './Header'
import Description from './Description'
import NextVideo from './NextVideo'
import './index.css'
function App(){
  return (
		//VideoPlayer that merges all video-components
		//Modular and can be imporved in the future
    <div className='video-container'>
			<Header/>
			<aside id='video-sidebar'>
				<NextVideo/>
			</aside>
			<section id='video-main'>
      	<Video/>
      	<Title/>
				<Description/>
			</section>
    </div>
  );
}

export default App;
