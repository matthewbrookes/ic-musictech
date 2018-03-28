module.exports = {
    "env": {
        "node": true
    },
    "plugins": [
      "prettier"
    ],
    "extends": [
      "eslint:recommended",
      "plugin:prettier/recommended"
    ],
    "rules": {
        "prettier/prettier": "error",
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "warn"
        ]
    }
};
