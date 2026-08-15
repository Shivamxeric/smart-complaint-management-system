import { apiRequest } from "./api";

export async function createComplaint(title, description) {
  return apiRequest("/complaints/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });
}

export async function getComplaints() {
  return apiRequest("/complaints/", {
    method: "GET",
  });
}

export async function deleteComplaint(id) {
  return apiRequest(`/complaints/${id}/`, {
    method: "DELETE",
  });
}