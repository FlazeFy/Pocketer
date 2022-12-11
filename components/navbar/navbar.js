import Link from 'next/link'

//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { } from "@fortawesome/free-regular-svg-icons"

export default function Navbar(props) {
    function getActive(val, curr){
        if(val == curr){
            return "nav-item active";
        } else {
            return "nav-item";
        }
    }

    return (
        <nav className="navbar navbar-expand-lg w-100">
            <div className="container-fluid">
                <Link href="/">
                    <li className="navbar-brand">Pocketer</li>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link href="/dashboard">
                            <li className={getActive(props.active, "dashboard")}>
                                <span className="nav-link" aria-current="page">Dashboard</span>
                            </li>
                        </Link>
                        <Link href="/mywallet">
                            <li className={getActive(props.active, "mywallet")}>
                                <span className="nav-link" href="#">My Wallet</span>
                            </li>
                        </Link>
                        <Link href="/history">
                            <li className={getActive(props.active, "history")}>
                                <span className="nav-link" href="#">History</span>
                            </li>
                        </Link>
                        <Link href="/bucket">
                            <li className={getActive(props.active, "bucket")}>
                                <span className="nav-link" href="#">Bucket</span>
                            </li>
                        </Link>
                        <Link href="/about">
                            <li className={getActive(props.active, "about")}>
                                <span className="nav-link" href="#">About</span>
                            </li>
                        </Link>
                    </ul>
                    <form className="d-flex">
                        <a className="btn btn-outline-main me-2"><FontAwesomeIcon icon={faGear} width="14px"/></a>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-outline-success" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} width="14px"/></button>
                    </form>
                </div>
            </div>
        </nav>
    )
}
