document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedback-form");
  const messageBox = document.getElementById("message");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const feedback = document.getElementById("feedback").value.trim();

      if (!feedback) {
        messageBox.textContent = "Please enter feedback before submitting.";
        messageBox.style.color = "red";
        return;
      }

      try {
        const res = await fetch("/submit-feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ feedback }),
        });

        if (!res.ok) throw new Error("Server returned an error.");

        const data = await res.json();
        messageBox.textContent = data.message;
        messageBox.style.color = "green";
        form.reset();
      } catch (err) {
        console.error("Submission failed:", err);
        messageBox.textContent = "Failed to submit feedback.";
        messageBox.style.color = "red";
      }
    });
  }
});
