import React, { useState, useRef } from "react";

const Collapsible = (props) => {
    const [open, setOpen] = useState(false);
    const contentRef = useRef();

    const toggle = () => {
        setOpen(!open);
    }

    return (
        <div>
            <button className='toggleButton' onClick={toggle}>{props.section}</button>

            <div className='content-parent'
                ref={contentRef}
                style={open ? { height: contentRef.current.scrollHeight + 'px' } : { height: "0px" }}>
                <div className='content'>{props.children}</div>
            </div>
        </div>
    )
}

export default Collapsible;