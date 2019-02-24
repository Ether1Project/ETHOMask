# Extension-Link-Enabler
Enable links in your browser plugin, today! Compatible with most modern browsers.

## Usage

### For React Components
```jsx=
const linker = require('extension-link-enabler')

Component.prototype.componentDidMount = function () {
  var node = findDOMNode(this)
  linker.setupListener(node)
}

Component.prototype.componentWillUnmount = function () {
  var node = findDOMNode(this)
  linker.teardownListener(node)
}
```
