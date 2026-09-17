const fs = require('fs');
let code = fs.readFileSync('src/app/dashboard/penguji/jadwal/page.tsx', 'utf8');

const hookAnchor = 'const [submittingSlot, setSubmittingSlot] = useState(false);';
const stateCode = `
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleItem, setRescheduleItem] = useState<JadwalAssignment | null>(null);
  const [rescheduleForm, setRescheduleForm] = useState({ date: "", start_time: "", end_time: "", reason: "" });
  const [submittingReschedule, setSubmittingReschedule] = useState(false);

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleItem || !rescheduleForm.date || !rescheduleForm.start_time || !rescheduleForm.end_time || !rescheduleForm.reason) {
      Swal.fire("Peringatan", "Harap lengkapi semua isian.", "warning");
      return;
    }
    
    setSubmittingReschedule(true);
    try {
      const res = await fetch("/api/penguji/jadwal/reschedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jadwal_id: rescheduleItem.id,
          proposed_date: rescheduleForm.date,
          proposed_start: rescheduleForm.start_time,
          proposed_end: rescheduleForm.end_time,
          reason: rescheduleForm.reason
        })
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire("Berhasil", data.message, "success");
        setRescheduleModalOpen(false);
        fetchAssignments();
      } else {
        Swal.fire("Gagal", data.error, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Gagal mengirim pengajuan.", "error");
    } finally {
      setSubmittingReschedule(false);
    }
  };
`;
if (!code.includes('handleRescheduleSubmit')) {
  code = code.replace(hookAnchor, hookAnchor + '\n' + stateCode);
}
fs.writeFileSync('src/app/dashboard/penguji/jadwal/page.tsx', code);
