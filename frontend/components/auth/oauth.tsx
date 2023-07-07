import {
    faFacebook,
    faFacebookF,
    faGoogle,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function OAuth() {
    return (
        <div className="flex justify-between gap-4">
            <div className="flex grow justify-center gap-2 rounded-lg border-2 border-solid px-6 py-2 font-bold">
                <FontAwesomeIcon icon={faGoogle} className="w-5 text-black " />
                <p>Google</p>
            </div>
            <div className="flex grow justify-center gap-2 rounded-lg border-2 border-solid px-6 py-2 font-bold">
                <FontAwesomeIcon
                    icon={faFacebook}
                    className="w-5 text-black "
                />
                <p>Facebook</p>
            </div>
        </div>
    )
}
