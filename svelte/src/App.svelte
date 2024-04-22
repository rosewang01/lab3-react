<script>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  let color = '#000000';
  let size = 3;
  let isPainting = false;
  let canvasRef = null;

  onMount(() => {
    const canvas = canvasRef;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
  });

  const dispatch = createEventDispatcher();

  const handleColorChange = (event) => {
    color = event.target.value;
  };

  const handleSizeChange = (event) => {
    size = parseInt(event.target.value);
  };

  const startPaint = (event) => {
    const { offsetX, offsetY } = event;
    const canvas = canvasRef;
    const context = canvas.getContext('2d');
    
    isPainting = true;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const paint = (event) => {
    if (!isPainting) return;

    const { offsetX, offsetY } = event;
    const canvas = canvasRef;
    const context = canvas.getContext('2d');

    context.strokeStyle = color;
    context.lineWidth = size;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopPaint = () => {
    isPainting = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
</script>

<style>
  #paint {
    position: relative;
  }
  
  #canvas {
    border: 1px solid black;
  }
  
  #tools {
    position: absolute;
    top: 10px;
    left: 10px;
  }
</style>

<div id="paint">
  <canvas
    bind:this={canvasRef}
    id="canvas"
    width="800"
    height="400"
    on:mousedown={startPaint}
    on:mousemove={paint}
    on:mouseup={stopPaint}
    on:mouseleave={stopPaint}
  ></canvas>
  <div id="tools">
    <button on:click={clearCanvas}>Clear</button>
    <label for="color">Color:</label>
    <input
      type="color"
      id="color"
      bind:value={color}
      on:input={handleColorChange}
    />
    <label for="size">Size:</label>
    <input
      type="range"
      id="size"
      min="1"
      max="10"
      bind:value={size}
      on:input={handleSizeChange}
    />
  </div>
</div>
