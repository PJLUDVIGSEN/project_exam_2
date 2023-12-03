import { Link } from "react-router-dom"

export function Footer() {

    return (
      <div className="navbar navbar-fixed-bottom p-0">
      <footer className="d-flex justify-content-center mt-auto">
      <Link className="d-flex justify-content-center" to="/browse">
      <svg className="footerLogo" xmlns="http://www.w3.org/2000/svg" width="141.837" height="113.469" viewBox="0 0 141.837 113.469">
        <path id="_8542249_robot_icon" data-name="8542249_robot_icon" d="M7.092,49.643h7.092V92.194H7.092A7.083,7.083,0,0,1,0,85.1V56.735a7.083,7.083,0,0,1,7.092-7.092Zm113.47-10.638V99.286a14.2,14.2,0,0,1-14.184,14.184H35.459A14.2,14.2,0,0,1,21.276,99.286V39.005a17.724,17.724,0,0,1,17.73-17.73H63.827V7.092a7.092,7.092,0,0,1,14.184,0V21.276h24.821A17.724,17.724,0,0,1,120.561,39.005ZM58.508,56.735A8.865,8.865,0,1,0,49.643,65.6a8.865,8.865,0,0,0,8.865-8.865Zm42.551,0A8.865,8.865,0,1,0,92.194,65.6a8.865,8.865,0,0,0,8.865-8.865Zm40.778,0V85.1a7.083,7.083,0,0,1-7.092,7.092h-7.092V49.643h7.092a7.083,7.083,0,0,1,7.092,7.092Z" fill="#dcdcdc"/>
      </svg>
      </Link>
      </footer>
    </div>
    )
  }