module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jest": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "no-console": "off",
        "linebreak-style": ["error", (require("os").EOL === "\r\n" ? "windows" : "unix")],
        "no-unused-vars": ["warn", {"vars": "all", "args":"none", "ignoreRestSiblings":false}],
        "quotes": ["warn", "single"],
        "semi": ["warn", "always"],
        "array-bracket-spacing": ["error", "never"],
        "dot-notation": "error",
        "indent": ["error", 4, {"SwitchCase": 1}],
        "max-len": ["error", 1000, {"ignoreComments": true}],
        "new-cap": ["error", {"capIsNewExceptions": ["Router"], "newIsCapExceptions": ["from"]}],
        "no-floating-decimal": "error",
        "no-lonely-if": "off",
        "no-spaced-func": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": "warn",
        "no-unused-vars": ["error", {"vars": "all", "args":"none", "ignoreRestSiblings":false}],
        "no-use-before-define": ["error", {"functions": false}],
        "no-useless-call": "error",
        "no-with": "error",
        "require-jsdoc": ["warn", {
            "require": {
                "ClassDeclaration": true,
                "MethodDefinition": true,
                "FunctionDeclaration": true
            }
        }],
        "sort-imports": 2,
        "space-before-blocks": "error",
        "strict": ["error", "global"],
        "no-eval": "error",
        "no-implied-eval": "error",
        "no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 0, "maxEOF": 0}],
        "keyword-spacing": ["error", { "before": true, "after": true }]
    }
}