// import {
//   AllCommunityModule,
//   ModuleRegistry,
//   themeQuartz,
//   type ICellRendererParams,
//   type SelectionChangedEvent,
// } from 'ag-grid-community';
// import { AgGridReact } from 'ag-grid-react';
// import { useCallback } from 'react';
// import { TbEdit, TbEye, TbTrash } from 'react-icons/tb';
// import type { PriorityType, StatusType } from '../../../shared/utils/task';
// import Badge from './Badge';

// ModuleRegistry.registerModules([AllCommunityModule]);

// interface RowData {
//   id: number;
//   task: string;
//   project: string;
//   priority: PriorityType;
//   dueDate: string;
//   status: StatusType;
// }

// const rowData: RowData[] = [
//   {
//     id: 1,
//     task: 'Swimming',
//     project: 'Sport',
//     priority: 'Low',
//     dueDate: '2020-01-02',
//     status: 'Todo',
//   },
//   {
//     id: 2,
//     task: 'Eating',
//     project: 'Food',
//     priority: 'High',
//     dueDate: '2020-01-03',
//     status: 'Todo',
//   },
//   {
//     id: 3,
//     task: 'Bathing',
//     project: 'Home',
//     priority: 'Medium',
//     dueDate: '2020-01-04',
//     status: 'Done',
//   },
// ];

// const OldTable = () => {
//   const theme = themeQuartz
//     .withParams(
//       {
//         backgroundColor: '#fff',
//         foregroundColor: '#000',
//         headerTextColor: '#fff',
//         headerBackgroundColor: '#0ea5e9',
//         oddRowBackgroundColor: '#fff',
//         iconButtonActiveColor: '#fff',
//         iconButtonActiveIndicatorColor: '#18d6d6',
//         rangeSelectionBorderStyle: 'none',
//         selectedRowBackgroundColor: '#f3f4f6',
//         browserColorScheme: 'light',
//       },
//       'light-table'
//     )
//     .withParams(
//       {
//         backgroundColor: '#27272a',
//         foregroundColor: '#fff',
//         headerTextColor: '#fff',
//         headerBackgroundColor: '#09090b',
//         oddRowBackgroundColor: 'rgb(0, 0, 0, 0.1)',
//         iconButtonActiveColor: '#fff',
//         iconButtonActiveIndicatorColor: '#18d6d6',
//         rangeSelectionBorderStyle: 'none',
//         selectedRowBackgroundColor: '#030712',
//         browserColorScheme: 'dark',
//       },
//       'dark-table'
//     );

//   const ActionsCellRenderer = (props: ICellRendererParams) => {
//     const handleSeeMore = () => {
//       console.log(`see more ${props.data.id}`);
//     };
//     const handleEdit = () => {
//       console.log(`edit ${props.data.id}`);
//     };

//     const handleDelete = () => {
//       console.log(`delete ${props.data.id}`);
//     };

//     const actionButtons = [
//       {
//         icon: <TbEye size={15} />,
//         label: 'View',
//         onClick: handleSeeMore,
//       },
//       {
//         icon: <TbEdit size={15} />,
//         label: 'Edit',
//         onClick: handleEdit,
//       },
//       {
//         icon: <TbTrash size={15} />,
//         label: 'Delete',
//         onClick: handleDelete,
//       },
//     ];

//     return (
//       <div className='flex justify-end h-full gap-3'>
//         {actionButtons.map((btn, index) => (
//           <button
//             key={index}
//             onClick={btn.onClick}
//             aria-label={btn.label}
//             title={btn.label}
//             className='px-2 cursor-pointer hover:text-sky-500 transition-smooth'
//           >
//             {btn.icon}
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const PriorityRenderer = (props: ICellRendererParams) => (
//     <Badge
//       value={props.value as PriorityType}
//       colorMap={{
//         High: 'text-red-700 bg-red-100',
//         Medium: 'text-amber-700 bg-amber-100',
//         Low: 'text-emerald-700 bg-emerald-100',
//       }}
//     />
//   );

//   const StatusRenderer = (props: ICellRendererParams) => (
//     <Badge
//       value={props.value as StatusType}
//       colorMap={{
//         Done: 'text-emerald-700 bg-emerald-100 ',
//         Todo: 'text-amber-700 bg-amber-100 ',
//       }}
//     />
//   );

//   const onSelectionChanged = useCallback(
//     (event: SelectionChangedEvent<RowData>) => {
//       const selectedRows = event.api.getSelectedRows();
//       const ids = selectedRows.map((row: RowData) => row.id);
//       console.log('Selected IDs:', ids);
//     },
//     []
//   );

//   return (
//     <AgGridReact
//       domLayout='autoHeight'
//       suppressRowVirtualisation={true}
//       className='w-full h-full overflow-x-auto ag-theme-quartz'
//       theme={theme}
//       defaultColDef={{
//         flex: 1,
//         resizable: true,
//         minWidth: 130,
//         cellClass: 'text-xs',
//       }}
//       pagination={true}
//       paginationAutoPageSize
//       rowSelection={{ mode: 'multiRow', headerCheckbox: false }}
//       onSelectionChanged={onSelectionChanged}
//       onGridReady={(params) => {
//         // Wait for grid to be ready
//         params.api.forEachNode((node) => {
//           if (node.data?.status === 'Done') {
//             node.setSelected(true);
//           }
//         });
//       }}
//       columnDefs={[
//         {
//           headerName: 'Task',
//           field: 'task',
//           filter: true,
//         },
//         {
//           headerName: 'Project',
//           field: 'project',
//           filter: true,
//         },
//         {
//           headerName: 'Priority',
//           field: 'priority',
//           filter: true,
//           cellRenderer: PriorityRenderer,
//           //Sort High to Low
//           comparator: (a: PriorityType, b: PriorityType) => {
//             const order: Record<PriorityType, number> = {
//               High: 0,
//               Medium: 1,
//               Low: 2,
//             };
//             return order[a] - order[b];
//           },
//         },
//         {
//           headerName: 'Due Date',
//           field: 'dueDate',
//           filter: 'agDateColumnFilter',
//         },
//         {
//           headerName: 'Status',
//           field: 'status',
//           filter: true,
//           cellRenderer: StatusRenderer,
//           //Sort Todo first
//           comparator: (a: StatusType, b: StatusType) => {
//             const order: Record<StatusType, number> = {
//               Todo: 0,
//               Done: 1,
//             };
//             return order[a] - order[b];
//           },
//         },
//         {
//           cellRenderer: ActionsCellRenderer,
//         },
//       ]}
//       rowData={rowData}
//     />
//   );
// };

// export default OldTable;
