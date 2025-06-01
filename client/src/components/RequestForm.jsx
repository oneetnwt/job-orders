import Input from "./Input";
import Close from "./icons/Close";
import Add from "./icons/Add";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RequestForm.css";

function RequestForm({
  modal,
  openModal,
  form,
  handleChange,
  handleOrderChange,
  addOrder,
  deleteOrder,
  handleSubmit,
  loading,
  error,
  handleFileChange,
}) {
  return (
    modal && (
      <div
        className="animate-appear fixed top-0 left-0 right-0 bottom-0 bg-[#00000090] z-[9999] flex items-center justify-center"
        onClick={openModal}
      >
        <div
          className="bg-white rounded-md p-8 shadow-md min-w-100 max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-[var(--light-gray)]">
            <div className="flex items-center justify-between">
              <h1 className="font-extrabold text-2xl">Request Form</h1>
              <Close
                onClick={openModal}
                className="hover:fill-[var(--muted-gray)] transition-all cursor-pointer"
              />
            </div>
          </div>
          {error && (
            <div className="bg-red-500 text-white p-2 rounded-md">{error}</div>
          )}
          <div className="overflow-y-auto">
            <form className="mt-3 space-y-2" onSubmit={handleSubmit}>
              <Input
                type="text"
                name="requestingDepartment"
                placeholder="Department Name"
                onChange={handleChange}
                value={form.requestingDepartment}
                required
              />
              <Input
                type="text"
                name="requestorName"
                placeholder="Requestor Name"
                onChange={handleChange}
                value={form.requestorName}
                required
              />
              <div className="flex gap-3">
                <div className="w-1/3 flex flex-col">
                  <label
                    htmlFor="dueDate"
                    className="text-[var(--label-gray)] text-[0.875rem] mb-1 font-medium"
                  >
                    Due Date
                  </label>
                  <DatePicker
                    id="dueDate"
                    selected={form.dueDate ? new Date(form.dueDate) : null}
                    onChange={(date) =>
                      handleChange({
                        target: {
                          name: "dueDate",
                          value: date ? date.toISOString().split("T")[0] : "",
                        },
                      })
                    }
                    className="relative border-1 border-[var(--muted-gray)] p-[0.25rem_0.75rem] text-[var(--label-gray)] text-[0.875rem] rounded-sm w-full"
                    placeholderText="Select due date"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
                <div className="w-1/3 flex flex-col">
                  <label
                    htmlFor="completionDate"
                    className="text-[var(--label-gray)] text-[0.875rem] mb-1 font-medium"
                  >
                    Completion Date
                  </label>
                  <DatePicker
                    id="completionDate"
                    selected={
                      form.completionDate ? new Date(form.completionDate) : null
                    }
                    onChange={(date) =>
                      handleChange({
                        target: {
                          name: "completionDate",
                          value: date ? date.toISOString().split("T")[0] : "",
                        },
                      })
                    }
                    className="relative border-1 border-[var(--muted-gray)] p-[0.25rem_0.75rem] text-[var(--label-gray)] text-[0.875rem] rounded-sm w-full"
                    placeholderText="Select completion date"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor="urgency"
                    className="text-[var(--label-gray)] text-[0.875rem] mb-1 font-medium"
                  >
                    Urgency
                  </label>
                  <select
                    className="relative border-1 border-[var(--muted-gray)] p-[0.25rem] text-[var(--label-gray)] text-[0.875rem] rounded-sm w-full"
                    id="urgency"
                    onChange={handleChange}
                    value={form.urgency}
                    name="urgency"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <Input
                type="number"
                name="contactNumber"
                placeholder="Contact Number"
                onChange={handleChange}
                value={form.contactNumber}
                required
              />
              <Input
                type="file"
                name="attachedFiles"
                placeholder="Design Drawings"
                onChange={handleFileChange}
              />
              <div>
                <h3 className="font-bold text-xl border-b-1 border-[#00000050] my-4">
                  Orders
                </h3>
                {form.orders.map((order, index) => (
                  <div
                    key={index}
                    className="flex gap-3 mt-3 p-4 bg-[var(--light-gray)] rounded-lg relative"
                  >
                    <div className="absolute rounded -top-2 left-4 bg-[var(--primary-color)] text-white px-2 text-sm">
                      Order #{index + 1}
                    </div>
                    <div className="flex gap-3 w-full">
                      <Input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        onChange={(e) =>
                          handleOrderChange(index, "quantity", e.target.value)
                        }
                        value={order.quantity}
                        required
                      />
                      <Input
                        type="text"
                        name="unit"
                        placeholder="Unit"
                        onChange={(e) =>
                          handleOrderChange(index, "unit", e.target.value)
                        }
                        value={order.unit}
                        required
                      />
                      <Input
                        type="text"
                        name="jobOrderDescription"
                        placeholder="Description"
                        onChange={(e) =>
                          handleOrderChange(
                            index,
                            "jobOrderDescription",
                            e.target.value
                          )
                        }
                        value={order.jobOrderDescription}
                        required
                      />
                      <Input
                        type="number"
                        name="unitPrice"
                        placeholder="Unit Price"
                        onChange={(e) =>
                          handleOrderChange(index, "unitPrice", e.target.value)
                        }
                        value={order.unitPrice}
                        required
                      />
                      <div className="flex gap-2 items-end">
                        {index === form.orders.length - 1 && (
                          <button
                            type="button"
                            onClick={addOrder}
                            className="bg-[var(--success-color)] hover:bg-[var(--success-hover)] transition-colors text-white p-2 rounded-md h-fit"
                            title="Add Order"
                          >
                            <Add />
                          </button>
                        )}
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => deleteOrder(index)}
                            className="bg-[var(--error-color)] hover:bg-[var(--error-hover)] transition-colors text-white p-2 rounded-md h-fit"
                            title="Delete Order"
                          >
                            <Close />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-5">
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white p-[0.5em_0.75em] rounded transition-colors"
                >
                  {loading ? "Adding..." : "Add Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export default RequestForm;
