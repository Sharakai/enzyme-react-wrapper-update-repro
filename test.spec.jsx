const React = require('react');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

test("ReactWrapper.update should re-render a react component", () => {
    const spy = jest.fn();

    class ImpureRender extends React.Component {
        constructor(props) {
            super(props);

            this.count = 0;
        }

        render() {
            this.count += 1;
            spy(this.count);

            return React.createElement("div", {}, this.count);

        }

    }

    const wrapper = Enzyme.mount(React.createElement(ImpureRender));

    expect(spy).toHaveBeenCalledTimes(1)

    // Update the component - should force re-render per https://github.com/airbnb/enzyme/blob/master/docs/api/ReactWrapper/update.md
    wrapper.update();

    expect(spy).toHaveBeenCalledTimes(2)
});
