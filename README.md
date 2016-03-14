
# React stylerify

```
npm install react-stylerify

browserify -t react-stylerify -o build.js main.js
```

React stylerify is a browserify wrapper around [react-styling](https://github.com/halt-hammerzeit/react-styling), that allow to import style from external file through `require('mystyle.radium');` or `require('mystyle.css');` or `require('mystyle.style');`.

## Working example
[This project](https://github.com/chrvadala/react-with-react-template-and-radium) uses [Radium](http://stack.formidable.com/radium/) together with [React Template](http://wix.github.io/react-templates/).

## Usage
```jsx
<Button kind="primary">Radium Button</Button>
```

```jsx
var Radium = require('radium');
var React = require('react');
var styles = require('style.radium')();

// alternately
//var styles = require('style.css')();
//var styles = require('style.style')();

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

```css
/* style.radium */
base: {
    color: '#fff';
    :hover{
      background: #0074d9;
    }
}
primary: {
    background: #0074D9;
}

warning: {
    background: #FF4136;
}
```
