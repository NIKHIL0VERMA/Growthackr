import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';

function Speedometer(props) {
  const [currentValue, setCurrentValue] = createSignal(props.value || props.min);
  const isUserInput = props.isUserInput || false;
  let logo; // Declare logo variable here

  createEffect(()=>{
    drawSpeedometer(currentValue(), isUserInput ? "Adjust Value" : props.text); 
  }, [props.darkMode]);

  const drawSpeedometer = (value, text) => {
    const canvas = document.getElementById(props.text) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    const size = props.width || 250; // Use width for both dimensions to maintain 1:1
    canvas.width = size;
    canvas.height = size;

    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = size / 3; // Dynamic radius
    const lineWidthBg = radius * 0.2; // Background stroke size
    const lineWidthFg = radius * 0.15; // Foreground stroke size
    const minRad = 0.75 * Math.PI;
    const maxRad = 2.25 * Math.PI;
    const valueRange = props.max - props.min;
    const valueRad = ((value - props.min) / valueRange) * (maxRad - minRad) + minRad;

    // Get colors from CSS
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--progress-bg').trim() || "grey";
    const fgColor = getComputedStyle(document.documentElement).getPropertyValue('--progress-fg').trimEnd() || "red";
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trimEnd() || "#155D9B";

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.beginPath();
    ctx.arc(x, y, radius, minRad, maxRad);
    ctx.lineWidth = lineWidthBg;
    ctx.lineCap = "round";
    ctx.strokeStyle = bgColor;
    ctx.stroke();

    // Foreground
    ctx.beginPath();
    ctx.arc(x, y, radius, minRad, valueRad);
    ctx.lineWidth = lineWidthFg;
    ctx.lineCap = "round";
    ctx.strokeStyle = fgColor;
    ctx.stroke();

    // Set dynamic font size
    const fontSize = size * 0.05; // 5% of size
    ctx.textAlign = "center";
    ctx.font = `${fontSize}px Helvetica`;
    ctx.fillStyle = textColor;

    // Adjust padding by 50%
    const padding = fontSize * 0.25; // Reduced padding to 25% of font size

    // Draw the logo if present
    if (logo) {
      ctx.drawImage(logo, x - logo.width / 2, y - logo.height / 2);
      ctx.fillText(text, x, y + logo.height / 2 + padding + fontSize); // Text below the logo
    } else {
      ctx.fillText(text, x, y); // Center text if no logo
    }
  };

  const updateValueFromMouse = (mouseX, mouseY) => {
    const canvas = document.getElementById(props.text);
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const angle = Math.atan2(dy, dx);

    const minRad = 0.75 * Math.PI;
    const maxRad = 2.25 * Math.PI;
    const valueRange = props.max - props.min;

    const clampedAngle = Math.max(minRad, Math.min(maxRad, angle));
    const newValue = ((clampedAngle - minRad) / (maxRad - minRad)) * valueRange + props.min;
    setCurrentValue(Math.round(newValue));
    drawSpeedometer(Math.round(newValue), `${Math.round(newValue)}%`); // Pass the value and text
  };

  onMount(() => {
    logo = new Image(); // Assign logo here
    logo.src = props.logo;

    logo.onload = () => {
      drawSpeedometer(currentValue(), isUserInput ? "Adjust Value" : props.text);
    };

    drawSpeedometer(currentValue(), isUserInput ? "Adjust Value" : props.text);

    let isDragging = false;

    if (isUserInput) {
      const canvas = document.getElementById(props.text);

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

      canvas.addEventListener('mousedown', onMouseDown);
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseup', onMouseUp);
      canvas.addEventListener('mouseleave', onMouseUp);

      onCleanup(() => {
        canvas.removeEventListener('mousedown', onMouseDown);
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseup', onMouseUp);
        canvas.removeEventListener('mouseleave', onMouseUp);
      });
    }
  });

  return (
    <canvas id={props.text}>
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  );
}

export default Speedometer;
