import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';

const showUser = ({ data }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(`/users/${data.id}`, {state: {users: data}})}>
      <svg style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center',
      }}
        xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" />
      </svg>
    </button>
  );
};


export const UsersTable = ({ userData }) => {

  const colDefs = [
    { field: 'name', headerName: 'Name', filter: true },
    { field: 'surname', headerName: 'Surname', filter: true },
    { field: 'user', headerName: 'Username', filter: true  },
    { field: 'email', headerName: 'Email', filter: true  },
    //{ field: 'role', headerName: 'Email', filter: true  },



    { headerName: 'Show', cellRenderer: showUser }
  ];

  return (
    <>
      {
        userData.length === 0
          ? <div className="flex items-center mt-10 justify-center">
            <div className="text-center">
              <p className="text-xl text-gray-800">There are no users created yet.</p>
              <p className="text-md text-gray-600 mt-2">Start creating a new user.</p>
            </div>
          </div>
          : <div className="align-middle overflow-x-auto shadow overflow-hidden sm:rounded-lg">
            <div className="ag-theme-quartz" style={{ width: 'auto', height: '80vh' }}>
              <AgGridReact
                rowData={userData}
                columnDefs={colDefs}
                pagination={true}
                rowSelection="multiple"
              />
            </div>
          </div>
      }
    </>
  )
}
