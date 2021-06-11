import Title from './components/Title'
import Video from './components/Video'
import Header from './components/Header'
function App() {
  return (
    <div className='container'>
      <Header></Header>
      <Video id="player"/>
      <Title id="title"/>
    </div>
  );
}

export default App;
