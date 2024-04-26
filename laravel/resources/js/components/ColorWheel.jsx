import React, { useState, Fragment } from "react";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex } from "@uiw/color-convert";

function Demo({ sendDataToParent }) {
    const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
    function padreHijo() {
        sendDataToParent(hsva);
    }
    return (
            <Wheel
                color={hsva}
                onChange={(color) => {
                    setHsva({ ...hsva, ...color.hsva });
                    padreHijo(); 
                }}
            />
    );
}

export default Demo;
