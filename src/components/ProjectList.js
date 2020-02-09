import React, {Component} from 'react';

class ProjectList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectList: ''
        };
    }

    handleChange = (e) => {
        var status = e.target.value;

        this.setProjectList(status);
    };

    setProjectList(status) {
        var filteredProjectList = [];
        var projectList = '';
        
        projectList = this.props.transactionsData.map((row, index) => {
            if (row.transaction.status !== status && !filteredProjectList.includes(row.transaction.project.name)) {
                filteredProjectList.push(row.transaction.project.name);
    
                return <li className="list-group-item" key={index}> {row.transaction.project.name} </li>;
            }
        });
    
        this.setState({projectList: projectList});
    }

    render () {
        return (
            <div className="text-center">
                <h3>Список проектов, по которым совершались транзакции.</h3>
                <div>
                    Выберите интересующий статус транзакции и список проектов изменится на основе статуса.
                </div>

                <select name="project-statuses" className="form-control" onChange={this.handleChange} defaultValue="Статус транзакции">
                    <option disabled>
                        Статус транзакции
                    </option>

                    <option value="created">
                        Новая
                    </option>

                    <option value="done">
                        Успешная
                    </option>

                    <option value="canceled">
                        Отмененная
                    </option>
                </select>

                <ul className="list-group list">
                    {this.state.projectList}
                </ul>
            </div>
        );
    };
}

export default ProjectList;