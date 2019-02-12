import React, {useContext} from 'react'

import AuthContext from '../auth-context'

const header = props => {
    const auth = useContext(AuthContext)
    return <header>
        {auth.status && <button onClick={props.onLoadTodos}>Todo list</button>}
        <button onClick={props.onLoadAuth}>Auth</button>
        <hr/>
    </header>
}

export default header