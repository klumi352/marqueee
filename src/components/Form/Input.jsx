import React from 'react'

function Input({type,value,setValue,placeholder,colClass}) {
    return (
        <>
            <div class={colClass}>
                <div class="mb-3">
                    <input type={type} class="form-control" id="exampleFormControlInput1" value={value} onChange={(e)=>setValue(e.target.value)} placeholder={placeholder} />
                </div>
            </div>
        </>
    )
}

export default Input