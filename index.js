function h(elemName, props, ...children) {
  const elem = document.createElement(elemName);
  if (props) {
    Object.assign(elem, props);
  }
  if (children) {
    children.forEach(child => {
      if (typeof child === 'object') {
        elem.appendChild(child);
      } else {
        elem.appendChild(document.createTextNode(child));
      }
    });
  }
  return elem;
}

function getDefaultTemplate(
  name,
  oldnum = 1,
  newnum = 1,
  target = 1,
  color = '#880011'
) {
  const width = (newnum / target) * 100 + '%';
  return h(
    'div',
    { className: 'box' },
    h(
      'div',
      { className: 'left' },
      h('h2', null, name),
      h(
        'div',
        { className: 'bar' },
        h('div', {
          className: 'fill',
          style: `background-color:${color};width:${width}`
        })
      )
    ),
    h(
      'div',
      { className: 'mini-stats' },
      h('div', null, newnum),
      h('div', null, `Was ${oldnum}`)
    )
  );
}

function getDefaultStyle() {
  return h(
    'style',
    null,
    `
      div {
        font-family: Helvetica, sans-serif;
      }
      h2 {
        margin: 0;
      }
      .left {
        flex: 1;
      }
      .mini-stats {
        flex-grow: 1;
        text-align: center;
      }
      .mini-stats > div {
        font-size: 0.7em;
      }
      .mini-stats > *:first-child {
        font-size: 1.2em;
      }
      div.box {
        display: flex;
        background-color: #F5F5F5;
        padding: 10px;
      }
      div.bar {
        height: 7px;
        width: 200px;
        background: #C0C0C0;
      }
      div.bar .fill {
        height: 100%;
      }
    `
  );
}

class SocialStats extends HTMLElement {
  static get observedAttributes() {
    return ['oldnum', 'newnum', 'colour', 'target', 'name'];
  }
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.css = getDefaultStyle();
    this.template = getDefaultTemplate(
      ...['name', 'oldnum', 'newnum', 'target', 'colour'].map(name => {
        return this.getAttribute(name);
      })
    );
    this.shadow.appendChild(this.css);
    this.shadow.appendChild(this.template);
  }
}

window.customElements.define('social-stats', SocialStats);
