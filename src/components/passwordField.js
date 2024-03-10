import React from "react";
import PropTypes from "prop-types";
import { Field } from "./field";
import "../styles/textField.css"; // Import CSS file for PasswordField styling

export const PasswordField = ({
    description = true,
    label = true,
    errorMsg = "Error message text",
    description1 = "Helper text goes here",
    label1 = "Label Name",
    textarea,
    error,
    className,
    labelClassName,
    value, // Gunakan properti value untuk menampung nilai input
    onChange, // Tambahkan properti onChange untuk menangani perubahan input
}) => {
    return (
        <div className={`text-field ${className}`}>
            <div className="label-and-field">
                {label && <div className={`label ${labelClassName}`}>{label1}</div>}
                <Field
                    className="field-instance"
                    iconLeft={false}
                    iconRight={false}
                    state={error ? "alert" : "default"} // Mengubah state sesuai dengan kondisi error
                    text1={ // Menggunakan elemen input untuk menampilkan nilai dan menangani perubahan
                        <input
                            type="password"
                            value={value} // Menggunakan nilai dari properti value
                            onChange={onChange} // Menetapkan onChange handler
                            className="input-text" // Class untuk styling input
                        />
                    }
                    textarea={textarea}
                />
            </div>
            {description && (
                <div className={`description error-1-${error}`}>
                    {!error && <>{description1}</>}
                    {error && <>{errorMsg}</>}
                </div>
            )}
        </div>
    );
};

PasswordField.propTypes = {
    description: PropTypes.bool,
    label: PropTypes.bool,
    errorMsg: PropTypes.string,
    description1: PropTypes.string,
    label1: PropTypes.string,
    textarea: PropTypes.bool,
    error: PropTypes.bool,
    value: PropTypes.string, // Tipe data value diubah menjadi string
    onChange: PropTypes.func, // Tambahkan properti onChange
};

export default PasswordField;
