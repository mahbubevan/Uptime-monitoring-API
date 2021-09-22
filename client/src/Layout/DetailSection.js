export default function DetailSection(props)
{
  return(
  <section className="pt-3 pb-4" id="count-stats">
    <div className="container">
      <div className="row">
        <div className="col-lg-9 z-index-2 border-radius-xl mt-n10 mx-auto py-3 blur shadow-blur">
          <div className="row">
            <div className="col-md-4 position-relative">
              <div className="p-3 text-center">
                <h1 className="text-gradient text-primary"><span id="state1" countTo="70">1</span></h1>
                <h5 className="mt-3">Users</h5>
                <p className="text-sm">Sign In and create your checks for monitoring your Website Or API's</p>
              </div>
              <hr className="vertical dark" />
            </div>
            <div className="col-md-4 position-relative">
              <div className="p-3 text-center">
                <h1 className="text-gradient text-primary"> <span id="state2" countTo="15">2</span></h1>
                <h5 className="mt-3">File System</h5>
                <p className="text-sm">This software is build on raw Node JS and No aditional library used. That's why <strong>File System</strong> is used for storing Data</p>
              </div>
              <hr className="vertical dark" />
            </div>
            <div className="col-md-4">
              <div className="p-3 text-center">
                <h1 className="text-gradient text-primary" id="state3" countTo="4">3</h1>
                <h5 className="mt-3">Twilio</h5>
                <p className="text-sm">Twilio is an American cloud communications platform. Get Notified By <strong>Twilio SMS</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}


