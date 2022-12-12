import { h } from 'preact'
/** @jsx h */
//import { signal, computed } from '@preact/signals'
import { useState } from 'preact/hooks'

const style = {
    backgroundColor: '#223',
    color: 'white',
    margin: 0,
    padding: 40
}

const commentStyle = {
    padding: 20,
    border: '1px solid #222',
    borderRadius: 6
}

export default (props) => {
    const [count, setCount] = useState(0)
    const increment = () => setCount(count + 1)
    const decrement = () => setCount((currentCount) => currentCount - 1)

    return (
        <div style={style}>
            <p>hi</p>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>

            {props.goals.map((x) => (
                <div key={x.sk} style={commentStyle}>
                    <p>{x.title}</p>
                    <p>{x.content}</p>
                </div>
            ))}
        </div>
    )
}
