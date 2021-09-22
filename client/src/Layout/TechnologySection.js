import waveShape from './img/shapes/waves-white.svg'

export default function TechnologySection(props)
{

  const styleSheet = {
    waveShape:`${waveShape}`
  }

  return (
    <section className="py-sm-7" id="download-soft-ui">
    <div className="bg-gradient-dark position-relative m-3 border-radius-xl overflow-hidden">
      <img src={styleSheet.waveShape} alt="pattern-lines" className="position-absolute start-0 top-md-0 w-100 opacity-6" />
      <div className="container py-7 postion-relative z-index-2 position-relative">
        <div className="row">
          <div className="col-md-7 mx-auto text-center">
            <h3 className="text-white mb-0">Do you love this awesome project</h3>
            <h3 className="text-primary text-gradient mb-4">About This Project</h3>
            <p className="text-white mb-5">
              This project's backend is by Raw Node JS. While learning Node JS with <a className='text-white fs-5' href="https://www.youtube.com/watch?v=WC-g0JtEIwM&list=PLHiZ4m8vCp9PHnOIT7gd30PCBoYCpGoQM" target="_blank"> Sumit Saha </a> the backend is inspired from his tutorial. Some additional features is done by myself.
            </p>
            <a href="#0" className="btn btn-primary btn-lg mb-3 mb-sm-0">View My Other Projects</a>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-6 mx-auto">
          <div className="text-center">
            <h3 className="mt-5 mb-4">Technology Used In This Project</h3>
            <div className="row justify-content-center">
              
              <div className="col-lg-2 col-4">
                <a href="#0" data-bs-toggle="tooltip" data-bs-placement="top" title="Node JS">
                  <img alt='technology' src="https://icon2.cleanpng.com/20180425/xeq/kisspng-node-js-javascript-web-application-express-js-comp-5ae0f84de7b809.1939946215246930699491.jpg" className="img-fluid opacity-6"/>
                </a>
              </div>
              <div className="col-lg-2 col-4">
                <a href="#0" data-bs-toggle="tooltip" data-bs-placement="top" title="React JS">
                  <img alt='technology' src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/react.jpg" className="img-fluid opacity-6" />
                </a>
              </div>
              <div className="col-lg-2 col-4">
                <a href="#0" data-bs-toggle="tooltip" data-bs-placement="top" title="Bootstrap 5">
                  <img alt='technology' src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/bootstrap5.jpg" className="img-fluid"/>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
