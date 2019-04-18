
export default `
  html, body {
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    margin: 0;
  }
  a {
    &:hover {
      text-decoration: none;
    }
  }
  p {
    margin-bottom: 2rem;
  }
  ul {
    > p {
      margin: 0;
    }
    > li {
      margin: 10px 0;
      > p {
        margin: 0;
      }
    }
  }
  h3, h4, h5 {
    border-bottom: 1px solid;
    padding-bottom: 10px;
    font-weight: bold;
  }
`;
