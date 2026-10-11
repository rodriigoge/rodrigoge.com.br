// Usage: node scripts/prepare-hero-gif.cjs <source.gif> [sharp module path]
// Removes edge-connected near-white background without removing enclosed whites.
const sharp = require(process.argv[3] || 'sharp');
const path = require('node:path');

async function prepare() {
  const source = process.argv[2];
  if (!source) throw new Error('Pass the source GIF path.');
  const metadata = await sharp(source, {animated: true}).metadata();
  const {data, info} = await sharp(source, {animated: true}).ensureAlpha().raw().toBuffer({resolveWithObject: true});
  const width = info.width;
  const height = metadata.pageHeight || info.height;
  const pixels = width * height;

  for (let frame = 0; frame < metadata.pages; frame++) {
    const offset = frame * pixels * 4;
    const visited = new Uint8Array(pixels);
    const queue = new Int32Array(pixels);
    let start = 0;
    let end = 0;
    function enqueue(pixel) {
      if (visited[pixel]) return;
      visited[pixel] = 1;
      const i = offset + pixel * 4;
      const min = Math.min(data[i], data[i + 1], data[i + 2]);
      const max = Math.max(data[i], data[i + 1], data[i + 2]);
      if (data[i + 3] === 0 || (min >= 218 && max - min <= 22)) queue[end++] = pixel;
    }
    for (let x = 0; x < width; x++) { enqueue(x); enqueue((height - 1) * width + x); }
    for (let y = 0; y < height; y++) { enqueue(y * width); enqueue(y * width + width - 1); }
    while (start < end) {
      const pixel = queue[start++];
      data[offset + pixel * 4 + 3] = 0;
      const x = pixel % width;
      if (x > 0) enqueue(pixel - 1);
      if (x < width - 1) enqueue(pixel + 1);
      if (pixel >= width) enqueue(pixel - width);
      if (pixel < pixels - width) enqueue(pixel + width);
    }
  }

  const destination = path.resolve('public/images');
  await sharp(data, {raw: {width, height: info.height, channels: 4, pageHeight: height}})
    .gif({loop: metadata.loop ?? 0, delay: metadata.delay, dither: 0, effort: 7})
    .toFile(path.join(destination, 'rodrigo-skateboard.gif'));
  const lastFrame = data.subarray((metadata.pages - 1) * pixels * 4);
  await sharp(lastFrame, {raw: {width, height, channels: 4}}).png()
    .toFile(path.join(destination, 'rodrigo-skateboard-still.png'));
  console.log(`Prepared ${metadata.pages} transparent frames (${width}×${height}).`);
}

prepare().catch((error) => { console.error(error); process.exitCode = 1; });
