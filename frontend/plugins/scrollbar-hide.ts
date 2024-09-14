module.exports = function ({ addUtilities }) {
  addUtilities({
    ".scrollbar-hide": {
      "-ms-overflow-style": "none" /* IE and Edge */,
      "scrollbar-width": "none" /* Firefox */,
    },
    ".scrollbar-hide::-webkit-scrollbar": {
      display: "none" /* Chrome, Safari, and Opera */,
    },
  });
};