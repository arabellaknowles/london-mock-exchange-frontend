import { render, screen } from '@testing-library/react';
import App from './components/App';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe ("registration button test", () => {

  let wrapper; 
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test("render a register button", () => {
    
    expect(wrapper.find("div.app").text()).toBe("Home");

    
  })
})

