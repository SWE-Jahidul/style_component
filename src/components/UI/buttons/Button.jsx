import styled from "styled-components";

const Button = styled.button`
    border: none;
    outline: none;
    background-color: #e1e1e1;
    color: #333;
    border-radius: 0.15rem;
    padding: 0.25rem 1rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 500;
    letter-spacing: 0.2rem;
    cursor: pointer;
    &:hover {
        background-color: #ccc;
    }
`

export default Button