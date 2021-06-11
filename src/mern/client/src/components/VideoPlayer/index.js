import Title from './Title'
import Video from './Video'
import Header from './Header'
import Description from './Description'
import './index.css'
function App() {
  return (
    <div className='container'>
			<div className='video'>
				<Header/>
      	<Video/>
      	<Title/>
				<Description/>
			</div>
			<aside className='sidebar'>
			</aside>
    </div>
  );
}

export default App;
