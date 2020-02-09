import React from 'react';
import {useTable, usePagination, useFilters, useGlobalFilter} from 'react-table';

// Компоненты из react-table оказались сложными для понимания с первого взгляда.
// Поэтому я решил сильно не углубляться в функциональность и остановился на "простом" использовании.

// Эта функция необходима для определения глобального фильтра. Её я скопировал из примера react-table.
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  return (
    <span>
      Поиск:{' '}
      <input
        className="table-filter"
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`по всем записям`}
      />
    </span>
  )
}

// Данные берутся на основе data, которые хранятся в state у App.js.
// Невероятно, но факт. Передавая transactionsData из App.js и принимая data - данные перестают существовать.
// Передавая data и принимая data - всё работает исправно. Не знаю почему так.
function TransactionsTable({ data }) {
    // columns нужен для react-table.
    const columns = React.useMemo(
      () => [
        {
          Header: 'Список транзакций',
          columns: [
            {
              Header: 'Проект',
              accessor: 'transaction.project.name',
            },
            {
              Header: 'Способ оплаты',
              accessor: 'transaction.payment_method.name',
            },
            {
              Header: 'Пользователь',
              accessor: 'user.id',
            },
            {
              Header: 'Статус транзакции',
              accessor: 'transaction.status',
            }
          ],
        }
      ],
      []
    )

    // Используйте state и функции которые были получены от react-table для интерфейса таблицы.
    const {
      // Аргументы ниже нужны для react-table.
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,

      // Аргументы ниже нужны для пагинации react-table.
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: {pageIndex, pageSize}, // Не совсем понимаю разницу между этим state.

      // Аргументы ниже нужны для фильтра react-table.
      preGlobalFilteredRows,
      setGlobalFilter,
      flatColumns,
      state, // И этим state. В react-table не нашёл ответа. Так сделано в примере react-table.
    } = useTable(
      {
        columns,
        data,
        initialState: {pageIndex: 0}
      },
      useFilters,
      useGlobalFilter,
      usePagination
    )
  
    // Отрисовываем таблицу.
    return (
      <>
      <table className="table table-striped table-hover" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="table-cell" {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
          <tr>
            <th colSpan={flatColumns.length} >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      
      <div className="pagination">
        <div>
            <button type="button" className="btn btn-secondary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>
              {' '}
            <button type="button" className="btn btn-secondary" onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>
              {' '}
            <button type="button" className="btn btn-secondary" onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>
              {' '}
            <button type="button" className="btn btn-secondary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </button>
        </div>

        <div>
            Страница{' '}{pageIndex + 1} - {pageOptions.length}{' '}из{' '}{data.length}{' '}записей
        </div>

        <div>
          <select className="form-control"
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
            >
            {[5, 10, 15, 20].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Показать {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
    )
}

export default TransactionsTable