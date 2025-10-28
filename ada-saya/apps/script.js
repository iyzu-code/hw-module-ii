document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loanForm")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const P = parseFloat(document.getElementById("principal").value)
    const n = parseInt(document.getElementById("tenor").value)
    const annualRate = 0.00003
    const r = annualRate / 12

    if (!P || !n) {
      showErrorAlert("Error", "Mohon isi semua data dengan benar", "error")
      return
    }

    //P (r(1+r)^n)/((1+r)^n -1)
    const monthlyPayment = (P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)).toFixed(0)
    console.log(monthlyPayment)

    showResultAlert(monthlyPayment, form)
  })
})

function showErrorAlert(title, text, icon) {
  Swal.fire(title, text, icon)
}

function showResultAlert(monthlyPayment, form) {
  Swal.fire({
    title: "Hasil Simulasi",
    text: `Cicilan per bulan: Rp ${Number(monthlyPayment)}`,
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Ajukan Pinjaman",
    cancelButtonText: "Reset",
  }).then((result) => {
    if (result.isConfirmed) {
      form.reset()
      showErrorAlert("Pinjaman Anda Sedang Ditinjau!", "silahkan tunggu pihak adasaya menghubungi anda", "success")
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      form.reset()
      showErrorAlert("Form telah direset.", "", "warning")
    }
  })
}
