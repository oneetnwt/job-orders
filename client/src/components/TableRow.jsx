const STATUS_COLORS = {
  pending: "bg-amber-200",
  "in-Progress": "bg-blue-200",
  "on-Hold": "bg-slate-200",
  cancelled: "bg-red-200",
  completed: "bg-emerald-200",
};

function TableRow({ jobOrder }) {
  const statusColor = STATUS_COLORS[jobOrder.status];
  return (
    <tr
      key={jobOrder._id}
      className="border-b border-[var(--light-gray)] hover:bg-[var(--light-gray)] transition-colors"
    >
      <td className="p-[0.75rem_0.5rem] overflow-hidden text-ellipsis whitespace-nowrap">
        {jobOrder.jobOrderNumber}
      </td>
      <td className="p-[0.75rem_0.5rem] overflow-hidden text-ellipsis whitespace-nowrap">
        {jobOrder.requestingDepartment}
      </td>
      <td className="p-[0.75rem_0.5rem] overflow-hidden text-ellipsis whitespace-nowrap">
        {jobOrder.requestorName}
      </td>
      <td className="p-[0.75rem_0.5rem] overflow-hidden text-ellipsis whitespace-nowrap">
        {jobOrder.orders[0]?.jobOrderDescription || "N/A"}
      </td>
      <td
        className={`p-[0.75rem_0.5rem] overflow-hidden text-ellipsis whitespace-nowrap`}
      >
        <span className={`${statusColor} p-[0.25em_1em] rounded-full`}>
          {jobOrder.status}
        </span>
      </td>
    </tr>
  );
}

export default TableRow;
