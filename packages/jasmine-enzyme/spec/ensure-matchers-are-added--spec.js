/* eslint-disable global-require */
/* global document */
'use strict'; // eslint-disable-line

const { jsdom } = require('jsdom');
const { shallow, mount } = require('enzyme');
const React = require('react');
const jasmineEnzyme = require('../lib/index.js');

global.document = jsdom('');
global.window = document.defaultView;
global.navigator = { userAgent: 'node.js' };
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

describe('addMatchers', () => {
  beforeEach(jasmineEnzyme);

  it('adds toBeChecked', () => {
    const Fixture = require('./fixtures/toBeChecked.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('#checked')).toBeChecked();
  });

  it('adds toBeDisabled', () => {
    const Fixture = require('./fixtures/toBeDisabled.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('#disabled')).toBeDisabled();
  });

  it('adds toBeEmptyRender', () => {
    const Fixture = require('./fixtures/toBeEmptyRender.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper).toBeEmptyRender();
  });

  it('adds toExist', () => {
    const Fixture = require('./fixtures/toExist.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('span')).toExist();
  });

  it('adds toContainReact', () => {
    const { Fixture, User } = require('./fixtures/toContainReact.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper).toContainReact(React.createElement(User, { index: 1 }));
  });

  it('adds toHaveClassName', () => {
    const Fixture = require('./fixtures/toHaveClassName.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('.foo')).toHaveClassName('foo');
  });

  it('adds toHaveHTML', () => {
    const { Fixture, html } = require('./fixtures/toHaveHTML.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('#child')).toHaveHTML(html);
  });

  it('adds toHaveProp', () => {
    const Fixture = require('./fixtures/toHaveProp.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('User')).toHaveProp('name');
    expect(wrapper.find('User')).toHaveProp('name', 'blaine');
    expect(wrapper.find('User')).toHaveProp(
      'name',
      jasmine.stringMatching('lai')
    );
  });

  it('adds toHaveRef', () => {
    class Fixture extends React.Component {
      componentDidMount() {} // needed for lint
      render() {
        return React.createElement('div', { ref: 'ref' });
      }
    }
    const wrapper = mount(React.createElement(Fixture));

    expect(wrapper).toHaveRef('ref');
  });

  it('adds toHaveState', () => {
    const Fixture = require('./fixtures/toHaveState.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper).toHaveState('foo');
    expect(wrapper).toHaveState('foo', false);
    expect(wrapper).toHaveState('array', jasmine.arrayContaining([2]));
    expect(wrapper).toHaveState('nestedObject', { foo: { bar: 'test' } });
  });

  it('adds toHaveStyle', () => {
    const Fixture = require('./fixtures/toHaveStyle.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('#style1')).toHaveStyle('height', '100%');
    expect(wrapper.find('#style1')).toHaveStyle(
      'height',
      jasmine.stringMatching('%')
    );
    expect(wrapper.find('#style2')).toHaveStyle('flex', 8);
  });

  it('adds toHaveDisplayName', () => {
    const Fixture = require('./fixtures/toHaveDisplayName.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('#span')).toHaveDisplayName('span');
  });

  it('adds toHaveText', () => {
    const Fixture = require('./fixtures/toHaveText.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('#full')).toHaveText('Test');
    expect(wrapper.find('#full')).toHaveText();
  });

  it('adds toIncludeText', () => {
    const Fixture = require('./fixtures/toIncludeText.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('#full')).toIncludeText('important');
  });

  it('adds toHaveValue', () => {
    const Fixture = require('./fixtures/toHaveValue.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('input').first()).toHaveValue('test');
  });

  it('adds toMatchSelector', () => {
    const Fixture = require('./fixtures/toMatchSelector.fixture');
    const wrapper = shallow(React.createElement(Fixture));

    expect(wrapper.find('span')).toMatchSelector('span');
    expect(wrapper.find('#child')).toMatchSelector('#child');
    expect(wrapper.find('.foo')).toMatchSelector('.foo');
  });
});
