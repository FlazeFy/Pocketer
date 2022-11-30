//Font awesome icon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { } from "@fortawesome/free-regular-svg-icons"

export default function Welcome() {
    return (
        <>
            <h5 className='mt-3 mb-0'>Welcome, Leo</h5>
            <a className='btn btn-link'><FontAwesomeIcon icon={faBell} width="12px"/> You have 3 notification</a>  
        </>
    )
}
