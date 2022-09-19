const FormInput = ({ label, ...attributes }) => {
    return (
        <div className="group">
            {label && (
                <label className={`${attributes.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}
            <input className="form-input" {...attributes} />
        </div>
    );
}
export default FormInput;