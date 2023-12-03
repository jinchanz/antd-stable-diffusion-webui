import { InputNumber, Slider } from "antd";
import { useCallback, useEffect, useState } from "react";

import styles from './index.module.scss';

export interface InputSliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
}

function InputSlider(props: InputSliderProps) {
  const { 
    min,
    max,
    defaultValue, 
    value: propsValue, 
    onChange: propsOnChange,
    ...otherProps
  } = props;

  const [value, setValue] = useState(propsValue);

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue])

  const onChange = useCallback((value) => {
    propsOnChange?.(value);
  }, [propsOnChange]);

  return <div className={styles.inputSlider}>
    <div className={styles.slider}>
      <Slider
        {...otherProps}
        min={min}
        max={max}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
    <div className={styles.input}>
      <InputNumber
        {...otherProps}
        min={min}
        max={max}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  </div>;
}

export default InputSlider;