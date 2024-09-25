import { createSignal, onCleanup, onMount } from 'solid-js';

function Speedometer(props) {
  const canvasId = 'progressbar';
  const [currentValue, setCurrentValue] = createSignal(props.value || props.min);

  const drawSpeedometer = (min, max, value, text) => {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const width = 600;
    const x = 400;
    const y = 400;
    const radius = 300;
    const minRad = 0.75 * Math.PI; // Starting angle
    const maxRad = 2.25 * Math.PI; // Ending angle
    const valueRange = max - min;
    const valueRad = ((value - min) / valueRange) * (maxRad - minRad) + minRad;

    const toolTipWidth = 100;
    const toolTipHeight = 60;
    const toolTipArrowHeight = 30;

    // Create gradient
    const grd = ctx.createLinearGradient(x - radius, 0, x - radius + width, 0);
    grd.addColorStop(0, "#B5D333");
    grd.addColorStop(0.25, "#36B0AC");
    grd.addColorStop(0.5, "#4F71B7");
    grd.addColorStop(0.75, "#36B0AC");
    grd.addColorStop(1, "#B5D333");

    const grd2 = ctx.createLinearGradient(0, 0, toolTipWidth, 0);
    grd2.addColorStop(0, "white");
    grd2.addColorStop(1, "#D8D8D8");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.beginPath();
    ctx.arc(x, y, radius, minRad, maxRad);
    ctx.lineWidth = 50;
    ctx.lineCap = "round";
    ctx.strokeStyle = "grey";
    ctx.stroke();

    // Foreground
    ctx.beginPath();
    ctx.arc(x, y, radius, minRad, valueRad);
    ctx.lineWidth = 40;
    ctx.lineCap = "round";
    ctx.strokeStyle = grd;
    ctx.stroke();

    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(valueRad);
    ctx.rect(radius + toolTipArrowHeight, -toolTipWidth / 2, toolTipHeight, toolTipWidth);
    ctx.moveTo(radius + toolTipArrowHeight, -toolTipWidth / 2);
    ctx.lineTo(radius, 0);
    ctx.lineTo(radius + toolTipArrowHeight, toolTipWidth / 2);
    ctx.fillStyle = grd2;
    ctx.fill();

    ctx.rotate(0.5 * Math.PI);
    ctx.textAlign = "center";
    ctx.font = "30px Helvetica";
    ctx.fillStyle = "#155D9B";
    ctx.fillText(text, 0, -radius - toolTipArrowHeight - (toolTipHeight / 4));
  };

  const updateValueFromMouse = (mouseX, mouseY) => {
    const canvas = document.getElementById(canvasId);
    const rect = canvas.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const dx = mouseX - x;
    const dy = mouseY - y;
    const angle = Math.atan2(dy, dx);
    
    const minRad = 0.75 * Math.PI;
    const maxRad = 2.25 * Math.PI;
    const valueRange = props.max - props.min;

    // Clamp angle to min and max radians
    const clampedAngle = Math.max(minRad, Math.min(maxRad, angle));

    // Calculate new value based on angle
    const newValue = ((clampedAngle - minRad) / (maxRad - minRad)) * valueRange + props.min;
    setCurrentValue(Math.round(newValue)); // Update current value
    drawSpeedometer(props.min, props.max, Math.round(newValue), `${Math.round(newValue)}%`); // Redraw
  };

  onMount(() => {
    drawSpeedometer(props.min, props.max, currentValue(), `${currentValue()}%`);

    const canvas = document.getElementById(canvasId);

    const onMouseMove = (e) => {
      if (isDragging) {
        updateValueFromMouse(e.clientX, e.clientY);
      }
    };

    const onMouseDown = (e) => {
      isDragging = true;
      updateValueFromMouse(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    let isDragging = false;

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);

    // Cleanup event listeners on component unmount
    onCleanup(() => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
    });
  });

  return (
    <canvas id={canvasId} width="800" height="700" style="border:1px solid #d3d3d3;">
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  );
}

export default Speedometer;
