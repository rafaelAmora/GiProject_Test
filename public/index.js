document
  .getElementById("emailForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const date = new Date().getHours();

    fetch("http://localhost:3009/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, date }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Email enviado com sucesso:", data))
      .catch((error) => console.error("Erro ao enviar e-mail:", error));
  });
