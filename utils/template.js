const template = (rendered, preloadedState) => (
  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="style.css">
      <title>Aboder</title>
  </head>
  <body>
      <div id="reviews">Reviews</div>
      <div id="availability">${rendered}</div>
      <div id="priceSummary">Price Summary</div>
      <script>
        window.__preloadedState__ = ${JSON.stringify(preloadedState)}
      </script>
      <script src="reservationsBundle.js"></script>
  </body>
  </html>
  `
);

module.exports = template;
