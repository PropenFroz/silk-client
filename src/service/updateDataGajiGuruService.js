const updateEntryGajiGuru = async (id, formData) => {
  try {
    delete formData.entryGajiGuru;
    delete formData.deleted;
    delete formData.id;
    const response = await fetch(`http://localhost:8080/api/entry-gaji-guru/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Gagal mengirimkan permintaan update");
    }
  } catch (error) {
    console.error("Error updating entry data:", error);
    throw error;
  }
};

export default updateEntryGajiGuru;