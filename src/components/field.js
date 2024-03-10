import PropTypes from "prop-types";
import React from "react";

import "../styles/field.css"; // Import CSS file for TextField styling


export const Field = ({
    iconRight = true,
    text = true,
    iconLeft = true,
    text1 = "Placeholder",
    state,
    textarea,
    className,
    textClassName,
}) => {
    return (
        <div className={`field textarea-${textarea} ${state} ${className}`}>
            {!textarea && (
                <>
                    <>
  
                    </>
                    <>{text && <div className={`text ${textClassName}`}>{text1}</div>}</>
                    <>
       
                    </>
                </>
            )}

            {textarea && (
                <>
                    <div className="div">
                        {["default", "disabled", "filled", "focus"].includes(state) && <>{text1}</>}

                        {state === "alert" && <div className="text-wrapper">{text1}</div>}
                    </div>
                    <div className="resize-indicator">
                        <div className="rectangle" />
                        <div className="rectangle-2" />
                    </div>
                </>
            )}
        </div>
    );
};

Field.propTypes = {
    iconRight: PropTypes.bool,
    text: PropTypes.bool,
    iconLeft: PropTypes.bool,
    text1: PropTypes.string,
    state: PropTypes.oneOf(["default", "filled", "focus", "alert", "disabled"]),
    textarea: PropTypes.bool,
};

export default Field