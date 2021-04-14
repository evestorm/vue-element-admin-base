module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["plugin:vue/recommended", "eslint:recommended", "@vue/prettier"],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "vue/max-attributes-per-line": [
      2,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/name-property-casing": ["error", "PascalCase"],
    "vue/no-v-html": "off",
    "accessor-pairs": 2,
    "arrow-spacing": [
      2,
      {
        before: true,
        after: true,
      },
    ],
    "block-spacing": [2, "always"],
    "brace-style": [
      2,
      "1tbs",
      {
        allowSingleLine: true,
      },
    ],
    camelcase: [
      0,
      {
        properties: "always",
      },
    ],
    "comma-dangle": [2, "never"],
    "comma-spacing": [
      2,
      {
        before: false,
        after: true,
      },
    ],
    "comma-style": [2, "last"],
    "constructor-super": 2,
    curly: [2, "multi-line"],
    "dot-location": [2, "property"],
    "eol-last": 2,
    eqeqeq: ["error", "always", { null: "ignore" }],
    "generator-star-spacing": [
      2,
      {
        before: true,
        after: true,
      },
    ],
    "handle-callback-err": [2, "^(err|error)$"],
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    "jsx-quotes": [2, "prefer-single"],
    "key-spacing": [
      2,
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    "keyword-spacing": [
      2,
      {
        before: true,
        after: true,
      },
    ],
    "new-cap": [
      2,
      {
        newIsCap: true,
        capIsNew: false,
      },
    ],
    "new-parens": 2,
    "no-array-constructor": 2,
    "no-caller": 2,
    "no-console": "off",
    "no-class-assign": 2,
    "no-cond-assign": 2,
    "no-const-assign": 2,
    "no-control-regex": 0,
    "no-delete-var": 2,
    "no-dupe-args": 2,
    "no-dupe-class-members": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty-character-class": 2,
    "no-empty-pattern": 2,
    "no-eval": 2,
    "no-ex-assign": 2,
    "no-extend-native": 2,
    "no-extra-bind": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-parens": [2, "functions"],
    "no-fallthrough": 2,
    "no-floating-decimal": 2,
    "no-func-assign": 2,
    "no-implied-eval": 2,
    "no-inner-declarations": [2, "functions"],
    "no-invalid-regexp": 2,
    "no-irregular-whitespace": 2,
    "no-iterator": 2,
    "no-label-var": 2,
    "no-labels": [
      2,
      {
        allowLoop: false,
        allowSwitch: false,
      },
    ],
    "no-lone-blocks": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-multi-spaces": 2,
    "no-multi-str": 2,
    "no-multiple-empty-lines": [
      2,
      {
        max: 1,
      },
    ],
    "no-native-reassign": 2,
    "no-negated-in-lhs": 2,
    "no-new-object": 2,
    "no-new-require": 2,
    "no-new-symbol": 2,
    "no-new-wrappers": 2,
    "no-obj-calls": 2,
    "no-octal": 2,
    "no-octal-escape": 2,
    "no-path-concat": 2,
    "no-proto": 2,
    "no-redeclare": 2,
    "no-regex-spaces": 2,
    "no-return-assign": [2, "except-parens"],
    "no-self-assign": 2,
    "no-self-compare": 2,
    "no-sequences": 2,
    "no-shadow-restricted-names": 2,
    "no-spaced-func": 2,
    "no-sparse-arrays": 2,
    "no-this-before-super": 2,
    "no-throw-literal": 2,
    "no-trailing-spaces": 2,
    "no-undef": 2,
    "no-undef-init": 2,
    "no-unexpected-multiline": 2,
    "no-unmodified-loop-condition": 2,
    "no-unneeded-ternary": [
      2,
      {
        defaultAssignment: false,
      },
    ],
    "no-unreachable": 2,
    "no-unsafe-finally": 2,
    "no-unused-vars": [
      2,
      {
        vars: "all",
        args: "none",
      },
    ],
    "no-useless-call": 2,
    "no-useless-computed-key": 2,
    "no-useless-constructor": 2,
    "no-useless-escape": 0,
    "no-whitespace-before-property": 2,
    "no-with": 2,
    "one-var": [
      2,
      {
        initialized: "never",
      },
    ],
    "operator-linebreak": [
      2,
      "after",
      {
        overrides: {
          "?": "before",
          ":": "before",
        },
      },
    ],
    "padded-blocks": [2, "never"],
    quotes: [
      2,
      "single",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    semi: 0,
    "semi-spacing": [
      2,
      {
        before: false,
        after: true,
      },
    ],
    "space-before-blocks": [2, "always"],
    "space-before-function-paren": [2, "never"],
    "space-in-parens": [2, "never"],
    "space-infix-ops": 2,
    "space-unary-ops": [
      2,
      {
        words: true,
        nonwords: false,
      },
    ],
    "spaced-comment": [
      2,
      "always",
      {
        markers: ["global", "globals", "eslint", "eslint-disable", "*package", "!", ","],
      },
    ],
    "template-curly-spacing": [2, "never"],
    "use-isnan": 2,
    "valid-typeof": 2,
    "wrap-iife": [2, "any"],
    "yield-star-spacing": [2, "both"],
    yoda: [2, "never"],
    "prefer-const": 2,
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "object-curly-spacing": [
      2,
      "always",
      {
        objectsInObjects: false,
      },
    ],
    "array-bracket-spacing": [2, "never"],
    "prettier/prettier": [
      // 上方 extends 中 "@vue/prettier" 的自定义配置
      "warn",
      {
        "#": "prettier config in here :)",
        printWidth: 180, // 一行的字符数，如果超过会进行换行，默认为80
        tabWidth: 2, // 一个tab代表几个空格数，默认为2
        useTabs: false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
        semi: true, // 行尾是否使用分号，默认为true
        singleQuote: false, // 字符串是否使用单引号，默认为false，使用双引号
        quoteProps: "as-needed", // 对象属性的引号使用 as-needed:仅在需要的时候使用 | consistent:有一个属性需要引号，就都需要引号 | preserve:保留用户输入的情况 默认 as-needed
        jsxSingleQuote: false, // 在JSX中使用单引号而不是双引号。默认 false
        trailingComma: "all", // 是否使用尾逗号，有三个可选值 'none':末尾没有逗号 | 'es5':es5有效的地方保留 | 'all':在可能的地方都加上逗号 默认为es5
        bracketSpacing: true, // 字面量对象括号中的空格，默认true
        jsxBracketSameLine: false, // 将多行JSX元素的>放在最后一行的末尾，而不是单独放在下一行(这不适用于自闭元素)。默认false
        arrowParens: "avoid", // 箭头函数中的括号 'avoid': 在有需要的时候使用. Example: x => x | 'always' - 一直使用. Example: (x) => x
        rangeStart: 0, // default:0
        rangeEnd: null, // default:Infinity
        insertPragma: false, // default:false
        requirePragma: false, // default:false
        proseWrap: "preserve", // 不包装 markdown text default:"preserve"
        htmlWhitespaceSensitivity: "strict", // HTML空白敏感性 default:"css"
        vueIndentScriptAndStyle: false, // 缩进vue文件中的script和style标签 false:不缩进Vue文件中的脚本和样式标签 | true - 缩进Vue文件中的脚本和样式标签 默认false
        endOfLine: "auto", // 设置统一的行结尾样式 "lf": 仅换行（\ n），在Linux和macOS以及git repos内部通用 | "crlf": 回车符+换行符（\ r \ n），在Windows上很常见 | "cr" - 仅回车符（\ r），很少使用 | "auto" - 保持现有的行尾（通过查看第一行后的内容对一个文件中的混合值进行归一化）地址：https://stackoverflow.com/questions/53516594/why-do-i-keep-getting-delete-cr-prettier-prettier
        embeddedLanguageFormatting: "auto", // default:"auto"
      },
    ],
  },
};
