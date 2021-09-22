import backgroundImage from './img/curved.jpg'
export default function Header(props)
{
  const styleSheet = {
    backgroundImage:`url(${backgroundImage})`
  }

  return (
    <header class="header-2">
    <div class="page-header min-vh-75" style={styleSheet}>
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto">
            <h1 class="text-white pt-3 mt-n5">Uptime Monitoring Service</h1>
            <p class="lead text-white mt-3">Uptime monitoring for websites & APIs. <br /> Instant alerts when your website or API is down. </p>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
  

}
