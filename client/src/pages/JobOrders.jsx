import { useEffect, useState } from "react";

import Search from "../components/icons/Search";
import Filter from "../components/icons/Filter";
import Add from "../components/icons/Add";
import RequestForm from "../components/RequestForm";
import axiosInstance from "../api/axiosInstance.js";
import TableRow from "../components/TableRow.jsx";
import Loader from "../components/Loader.jsx";

function JobOrders() {
  const [jobOrders, setJobOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    requestingDepartment: "",
    requestorName: "",
    dueDate: "",
    contactNumber: "",
    notedBy: "",
    attachedFiles: [],
    orders: [
      {
        quantity: "",
        unit: "",
        jobOrderDescription: "",
        unitPrice: "",
      },
    ],
    completionDate: "",
    urgency: "",
  });
  const [file, setFile] = useState(null);

  const openModal = () => {
    setModal(!modal);
    if (modal) {
      setForm({
        requestingDepartment: "",
        requestorName: "",
        dueDate: "",
        contactNumber: "",
        notedBy: "",
        attachedFiles: [],
        orders: [
          {
            quantity: "",
            unit: "",
            jobOrderDescription: "",
            unitPrice: "",
          },
        ],
        completionDate: "",
        urgency: "low",
      });
      setFile(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "requestorName") {
      setForm({ ...form, [name]: value, notedBy: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleOrderChange = (index, field, value) => {
    const updatedOrders = [...form.orders];
    updatedOrders[index] = {
      ...updatedOrders[index],
      [field]: value,
    };
    setForm({ ...form, orders: updatedOrders });
  };

  const addOrder = () => {
    setForm({
      ...form,
      orders: [
        ...form.orders,
        {
          quantity: "",
          unit: "",
          jobOrderDescription: "",
          unitPrice: "",
        },
      ],
    });
  };

  const deleteOrder = (index) => {
    const updatedOrders = form.orders.filter((_, i) => i !== index);
    setForm({
      ...form,
      orders: updatedOrders,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("requestingDepartment", form.requestingDepartment);
    formData.append("requestorName", form.requestorName);
    formData.append("dueDate", form.dueDate);
    formData.append("contactNumber", form.contactNumber);
    formData.append("orders", JSON.stringify(form.orders));
    formData.append("completionDate", form.completionDate);
    formData.append("urgency", form.urgency);
    if (file) {
      formData.append("file", file);
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/job-orders/create-job-order",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        openModal();
        fetchJobOrders();
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const serverMessage =
          error.response.data?.message || error.response.data?.error;

        if (status === 409) {
          setError(
            serverMessage ||
              "User already exists. Please try a different email or username."
          );
        } else if (status === 400) {
          setError(
            serverMessage ||
              "Invalid registration data. Please check your inputs."
          );
        } else {
          setError(serverMessage || "Registration failed. Please try again.");
        }
      } else if (error.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }

      console.log("Full error:", error);
      console.log("Error response:", error.response);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/job-orders/get-job-orders");

      console.log("Fetch Job Orders Response:", response);

      if (response.data.success) {
        setJobOrders(response.data.data);
      } else {
        console.error(
          "Fetch Job Orders failed: Response success is false",
          response
        );
        setError(response.data.message || "Failed to fetch job orders.");
      }
    } catch (error) {
      console.error("Error fetching job orders:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
        setError(
          error.response.data.message || "Server error fetching job orders."
        );
      } else if (error.request) {
        console.error("Error request:", error.request);
        setError(
          "Network error: Could not connect to server to fetch job orders."
        );
      } else {
        console.error("Error message:", error.message);
        setError("An unexpected error occurred while fetching job orders.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobOrders();
  }, []);

  return (
    <div className="p-3 sm:p-5">
      <h1 className="font-bold text-2xl">Job Orders</h1>
      <div className="mt-3 flex gap-3 flex-nowrap items-center">
        <div className="border border-[var(--light-gray)] rounded-md flex items-center pl-3 w-full">
          <Search />
          <input
            type="text"
            className="border-none focus:outline-none p-[0.5rem_1rem] w-full"
            placeholder="Search"
          />
        </div>
        <button
          className="bg-[var(--light-gray)] hover:bg-[var(--muted-gray)] transition-colors p-3 flex items-center gap-3 rounded-md whitespace-nowrap"
          onClick={() => alert("Hello")}
        >
          <Filter />
          Filter
        </button>
        <button
          className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] transition-colors text-white p-3 flex items-center gap-3 rounded-md whitespace-nowrap"
          onClick={openModal}
        >
          <Add />
          Add Request
        </button>
      </div>

      <div className="mt-3 w-full relative">
        <table className="w-full">
          <thead className="bg-[var(--light-gray)]">
            <tr>
              <th className="w-[10%] p-[0.25rem_0.5rem] text-left">J No.</th>
              <th className="w-[25%] p-[0.25rem_0.5rem] text-left">
                Department
              </th>
              <th className="w-[25%] p-[0.25rem_0.5rem] text-left">
                Requestor
              </th>
              <th className="w-[20%] p-[0.25rem_0.5rem] text-left">
                Job Description
              </th>
              <th className="w-[20%] p-[0.25rem_0.5rem] text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobOrders.map((jobOrder) => (
              <TableRow key={jobOrder._id} jobOrder={jobOrder} />
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <Loader />
          </div>
        )}
      </div>

      {modal && (
        <RequestForm
          modal={modal}
          openModal={openModal}
          form={form}
          handleChange={handleChange}
          handleOrderChange={handleOrderChange}
          addOrder={addOrder}
          deleteOrder={deleteOrder}
          loading={loading}
          handleSubmit={handleSubmit}
          error={error}
          file={file}
          handleFileChange={handleFileChange}
        />
      )}
    </div>
  );
}

export default JobOrders;
