// if want object to provide list of its properties and their types
/**
* @param {Array} props list of properties
* @description add the props to editor panel
*/
function showProps2 (props) {
  const pane = document.getElementById('propEditor')
  pane.innerHTML = ''
  for (const prop of props) {
    const label = document.createTextNode(prop.name + ': ')
    pane.appendChild(label)
    addInput(pane, prop.type, prop.val, (val) => {
      prop.setter(val)
      document.dispatchEvent(redraw)
    }, true)
  }
}

/**
* @param {} pane property editor panel
* @param {string} type the type of the property
* @param {} val the value of the property
* @param {} onchange the on change event action
* @param {boolean} newLine 
* @description add input
*/
function addInput (pane, type, val, onchange, newLine) {
  const inp = document.createElement('input')
  inp.type = type
  inp.value = val
  inp.onfocus = () => { document.dispatchEvent(disableKeys) }
  inp.onblur = () => { document.dispatchEvent(enableKeys) }
  if (type === 'checkbox') {
    inp.checked = val
    inp.onchange = () => { onchange(inp.checked) }
  } else if (type === 'number') {
    inp.onchange = () => { onchange(Number(inp.value)) }
  } else { // string/color type 'text'/'color'
    inp.onchange = () => { onchange(inp.value) }
  }
  pane.appendChild(inp)
  if (newLine) { pane.appendChild(document.createElement('br')) } else { pane.innerHTML += '&nbsp;' }
}

/**
* @param {object} obj
* @param {} pane property editor panel
* @param {number} tabs the amount of tabs
* @description show props
*/
function showProps (obj, pane, tabs) { // only prints out trivial properties
  let el
  for (const prop of Object.getOwnPropertyNames(obj).filter(x => typeof obj[x] !== 'function')) { // every non function
    el = obj[prop]
    const setter = (val) => {
      obj[prop] = val
      document.dispatchEvent(redraw)
    }
    const label = document.createTextNode(prop + ': ')
    if (prop === 'color' || prop === 'Color') {
      pane.appendChild(label)
      addInput(pane, 'color', el, setter)
    } else if (typeof el === 'string') {
      pane.appendChild(label)
      addInput(pane, 'text', el, setter)
    } else if (typeof el === 'boolean') {
      pane.appendChild(label)
      addInput(pane, 'checkbox', el, setter)
    } else if (typeof el === 'number') {
      pane.appendChild(label)
      addInput(pane, 'number', el, setter)
    } else if (el) { // it is defined/not null
      pane.appendChild(document.createElement('br'))
      for (let i = 0; i <= tabs; i++) {
        pane.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
      }
      pane.appendChild(label)
      showProps(el, pane, tabs)// it is an object recursively add editors for its properties
    }
  }
}

/**
* @param {object} obj
* @description show properties
*/
function showProperties (obj) { // works on objects prints properties with setters(and getters)
  if (obj['getProps']) { // check which method this object uses
    showProps2(obj.getProps())
    return
  }
  const pane = document.getElementById('propEditor')
  pane.innerHTML = ''

  let el
  for (const prop of Object.getOwnPropertyNames(obj).filter(x => (typeof obj[x] === 'function' && x.substring(0, 3) === 'set'))) { // all setter functions
    el = obj['g' + prop.substring(1)]()// assume the setter function also has a getter
    const label = document.createTextNode(prop.substring(3) + ': ')
    const onchange = (val) => {
      obj[prop](val)
      document.dispatchEvent(redraw)
    }
    pane.appendChild(label)

    if (prop.substring(3) === 'color' || prop.substring(3) === 'Color') {
      addInput(pane, 'color', el, onchange, true)
    } else if (typeof el === 'string') {
      addInput(pane, 'text', el, onchange, true)
    } else if (typeof el === 'boolean') {
      addInput(pane, 'checkbox', el, onchange, true)
    } else if (typeof el === 'number') {
      addInput(pane, 'number', el, onchange, true)
    } else if (el) { // an object that is defined
      showProps(el, pane, 0)
    }
  }
}
