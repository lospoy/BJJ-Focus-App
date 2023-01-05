const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: { port: 8000 },
});

module.exports = {
    pages: {
      index: {
        // entry for the page
        entry: 'src/main.js',
        title: 'BJJ Focus',
      },
    }
  }
