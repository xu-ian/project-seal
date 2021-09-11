import './App.css';
import qs from 'qs';

declare var ZoomMtg
ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.7/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function App() {
  const parsedParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  const signatureEndpoint = 'https://zoomsignatureendpoint.herokuapp.com'
  const apiKey = 'Zju2aHPoQr-TDM26uOmfYA'
  const meetingNumber = parsedParams.meetingNumber;
  const meetingName = parsedParams.meetingName;
  const role = 0
  const leaveUrl = window.location.origin
  const userName = parsedParams.userName;
  const userEmail = ''
  const passWord = ''
  var registrantToken = ''

  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className="App">
      <main>
        <br />
        <br />
        <h1><b>Joining Zoom Meeting:</b> {meetingName}</h1>
        <br />
        <br />
        <h1><b>Meeting Number:</b> {meetingNumber}</h1>
        <br />
        <br />
        <h1><b>As User:</b> {userName}</h1>
        <br />
        <br />
        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
