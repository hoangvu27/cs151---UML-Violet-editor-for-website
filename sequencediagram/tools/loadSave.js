function saveBlob (blob, fileName, auto) {
  const downloadElement = document.createElement('a')
  const url = window.URL.createObjectURL(blob)
  downloadElement.href = url
  downloadElement.download = fileName
  if (!auto) {
    downloadElement.appendChild(document.createTextNode(fileName))
    document.body.appendChild(downloadElement)
  } else {
    downloadElement.style = 'display: none'
    downloadElement.click()
    window.URL.revokeObjectURL(url)
  }
}

function loadGraph (files) {
  const reader = new FileReader()
  reader.onload = (e) => {
    console.log(e.target.result)
    return JSON.parse(e.target.result)
  }
  reader.readAsText(files[0])
}
