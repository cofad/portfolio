const addYourVisitButton = document.querySelector("#add-your-visit");
const addYourVisitResponse = document.querySelector("#add-your-visit-response");

addYourVisitButton.addEventListener("click", async () => {
  const endpoint = "https://will-warner-portfolio.fly.dev/visit";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      const visit = await response.json();
      console.log("Visit successfully recorded!", visit);
      addYourVisitButton.disabled = true;
      addYourVisitResponse.textContent = `Thank you! Your visit has been recorded with ID: ${visit.id}`;
    } else {
      console.error(
        `Failed to record visit. Status: ${response.status} ${response.statusText}`
      );

      const errorText = await response.text();
      console.error("Server error response:", errorText);
    }
  } catch (error) {
    console.error("Network error during fetch operation:", error);
  }
});
