
# React stylerify

```
npm install react-stylerify

browserify -t react-stylerify -o build.js main.js
```

React stylerify is a browserify wrapper around [react-styling](https://github.com/halt-hammerzeit/react-styling), that allows to import style from external file through `require('mystyle.radium');` or `require('mystyle.css');` or `require('mystyle.style');`.

## Why use this browserify transformer?
* Write CSS instead of JSON
* CSS syntax plus the power of Javascript 
* Avoid runtime parsing
* Doesn't use ES6 and than doesn't need Babel

## Working example
[The project (react-with-react-template-and-radium)](https://github.com/chrvadala/react-with-react-template-and-radium) uses [Radium](http://stack.formidable.com/radium/) together with [React Template](http://wix.github.io/react-templates/).

## Usage

FILE: `style.radium`
```css
base: {
    color: '#fff';
    :hover{
      background: #0074d9;
    }
}
primary: {
    background: #0074D9;
    font-size: `return var s = this.size; return s + 10;`
    color: `return this.color`;
}

warning: {
    background: #FF4136;
}
```

```jsx
var Radium = require('radium');
var React = require('react');
var styles = require('style.radium')({
    size: 10,
    color: 'orange' 
});

// alternately
// var styles = require('style.css')({...});
// var styles = require('style.style')({...});

@Radium
class Button extends React.Component {
  static propTypes = {
    kind: React.PropTypes.oneOf(['primary', 'warning']).isRequired
  };

  render() {
    return (
      <button
        style={[
          styles.base,
          styles[this.props.kind]
        ]}>
        {this.props.children}
      </button>
    );
  }
}
```


