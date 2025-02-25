"use client"
import React, { useState } from 'react'

function Counter({users}) {
    const [count, setCount] = useState(0);
  return (<>
    <button onClick={() =>setCount((c) => c + 1)}>Counter</button>
    <p>{count}</p>
    </>
  )
}

export default Counter