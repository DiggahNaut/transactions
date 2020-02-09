import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ProjectList from './ProjectList';
import transactionsData from '../transactions.json';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProjectList transactionsData={transactionsData}/>, div);
});

it("check ProjectList snapshot", () => {
    const ProjectListComponent = renderer.create(<ProjectList transactionsData={transactionsData}/>).toJSON();
    expect(ProjectListComponent).toMatchSnapshot();
});

// Я так понял что в компоненте ProjectList можно протестировать изменения селектора.
// Но похоже что для этого нужны имитация браузера и имитация действий пользователя.
// Могу быть не прав и это можно сделать с помощью jest/enzyme. Но до меня не дошло как протестировать изменения в селекторе.
// Пробовал это сделать с помощью jest/enzyme. Порылся в интернете, ничего полезного не нашёл.
describe('checking statuses for ProjectList', () => {
    const wrapper = mount(<ProjectList transactionsData={transactionsData}/>);

    it('check amount of statuses', () => {
        expect(wrapper.find('option').length).toEqual(4);
    });
    
    // it('check default status', () => {
    //     expect(wrapper.find('option')).toBe('Статус транзакции')
    // });

    // it('status = created', () => {
    //     wrapper.find('select[name="project-statuses"]').simulate('change', {target: {name: 'project-statuses', value: 'created'}});
    //     expect(wrapper.find('select[name="project-statuses"]').props('value')).toBe('created');
    // });

    // it('status = done', () => {
    //     wrapper.find('select').simulate('change', {target: {value: 'done'}})
    //     expect(wrapper.find('select').props('option')).toBe('done')
    // });

    // it('status = canceled', () => {
    //     wrapper.find('select').simulate('change', {target: {value: 'canceled'}})
    //     expect(wrapper.find('option').value).toBe('canceled')
    // });
});