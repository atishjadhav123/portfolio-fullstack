import React from 'react'

const UseDevLog = () => {
    const devprint = data => import.meta.env.VITE_NODE_ENV === "dev" && <>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
    return devprint
}

export default UseDevLog