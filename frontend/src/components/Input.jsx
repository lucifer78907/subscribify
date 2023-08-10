import "./Input.scss";
import { useReducer } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { RxCrossCircled } from "react-icons/rx";

const validateInp = (inpText, inpType) => {
  if (inpType === "email") return inpText.includes("@");
  if (inpType === "username") return inpText.trim().length > 7;
  if (inpType === "password") return inpText.trim().length > 7;
};

const inputReducer = (prevState, action) => {
  if (action.type === "INPUT_CHANGE") {
    return {
      value: action.val,
      isValid: validateInp(action.val, action.inpType),
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: prevState.value,
      isValid: validateInp(prevState.value, action.inpType),
    };
  }
  return { value: "", isValid: false };
};

const Input = (props) => {
  const [inputFieldText, dispatchFunc] = useReducer(inputReducer, {
    value: "",
    isValid: null,
  });

  const onChangeHandler = (event) => {
    dispatchFunc({
      type: "INPUT_CHANGE",
      val: event.target.value,
      inpType: event.target.name,
    });
  };

  const onBlurHandler = (event) => {
    // validation logic
    dispatchFunc({
      type: "INPUT_BLUR",
      inpType: event.target.name,
    });
  };

  return (
    <div>
      <label htmlFor="email" className="form__label">
        {props.label}
        <span>
          {inputFieldText.isValid && <FiCheckCircle color="#16A34A" />}
          {!inputFieldText.isValid && inputFieldText.isValid !== null && (
            <RxCrossCircled color="#DC2626" />
          )}
        </span>
      </label>
      <input
        className={`form__input ${
          inputFieldText.isValid !== null && !inputFieldText.isValid
            ? "form__input--invalid"
            : ""
        }`}
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.defaultValue}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    </div>
  );
};

export default Input;
