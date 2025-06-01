function TableData({ jobOrderNumber, department, requestor, description, status }) {
    return (
        <tr key={job.id} onClick={() => toggleDetails(job.id)} className='hover:bg-[#00000010] cursor-pointer'>
            <td className='p-[0.25rem_0.5rem]'>{jobOrderNumber}</td>
            <td className='p-[0.25rem_0.5rem]'>{department}</td>
            <td className='p-[0.25rem_0.5rem]'>{requestor}</td>
            <td className='p-[0.25rem_0.5rem]'>{description}</td>
            <td className='p-[0.25rem_0.5rem]'>{status}</td>
        </tr>
    )
}

export default TableData