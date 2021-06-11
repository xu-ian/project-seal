import Title from './video-components/Title'
import Video from './video-components/Video'
import Header from './video-components/Header'
import Description from './video-components/Description'
import NextVideo from './video-components/NextVideo'
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
