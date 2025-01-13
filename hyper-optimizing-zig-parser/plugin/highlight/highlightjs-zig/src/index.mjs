/*
Language: Zig
Author: fwx <fwx5618177@gmail.com>
*/

export const zigLanguageSupport = (hljs) => {
  const LITERALS = ["true", "false", "null", "undefined"];
  const BUILT_INS = [
    "@This",
    "@import",
    "@as"
  ];
  const TYPES = [
    "Allocator",
    "Token",
    "anytype",
    "noreturn",
    "error",
    "anyerror",
    "anyframe",
    "anyopaque",
    'u6',
    "i8",
    "i16",
    "i32",
    "i64",
    "i128",
    "u1",
    "u2",
    "u3",
    "u4",
    "u5",
    "u6",
    "u7",
    "u8",
    "u16",
    "u32",
    "u64",
    "u128",
    "f16",
    "f32",
    "f64",
    "usize",
    "uword",
    "isize",
    "c_short",
    "c_int",
    "c_long",
    "c_longlong",
    "c_ushort",
    "c_uint",
    "c_ulong",
    "c_ulonglong",
    "c_float",
    "c_double",
    "c_void",
  ];
  const KWS = [
    "inline",
    "while",
    "for",
    "extern",
    "packed",
    "export",
    "pub",
    "noalias",
    "comptime",
    "volatile",
    "align",
    "linksection",
    "threadlocal",
    "allowzero",
    "noinline",
    "callconv",
    "struct",
    "enum",
    "const",
    "union",
    "opaque",
    "asm",
    "unreachable",
    "break",
    "return",
    "continue",
    "defer",
    "errdefer",
    "await",
    "resume",
    "suspend",
    "async",
    "nosuspend",
    "try",
    "catch",
    "if",
    "else",
    "switch",
    "orelse",
    "usingnamespace",
    "test",
    "and",
    "or",
    "bool",
    "void",
    "type",
    "blk",
    "var",
  ];

  const OPERATORS = ["+", "-", "*", "/", "%", "==", "!=", "<", ">", "<=", ">="];

  const KEYWORDS = {
    keyword: KWS,
    literal: LITERALS,
    built_in: BUILT_INS,
    type: TYPES,
    operator: OPERATORS,
  };

  const lists = Object.entries(KEYWORDS).map(([className, list]) => ({ className, begin: new RegExp("\\b" + list.map(text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')).sort((a, b) => b.length - a.length).join('|') + "\\b") }))

  return {
    name: "zig",
    aliases: ["zig"],
    keywords: KEYWORDS,
    illegal: /\/\*/,
    contains: [
      {
        className: "number",
        begin: /\b0b[01_]+/,
      },
      {
        className: "number",
        begin: /\b[0-9]+\b/,
      },
      // built-in
      {
        className: "built_in",
        begin: "\\bmem\\.Copy\\b",
      },
      // meta-event
      {
        className: "meta-event",
        begin: /\|[a-zA-Z_]+\|/,
      },
      // TODO 注释
      {
        className: "comment-todo",
        begin: /\/\/\s*TODO:.*$/,
      },
      // 单行注释
      {
        className: "comment",
        begin: /\/\/[^\n]*/,
      },
      // 错误处理符号 !（特别是在类型中）
      {
        className: "errorhandling",
        begin: /!(?=\w+)/,
      },

      // 处理可选参数和可选类型，如 ?params 或 ?void
      // {
      //   className: "optional",
      //   begin: /\?(?=[a-zA-Z_])/,
      // },
      // 简化的操作符
      {
        className: "operator",
        begin: /[-}{+%/*=<>!]=?|&&|\|\||<<=?|>>=?|\*\*|\+\+|--|\->|\.\.+/,
      },
      // 属性访问和方法调用
      {
        className: "property",
        begin: /\.\w+/,
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        className: "built_in",
        begin: "@[a-zA-Z_]\\w*",
      },
      {
        className: "meta",
        begin: /@[a-zA-Z_]\w*/,
      },
      {
        className: "symbol",
        begin: /'[a-zA-Z_][a-zA-Z0-9_]*'/,
      },
      {
        className: "literal",
        begin: /\\[xuU][a-fA-F0-9]+/,
      },
      {
        className: "number",
        begin: /\b0x[0-9a-fA-F_]+/,
      },
      {
        className: "number",
        begin: /\b0o[0-7]+/,
      },

      hljs.REGEXP_MODE,
      {
        className: "function",
        beginKeywords: "fn",
        end: /\{/,
        excludeEnd: true,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, { begin: /[a-zA-Z_][a-zA-Z0-9_]*/ }),
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            endsParent: true,
            keywords: KEYWORDS,
            contains: [hljs.C_LINE_COMMENT_MODE,
            {
              className: "number",
              begin: /\b[0-9]+\b/,
            },
            {
              className: "built_in",
              begin: "@[a-zA-Z_]\\w*",
            },

            {
              className: "operator",
              begin: /:|\(/,
            },
            ],
          },

        ],
      },
      // 函数调用
      {
        className: "function-call",
        begin: /[a-zA-Z_][a-zA-Z0-9_]*\(/, // 匹配函数名和左括号
        end: /\)/,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          // hljs.inherit(hljs.TITLE_MODE, { begin: /[a-zA-Z_][a-zA-Z0-9_]*/ }),
          ...lists,
          {
            className: "built_in",
            begin: "@[a-zA-Z_]\\w*",
          },
          {
            className: "number",
            begin: /\b[0-9]+\b/,
          },
          hljs.QUOTE_STRING_MODE,
          {
            className: "identifier",
            begin: /[a-zA-Z_][a-zA-Z0-9_]*/
          },
          // {
          //   className: "params",
          //   begin: /\(/,
          //   end: /\)/,
          //   endsParent: false,
          //   keywords: KEYWORDS,
          //   contains: [hljs.QUOTE_STRING_MODE],
          // },
          {
            className: "number",
            begin: /\b0x[0-9a-fA-F_]+/,
          },
        ],
      },
      // 标点符号
      // {
      //   className: "punctuation",
      //   begin: /[{}=\[\];(),.:]/,
      // },
      // 特殊宏调用
      {
        className: "macro",
        begin: /@[a-zA-Z_][a-zA-Z0-9_]*/,
      },
      {
        // multiline string literals
        className: "multiline",
        begin: /\\/, end: /$/,
        relevance: 0,
        contains: [
          {
            begin: /\\/, end: /$/,
            relevance: 0,
          },
        ],
      },
    ],
  };
};


// module.exports = {
//   zigLanguageSupport
// }
