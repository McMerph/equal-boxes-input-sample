import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const REGEX = /^\d+$/;
const DIGIT_WIDTH_IN_CH = 2;

const Form = styled.form`
  margin: 1rem;
`;
// https://stackoverflow.com/questions/54355367/how-to-split-telephone-input-into-different-boxes-one-number-per-box-using-css
const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  font-size: ${(props) => props.fontSize};
  font-family: monospace;
`;
const Lines = styled.span`
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;

  /* create lines */
  background-image: linear-gradient(to right, black 1px, transparent 1px);
  background-size: ${DIGIT_WIDTH_IN_CH}ch;
`;
const Input = styled.input`
  display: block;
  box-sizing: border-box;
  border-width: 1px;
  border-color: black;
  border-style: solid;
  font: inherit;

  padding: 0.25ch 0.5ch;
  letter-spacing: ${DIGIT_WIDTH_IN_CH / 2}ch;
  max-width: ${(props) => props.digits * DIGIT_WIDTH_IN_CH}ch;

  /* https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp */
  &&::-webkit-outer-spin-button,
  &&::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  -moz-appearance: textfield;
`;
const Button = styled.button`
  display: block;
  margin-top: 1rem;
`;

const EqualBoxesInput = ({ digitsNumber, fontSize = '2rem' }) => {
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const [value, setValue] = useState('');
  const done = value.length >= digitsNumber;
  useEffect(() => {
    if (done) {
      inputRef.current.select();
      buttonRef.current.focus();
    }
  }, [value]);
  const onChange = (event) => {
    const { value: digits } = event.target;
    const sub = digits.substring(0, digitsNumber);
    if (REGEX.test(sub)) {
      setValue(sub);
    }
  };
  const onFocus = () => {
    if (done) {
      setValue('');
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Wrapper fontSize={fontSize}>
        <Input
          type="number"
          value={value}
          onChange={onChange}
          digits={digitsNumber}
          ref={inputRef}
          onFocus={onFocus}
        />
        <Lines />
      </Wrapper>
      <Button
        type="submit"
        ref={buttonRef}
        disabled={value.length < digitsNumber}
      >
        Print to console
      </Button>
    </Form>
  );
};

EqualBoxesInput.propTypes = {
  digitsNumber: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  fontSize: PropTypes.string,
};

export default EqualBoxesInput;
