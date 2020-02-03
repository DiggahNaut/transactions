import React from 'react';

const ProjectList = (props) => {
    var filteredProjectList = [];
    var transactionsData = props.transactionsData;

    // Если я правильно понял суть задачи построения списка проектов, тогда отобразятся те проекты, по которым "успешно" совершились транзакции.
    // Могу быть не прав, прошу прощения за неуточнение этого вопроса. Много времени не займёт на правку данного момента.
    const projectList = transactionsData.map((row, index) => {
        if (row.transaction.status !== 'canceled') {
            if (filteredProjectList.includes(row.transaction.project.name)) {
                return;
            }

            filteredProjectList.push(row.transaction.project.name);

            return <li className="list-group-item" key={index}> {row.transaction.project.name} </li>;
        }
    });

    return (
        <div className="text-center">
            <h3>Список проектов, по которым совершались платежи.</h3>
            <div>
                Список строится на основе успешных транзакций у проекта. Отмененные не учитываются.
                Порядок проектов ни на чём не основан.
            </div>

            <ul className="list-group">
                {projectList}
            </ul>
        </div>
    )
}

export default ProjectList;