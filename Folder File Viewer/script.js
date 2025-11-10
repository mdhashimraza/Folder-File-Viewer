const folderInput = document.getElementById("folderInput");
const fileTableBody = document.querySelector("#fileTable tbody");
const modal = document.getElementById("infoModal");
const fileInfoDiv = document.getElementById("fileInfo");
const closeModal = document.getElementById("closeModal");

folderInput.addEventListener("change", handleFolderSelect);
closeModal.addEventListener("click", () => modal.style.display = "none");

function handleFolderSelect(e) {
  const files = Array.from(e.target.files);
  files.sort((a, b) => a.name.split('.').pop().localeCompare(b.name.split('.').pop())); // optional bonus

  fileTableBody.innerHTML = "";
  files.forEach(file => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = file.name.replace(/\.[^/.]+$/, ""); // remove extension

    const sizeCell = document.createElement("td");
    sizeCell.textContent = formatFileSize(file.size);

    const infoCell = document.createElement("td");
    const infoButton = document.createElement("button");
    infoButton.textContent = "Info";
    infoButton.addEventListener("click", () => showFileInfo(file));
    infoCell.appendChild(infoButton);

    row.append(nameCell, sizeCell, infoCell);
    fileTableBody.appendChild(row);
  });
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} bytes`;
  let kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(2)} kB`;
  let mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(2)} MB`;
  let gb = mb / 1024;
  if (gb < 1024) return `${gb.toFixed(2)} GB`;
  let tb = gb / 1024;
  return `${tb.toFixed(2)} TB`;
}

function showFileInfo(file) {
  const ext = file.name.split('.').pop();
  fileInfoDiv.innerHTML = `
    <h3>File Details</h3>
    <p><b>Name:</b> ${file.name.replace(/\.[^/.]+$/, "")}</p>
    <p><b>Extension:</b> .${ext}</p>
    <p><b>Size:</b> ${formatFileSize(file.size)}</p>
  `;
  modal.style.display = "flex";
}
