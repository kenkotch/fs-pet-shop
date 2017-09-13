module.exports = {
 "extends": [
    'airbnb'
  ],
  rules: {
    "prefer-const": "off",
    "no-implicit-globals": "off",
    "strict": "off",
    "quotes": "off",
    "no-unused-vars": "off",
    "no-else-return": "off",
    "no-multiple-empty-lines": "off",
	
    // Semicolon and console heaven.
    "no-console": 0,
    "semi": ["error", "never"],
    "no-unreachable": "error",
    "no-unexpected-multiline": "error"
  }
};
