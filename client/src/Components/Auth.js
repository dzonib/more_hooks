import React, {useContext} from 'react'

import AuthContext from '../auth-context'


const auth = props => {

    const auth = useContext(AuthContext)

    return <div>
        <button onClick={auth.login}>Login</button>
    </div>
}
    


export default auth