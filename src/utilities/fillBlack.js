function fillBlack() {
    let canvases = ["canvas-input", "canvas-removed-background", "canvas-thresh", "canvas-output"]
    canvases.forEach((currentCanvas) => {
      let canvas = document.querySelector('#' + currentCanvas)
      let context = canvas.getContext('2d');
      context.fillStyle = "#000000";
      context.fillRect(0, 0, canvas.width, canvas.height);
    });
}


export default fillBlack;