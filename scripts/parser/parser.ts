import { bundledLanguages, createHighlighter } from "shiki";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { visit } from "unist-util-visit";
import { toMdast } from "hast-util-to-mdast";

const netlifyTheme = {
  name: "Netlify",
  author: "Austin Condiff",
  maintainers: ["Austin Condiff <austin.condiff@gmail.com>"],
  semanticClass: "theme.netlify",
  semanticHighlighting: true,
  netlify: {
    base: ["#00AD9E", "#FFFFFF", "#000000", "#FFFFFF00"],
    ansi: [
      "#F77373",
      "#A5D069",
      "#FFD050",
      "#9174F7",
      "#DF76C7",
      "#2ACEC0",
      "#E9ECEF",
      "#6F7C88",
      "#FFA5A5",
      "#CDECA1",
      "#FFE98D",
      "#BAA6FF",
      "#F5A8E3",
      "#78F0E6",
      "#FFFFFF",
    ],
    dark: [
      "#E9ECEF",
      "#6F7C88",
      "#3E4B58",
      "#1E2E39",
      "#172730",
      "#0E1E25",
      "#0B181C",
      "#071113",
      "#000000",
      "#2ACEC0",
      "#A5D069",
      "#FFA25F",
      "#DF76C7",
      "#9174F7",
      "#69A7FF",
      "#F77373",
      "#FFD050",
      "#212A35",
    ],
    light: [
      "#0E1E25",
      "#616C7A",
      "#A6ACBA",
      "#BCC0CD",
      "#D3D6DF",
      "#E3E4EB",
      "#EEEFF2",
      "#FFFFFF",
      "#0E1E2501",
      "#00978F",
      "#7BA63B",
      "#E17533",
      "#B74A9D",
      "#6749D0",
      "#3D7BDE",
      "#D04747",
      "#E3A323",
      "#E3E4EB",
    ],
  },
  colors: {
    "terminal.background": "#071113",
    "terminal.foreground": "#E9ECEF",
    "terminal.ansiBrightBlack": "#6F7C88",
    "terminal.ansiBrightRed": "#FFA5A5",
    "terminal.ansiBrightGreen": "#CDECA1",
    "terminal.ansiBrightYellow": "#FFE98D",
    "terminal.ansiBrightBlue": "#BAA6FF",
    "terminal.ansiBrightMagenta": "#F5A8E3",
    "terminal.ansiBrightCyan": "#78F0E6",
    "terminal.ansiBrightWhite": "#FFFFFF",
    "terminal.ansiBlack": "#212A35",
    "terminal.ansiRed": "#F77373",
    "terminal.ansiGreen": "#A5D069",
    "terminal.ansiYellow": "#FFD050",
    "terminal.ansiBlue": "#9174F7",
    "terminal.ansiMagenta": "#DF76C7",
    "terminal.ansiCyan": "#2ACEC0",
    "terminal.ansiWhite": "#E9ECEF",
    contrastBorder: "#071113",
    focusBorder: "#FFFFFF00",
    foreground: "#E9ECEF",
    "widget.shadow": "#000000",
    "selection.background": "#00AD9E",
    errorForeground: "#F77373",
    "button.background": "#3E4B58",
    "button.foreground": "#E9ECEF",
    "dropdown.background": "#0E1E25",
    "dropdown.border": "#071113",
    "dropdown.foreground": "#E9ECEF",
    "input.background": "#071113",
    "input.foreground": "#E9ECEF",
    "input.border": "#071113",
    "input.placeholderForeground": "#6F7C88",
    "inputOption.activeBorder": "#00AD9E",
    "inputValidation.infoBorder": "#9174F7",
    "inputValidation.warningBorder": "#FFD050",
    "inputValidation.errorBorder": "#F77373",
    "badge.foreground": "#E9ECEF",
    "badge.background": "#3E4B58",
    "progressBar.background": "#00AD9E",
    "list.activeSelectionBackground": "#3E4B58",
    "list.activeSelectionForeground": "#E9ECEF",
    "list.dropBackground": "#3E4B58",
    "list.focusBackground": "#172730",
    "list.highlightForeground": "#2ACEC0",
    "list.hoverBackground": "#172730",
    "list.inactiveSelectionBackground": "#172730",
    "list.warningForeground": "#FFA25F",
    "list.errorForeground": "#F77373",
    "activityBar.background": "#0E1E25",
    "activityBar.inactiveForeground": "#6F7C88",
    "activityBar.foreground": "#E9ECEF",
    "activityBar.activeBorder": "#00AD9E",
    "activityBarBadge.background": "#00AD9E",
    "activityBarBadge.foreground": "#E9ECEF",
    "sideBar.background": "#0B181C",
    "sideBarTitle.foreground": "#E9ECEF",
    "sideBarSectionHeader.background": "#0B181C",
    "sideBarSectionHeader.border": "#1E2E39",
    "editorGroup.background": "#071113",
    "editorGroup.border": "#1E2E39",
    "editorGroup.dropBackground": "#0B181C",
    "editorGroupHeader.noTabsBackground": "#0B181C",
    "editorGroupHeader.tabsBackground": "#071113",
    "editorGroupHeader.tabsBorder": "#071113",
    "tab.activeBackground": "#071113",
    "tab.activeForeground": "#E9ECEF",
    "tab.border": "#071113",
    "tab.activeBorder": "#00AD9E",
    "tab.inactiveBackground": "#071113",
    "tab.inactiveForeground": "#6F7C88",
    "editor.foreground": "#E9ECEF",
    "editor.background": "#071113",
    "editorLineNumber.foreground": "#6F7C88",
    "editor.selectionBackground": "#3E4B58",
    "editor.selectionHighlightBackground": "#172730",
    "editor.foldBackground": "#0B181C",
    "editor.wordHighlightBackground": "#2ACEC050",
    "editor.wordHighlightStrongBackground": "#A5D06950",
    "editor.findMatchBackground": "#FFA25F80",
    "editor.findMatchHighlightBackground": "#E9ECEF40",
    "editor.findRangeHighlightBackground": "#172730",
    "editor.hoverHighlightBackground": "#071113",
    "editor.lineHighlightBackground": "#0E1E25",
    "editorLink.activeForeground": "#2ACEC0",
    "editor.rangeHighlightBackground": "#9174F715",
    "editor.snippetTabstopHighlightBackground": "#071113",
    "editor.snippetTabstopHighlightBorder": "#6F7C88",
    "editor.snippetFinalTabstopHighlightBackground": "#071113",
    "editor.snippetFinalTabstopHighlightBorder": "#A5D069",
    "editorWhitespace.foreground": "#E9ECEF10",
    "editorIndentGuide.background": "#E9ECEF10",
    "editorIndentGuide.activeBackground": "#E9ECEF45",
    "editorRuler.foreground": "#E9ECEF10",
    "editorCodeLens.foreground": "#6F7C88",
    "editorOverviewRuler.border": "#071113",
    "editorOverviewRuler.selectionHighlightForeground": "#FFA25F",
    "editorOverviewRuler.wordHighlightForeground": "#2ACEC0",
    "editorOverviewRuler.wordHighlightStrongForeground": "#A5D069",
    "editorOverviewRuler.modifiedForeground": "#2ACEC080",
    "editorOverviewRuler.addedForeground": "#A5D06980",
    "editorOverviewRuler.deletedForeground": "#F7737380",
    "editorOverviewRuler.errorForeground": "#F7737380",
    "editorOverviewRuler.warningForeground": "#FFA25F80",
    "editorOverviewRuler.infoForeground": "#2ACEC080",
    "editorError.foreground": "#F77373",
    "editorWarning.foreground": "#FFD050",
    "editorGutter.modifiedBackground": "#2ACEC080",
    "editorGutter.addedBackground": "#A5D06980",
    "editorGutter.deletedBackground": "#F7737380",
    "gitDecoration.modifiedResourceForeground": "#2ACEC0",
    "gitDecoration.deletedResourceForeground": "#F77373",
    "gitDecoration.untrackedResourceForeground": "#A5D069",
    "gitDecoration.ignoredResourceForeground": "#6F7C88",
    "gitDecoration.conflictingResourceForeground": "#FFA25F",
    "diffEditor.insertedTextBackground": "#A5D06920",
    "diffEditor.removedTextBackground": "#F7737350",
    "editorWidget.background": "#0E1E25",
    "editorSuggestWidget.background": "#0B181C",
    "editorSuggestWidget.foreground": "#E9ECEF",
    "editorSuggestWidget.selectedBackground": "#3E4B58",
    "editorHoverWidget.background": "#071113",
    "editorHoverWidget.border": "#6F7C88",
    "editorMarkerNavigation.background": "#0B181C",
    "peekView.border": "#3E4B58",
    "peekViewEditor.background": "#071113",
    "peekViewEditor.matchHighlightBackground": "#FFD05080",
    "peekViewResult.background": "#0B181C",
    "peekViewResult.fileForeground": "#E9ECEF",
    "peekViewResult.lineForeground": "#E9ECEF",
    "peekViewResult.matchHighlightBackground": "#FFD05080",
    "peekViewResult.selectionBackground": "#3E4B58",
    "peekViewResult.selectionForeground": "#E9ECEF",
    "peekViewTitle.background": "#071113",
    "peekViewTitleDescription.foreground": "#6F7C88",
    "peekViewTitleLabel.foreground": "#E9ECEF",
    "merge.currentHeaderBackground": "#A5D06990",
    "merge.incomingHeaderBackground": "#9174F790",
    "editorOverviewRuler.currentContentForeground": "#A5D069",
    "editorOverviewRuler.incomingContentForeground": "#9174F7",
    "panel.background": "#071113",
    "panel.border": "#1E2E39",
    "panelTitle.activeBorder": "#00AD9E",
    "panelTitle.activeForeground": "#E9ECEF",
    "panelTitle.inactiveForeground": "#6F7C88",
    "statusBar.background": "#0E1E25",
    "statusBar.foreground": "#E9ECEF",
    "statusBar.debuggingBackground": "#F77373",
    "statusBar.debuggingForeground": "#071113",
    "statusBar.noFolderBackground": "#071113",
    "statusBar.noFolderForeground": "#E9ECEF",
    "statusBarItem.prominentBackground": "#F77373",
    "statusBarItem.prominentHoverBackground": "#FFA25F",
    "statusBarItem.remoteForeground": "#E9ECEF",
    "statusBarItem.remoteBackground": "#9174F7",
    "statusBar.border": "#1E2E39",
    "titleBar.activeBackground": "#172730",
    "titleBar.activeForeground": "#E9ECEF",
    "titleBar.inactiveBackground": "#0E1E25",
    "titleBar.inactiveForeground": "#6F7C88",
    "notification.background": "#071113",
    "notification.foreground": "#E9ECEF",
    "notification.buttonBackground": "#3E4B58",
    "notification.buttonForeground": "#E9ECEF",
    "notification.buttonHoverBackground": "#172730",
    "notification.errorBackground": "#F77373",
    "notification.errorForeground": "#E9ECEF",
    "notification.infoBackground": "#2ACEC0",
    "notification.infoForeground": "#071113",
    "notification.warningBackground": "#FFA25F",
    "notification.warningForeground": "#071113",
    "extensionButton.prominentForeground": "#E9ECEF",
    "extensionButton.prominentBackground": "#A5D06990",
    "extensionButton.prominentHoverBackground": "#A5D06960",
    "pickerGroup.border": "#1E2E39",
    "pickerGroup.foreground": "#2ACEC0",
    "debugToolBar.background": "#0B181C",
    "walkThrough.embeddedEditorBackground": "#0B181C",
    "settings.headerForeground": "#E9ECEF",
    "settings.modifiedItemForeground": "#00AD9E",
    "settings.modifiedItemIndicator": "#00AD9E",
    "settings.dropdownBackground": "#0E1E25",
    "settings.dropdownForeground": "#E9ECEF",
    "settings.dropdownBorder": "#0E1E25",
    "settings.checkboxBackground": "#0E1E25",
    "settings.checkboxForeground": "#E9ECEF",
    "settings.checkboxBorder": "#0E1E25",
    "settings.textInputBackground": "#0E1E25",
    "settings.textInputForeground": "#E9ECEF",
    "settings.textInputBorder": "#1E2E39",
    "settings.numberInputBackground": "#0E1E25",
    "settings.numberInputForeground": "#E9ECEF",
    "settings.numberInputBorder": "#0E1E25",
    "breadcrumb.foreground": "#6F7C88",
    "breadcrumb.background": "#071113",
    "breadcrumb.focusForeground": "#E9ECEF",
    "breadcrumb.activeSelectionForeground": "#E9ECEF",
    "breadcrumbPicker.background": "#071113",
    "listFilterWidget.background": "#0E1E25",
    "listFilterWidget.outline": "#172730",
    "listFilterWidget.noMatchesOutline": "#F77373",
  },
  tokenColors: [
    {
      scope: ["emphasis"],
      settings: {
        fontStyle: "italic",
      },
    },
    {
      scope: ["strong"],
      settings: {
        fontStyle: "bold",
      },
    },
    {
      scope: ["header"],
      settings: {
        foreground: "#9174F7",
      },
    },
    {
      scope: ["source"],
      settings: {
        foreground: "#E9ECEF",
      },
    },
    {
      scope: ["meta.diff", "meta.diff.header"],
      settings: {
        foreground: "#6F7C88",
      },
    },
    {
      scope: ["markup.inserted"],
      settings: {
        foreground: "#A5D069",
      },
    },
    {
      scope: ["markup.deleted"],
      settings: {
        foreground: "#F77373",
      },
    },
    {
      scope: ["markup.changed"],
      settings: {
        foreground: "#FFA25F",
      },
    },
    {
      scope: ["invalid"],
      settings: {
        foreground: "#F77373",
        fontStyle: "underline italic",
      },
    },
    {
      scope: ["invalid.deprecated"],
      settings: {
        foreground: "#E9ECEF",
        fontStyle: "underline italic",
      },
    },
    {
      scope: ["entity.name.filename"],
      settings: {
        foreground: "#FFD050",
      },
    },
    {
      scope: ["markup.error"],
      settings: {
        foreground: "#F77373",
      },
    },
    {
      name: "Underlined markup",
      scope: ["markup.underline"],
      settings: {
        fontStyle: "underline",
      },
    },
    {
      name: "Bold markup",
      scope: ["markup.bold"],
      settings: {
        fontStyle: "bold",
        foreground: "#FFA25F",
      },
    },
    {
      name: "Markup headings",
      scope: ["markup.heading"],
      settings: {
        fontStyle: "bold",
        foreground: "#9174F7",
      },
    },
    {
      name: "Markup italic",
      scope: ["markup.italic"],
      settings: {
        foreground: "#FFD050",
        fontStyle: "italic",
      },
    },
    {
      name: "Bullets, lists (prose)",
      scope: [
        "beginning.punctuation.definition.list.markdown",
        "beginning.punctuation.definition.quote.markdown",
        "punctuation.definition.link.restructuredtext",
      ],
      settings: {
        foreground: "#2ACEC0",
      },
    },
    {
      name: "Inline code (prose)",
      scope: ["markup.inline.raw", "markup.raw.restructuredtext"],
      settings: {
        foreground: "#A5D069",
      },
    },
    {
      name: "Links (prose)",
      scope: ["markup.underline.link", "markup.underline.link.image"],
      settings: {
        foreground: "#2ACEC0",
      },
    },
    {
      name: "Link text, image alt text (prose)",
      scope: [
        "meta.link.reference.def.restructuredtext",
        "punctuation.definition.directive.restructuredtext",
        "string.other.link.description",
        "string.other.link.title",
      ],
      settings: {
        foreground: "#DF76C7",
      },
    },
    {
      name: "Blockquotes (prose)",
      scope: ["entity.name.directive.restructuredtext", "markup.quote"],
      settings: {
        foreground: "#FFD050",
        fontStyle: "italic",
      },
    },
    {
      name: "Horizontal rule (prose)",
      scope: ["meta.separator.markdown"],
      settings: {
        foreground: "#6F7C88",
      },
    },
    {
      name: "Code blocks",
      scope: [
        "fenced_code.block.language",
        "markup.raw.inner.restructuredtext",
        "markup.fenced_code.block.markdown punctuation.definition.markdown",
      ],
      settings: {
        foreground: "#A5D069",
      },
    },
    {
      name: "Prose constants",
      scope: ["punctuation.definition.constant.restructuredtext"],
      settings: {
        foreground: "#9174F7",
      },
    },
    {
      name: "Braces in markdown headings",
      scope: [
        "markup.heading.markdown punctuation.definition.string.begin",
        "markup.heading.markdown punctuation.definition.string.end",
      ],
      settings: {
        foreground: "#9174F7",
      },
    },
    {
      name: "Braces in markdown paragraphs",
      scope: [
        "meta.paragraph.markdown punctuation.definition.string.begin",
        "meta.paragraph.markdown punctuation.definition.string.end",
      ],
      settings: {
        foreground: "#E9ECEF",
      },
    },
    {
      name: "Braces in markdown blockquotes",
      scope: [
        "markup.quote.markdown meta.paragraph.markdown punctuation.definition.string.begin",
        "markup.quote.markdown meta.paragraph.markdown punctuation.definition.string.end",
      ],
      settings: {
        foreground: "#FFD050",
      },
    },
    {
      name: "User-defined class names",
      scope: ["entity.name.type.class", "entity.name.class"],
      settings: {
        foreground: "#2ACEC0",
        fontStyle: "normal",
      },
    },
    {
      name: "this, super, self, etc.",
      scope: [
        "keyword.expressions-and-types.swift",
        "keyword.other.this",
        "variable.language",
        "variable.language punctuation.definition.variable.php",
        "variable.other.readwrite.instance.ruby",
        "variable.parameter.function.language.special",
      ],
      settings: {
        foreground: "#9174F7",
        fontStyle: "italic",
      },
    },
    {
      name: "Inherited classes",
      scope: ["entity.other.inherited-class"],
      settings: {
        fontStyle: "italic",
        foreground: "#2ACEC0",
      },
    },
    {
      name: "Comments",
      scope: [
        "comment",
        "punctuation.definition.comment",
        "unused.comment",
        "wildcard.comment",
      ],
      settings: {
        foreground: "#6F7C88",
      },
    },
    {
      name: "JSDoc-style keywords",
      scope: [
        "comment keyword.codetag.notation",
        "comment.block.documentation keyword",
        "comment.block.documentation storage.type.class",
      ],
      settings: {
        foreground: "#DF76C7",
      },
    },
    {
      name: "JSDoc-style types",
      scope: ["comment.block.documentation entity.name.type"],
      settings: {
        foreground: "#2ACEC0",
        fontStyle: "italic",
      },
    },
    {
      name: "JSDoc-style type brackets",
      scope: [
        "comment.block.documentation entity.name.type punctuation.definition.bracket",
      ],
      settings: {
        foreground: "#2ACEC0",
      },
    },
    {
      name: "JSDoc-style comment parameters",
      scope: ["comment.block.documentation variable"],
      settings: {
        foreground: "#FFA25F",
        fontStyle: "italic",
      },
    },
    {
      name: "Constants",
      scope: ["constant", "variable.other.constant"],
      settings: {
        foreground: "#E9ECEF",
      },
    },
    {
      name: "Constant escape sequences",
      scope: [
        "constant.character.escape",
        "constant.character.string.escape",
        "constant.regexp",
      ],
      settings: {
        foreground: "#DF76C7",
      },
    },
    {
      name: "HTML tags",
      scope: ["entity.name.tag"],
      settings: {
        foreground: "#FFD050",
      },
    },
    {
      name: "CSS attribute parent selectors ('&')",
      scope: ["entity.other.attribute-name.parent-selector"],
      settings: {
        foreground: "#DF76C7",
      },
    },
    {
      name: "HTML/CSS attribute names",
      scope: ["entity.other.attribute-name"],
      settings: {
        foreground: "#69A7FF",
        fontStyle: "italic",
      },
    },
    {
      name: "Function names",
      scope: [
        "entity.name.function",
        "meta.function-call.generic",
        "meta.function-call.object",
        "meta.function-call.php",
        "meta.function-call.static",
        "meta.method-call.java meta.method",
        "meta.method.groovy",
        "support.function.any-method.lua",
        "keyword.operator.function.infix",
      ],
      settings: {
        foreground: "#FFD050",
      },
    },
    {
      name: "Function parameters",
      scope: [
        "entity.name.variable.parameter",
        "meta.at-rule.function variable",
        "meta.at-rule.mixin variable",
        "meta.function.arguments variable.other.php",
        "meta.selectionset.graphql meta.arguments.graphql variable.arguments.graphql",
        "variable.parameter",
      ],
      settings: {
        fontStyle: "italic",
        foreground: "#FFA25F",
      },
    },
    {
      name: "Decorators",
      scope: [
        "meta.decorator variable.other.readwrite",
        "meta.decorator variable.other.property",
      ],
      settings: {
        foreground: "#FFD050",
        fontStyle: "italic",
      },
    },
    {
      name: "Decorator Objects",
      scope: ["meta.decorator variable.other.object"],
      settings: {
        foreground: "#FFD050",
      },
    },
    {
      name: "Keywords",
      scope: ["keyword", "punctuation.definition.keyword"],
      settings: {
        foreground: "#2ACEC0",
      },
    },
    {
      name: 'Keyword "new"',
      scope: ["keyword.control.new", "keyword.operator.new"],
      settings: {
        fontStyle: "bold",
      },
    },
    {
      name: "Generic selectors (CSS/SCSS/Less/Stylus)",
      scope: ["meta.selector"],
      settings: {
        foreground: "#DF76C7",
      },
    },
    {
      name: "Language Built-ins",
      scope: ["support"],
      settings: {
        fontStyle: "italic",
        foreground: "#FFD050",
      },
    },
    {
      name: "Built-in magic functions and constants",
      scope: [
        "support.function.magic",
        "support.variable",
        "variable.other.predefined",
      ],
      settings: {
        fontStyle: "regular",
        foreground: "#9174F7",
      },
    },
    {
      name: "Built-in functions / properties",
      scope: ["support.function", "support.type.property-name"],
      settings: {
        fontStyle: "regular",
      },
    },
    {
      name: "Separators (key/value, namespace, inheritance, pointer, hash, slice, etc)",
      scope: [
        "constant.other.symbol.hashkey punctuation.definition.constant.ruby",
        "entity.other.attribute-name.placeholder punctuation",
        "entity.other.attribute-name.pseudo-class punctuation",
        "entity.other.attribute-name.pseudo-element punctuation",
        "meta.group.double.toml",
        "meta.group.toml",
        "meta.object-binding-pattern-variable punctuation.destructuring",
        "punctuation.colon.graphql",
        "punctuation.definition.block.scalar.folded.yaml",
        "punctuation.definition.block.scalar.literal.yaml",
        "punctuation.definition.block.sequence.item.yaml",
        "punctuation.definition.entity.other.inherited-class",
        "punctuation.function.swift",
        "punctuation.separator.dictionary.key-value",
        "punctuation.separator.hash",
        "punctuation.separator.inheritance",
        "punctuation.separator.key-value",
        "punctuation.separator.key-value.mapping.yaml",
        "punctuation.separator.namespace",
        "punctuation.separator.pointer-access",
        "punctuation.separator.slice",
        "string.unquoted.heredoc punctuation.definition.string",
        "support.other.chomping-indicator.yaml",
        "punctuation.separator.annotation",
      ],
      settings: {
        foreground: "#E9ECEF",
      },
    },
    {
      name: "Brackets, braces, parens, etc.",
      scope: [
        "keyword.operator.other.powershell",
        "keyword.other.statement-separator.powershell",
        "meta.brace.round",
        "meta.function-call punctuation",
        "punctuation.definition.arguments.begin",
        "punctuation.definition.arguments.end",
        "punctuation.definition.entity.begin",
        "punctuation.definition.entity.end",
        "punctuation.definition.tag.cs",
        "punctuation.definition.type.begin",
        "punctuation.definition.type.end",
        "punctuation.section.scope.begin",
        "punctuation.section.scope.end",
        "storage.type.generic.java",
        "string.template meta.brace",
        "string.template punctuation.accessor",
      ],
      settings: {
        foreground: "#E9ECEF",
      },
    },
    {
      name: "Variable interpolation operators",
      scope: [
        "meta.string-contents.quoted.double punctuation.definition.variable",
        "punctuation.definition.interpolation.begin",
        "punctuation.definition.interpolation.end",
        "punctuation.definition.template-expression.begin",
        "punctuation.definition.template-expression.end",
        "punctuation.section.embedded.begin",
        "punctuation.section.embedded.coffee",
        "punctuation.section.embedded.end",
        "punctuation.section.embedded.end source.php",
        "punctuation.section.embedded.end source.ruby",
        "punctuation.definition.variable.makefile",
      ],
      settings: {
        foreground: "#DF76C7",
      },
    },
    {
      name: "Keys (serializable languages)",
      scope: [
        "entity.name.function.target.makefile",
        "entity.name.section.toml",
        "entity.name.tag.yaml",
        "variable.other.key.toml",
      ],
      settings: {
        foreground: "#2ACEC0",
      },
    },
    {
      name: "Dates / timestamps (serializable languages)",
      scope: ["constant.other.date", "constant.other.timestamp"],
      settings: {
        foreground: "#FFA25F",
      },
    },
    {
      name: "YAML aliases",
      scope: ["variable.other.alias.yaml"],
      settings: {
        fontStyle: "italic underline",
        foreground: "#A5D069",
      },
    },
    {
      name: "Storage",
      scope: [
        "storage",
        "meta.implementation storage.type.objc",
        "meta.interface-or-protocol storage.type.objc",
        "source.groovy storage.type.def",
      ],
      settings: {
        fontStyle: "regular",
        foreground: "#DF76C7",
      },
    },
    {
      name: "Types",
      scope: [
        "entity.name.type",
        "keyword.primitive-datatypes.swift",
        "keyword.type.cs",
        "meta.protocol-list.objc",
        "meta.return-type.objc",
        "source.go storage.type",
        "source.groovy storage.type",
        "source.java storage.type",
        "source.powershell entity.other.attribute-name",
        "storage.class.std.rust",
        "storage.type.attribute.swift",
        "storage.type.c",
        "storage.type.core.rust",
        "storage.type.cs",
        "storage.type.groovy",
        "storage.type.objc",
        "storage.type.php",
        "storage.type.haskell",
        "storage.type.ocaml",
      ],
      settings: {
        fontStyle: "italic",
        foreground: "#2ACEC0",
      },
    },
    {
      name: "Generics, templates, and mapped type declarations",
      scope: [
        "entity.name.type.type-parameter",
        "meta.indexer.mappedtype.declaration entity.name.type",
        "meta.type.parameters entity.name.type",
      ],
      settings: {
        foreground: "#FFA25F",
      },
    },
    {
      name: "Modifiers",
      scope: ["storage.modifier"],
      settings: {
        foreground: "#DF76C7",
      },
    },
    {
      name: "RegExp string",
      scope: [
        "string.regexp",
        "constant.other.character-class.set.regexp",
        "constant.character.escape.backslash.regexp",
      ],
      settings: {
        foreground: "#FFD050",
      },
    },
    {
      name: "Non-capture operators",
      scope: ["punctuation.definition.group.capture.regexp"],
      settings: {
        foreground: "#DF76C7",
      },
    },
    {
      name: "RegExp start and end characters",
      scope: [
        "string.regexp punctuation.definition.string.begin",
        "string.regexp punctuation.definition.string.end",
      ],
      settings: {
        foreground: "#F77373",
      },
    },
    {
      name: "Character group",
      scope: ["punctuation.definition.character-class.regexp"],
      settings: {
        foreground: "#2ACEC0",
      },
    },
    {
      name: "Capture groups",
      scope: ["punctuation.definition.group.regexp"],
      settings: {
        foreground: "#FFA25F",
      },
    },
    {
      name: "Assertion operators",
      scope: [
        "punctuation.definition.group.assertion.regexp",
        "keyword.operator.negation.regexp",
      ],
      settings: {
        foreground: "#F77373",
      },
    },
    {
      name: "Positive lookaheads",
      scope: ["meta.assertion.look-ahead.regexp"],
      settings: {
        foreground: "#A5D069",
      },
    },
    {
      name: "Strings",
      scope: ["string"],
      settings: {
        foreground: "#9174F7",
      },
    },
    {
      name: "String quotes (temporary vscode fix)",
      scope: [
        "punctuation.definition.string.begin",
        "punctuation.definition.string.end",
      ],
      settings: {
        foreground: "#A5D069",
      },
    },
    {
      name: "Property quotes (temporary vscode fix)",
      scope: [
        "punctuation.support.type.property-name.begin",
        "punctuation.support.type.property-name.end",
      ],
      settings: {
        foreground: "#2ACEC0",
      },
    },
    {
      name: "Docstrings",
      scope: [
        "string.quoted.docstring.multi",
        "string.quoted.docstring.multi.python punctuation.definition.string.begin",
        "string.quoted.docstring.multi.python punctuation.definition.string.end",
        "string.quoted.docstring.multi.python constant.character.escape",
      ],
      settings: {
        foreground: "#6F7C88",
      },
    },
    {
      name: "Variables and object properties",
      scope: [
        "variable",
        "constant.other.key.perl",
        "support.variable.property",
        "variable.other.constant.js",
        "variable.other.constant.ts",
        "variable.other.constant.tsx",
      ],
      settings: {
        foreground: "#E9ECEF",
      },
    },
    {
      name: "Destructuring / aliasing reference name (LHS)",
      scope: [
        "meta.import variable.other.readwrite",
        "meta.object-binding-pattern-variable variable.object.property",
        "meta.variable.assignment.destructured.object.coffee variable",
      ],
      settings: {
        fontStyle: "italic",
        foreground: "#FFA25F",
      },
    },
    {
      name: "Destructuring / aliasing variable name (RHS)",
      scope: [
        "meta.import variable.other.readwrite.alias",
        "meta.export variable.other.readwrite.alias",
        "meta.variable.assignment.destructured.object.coffee variable variable",
      ],
      settings: {
        fontStyle: "normal",
        foreground: "#E9ECEF",
      },
    },
    {
      name: "GraphQL keys",
      scope: ["meta.selectionset.graphql variable"],
      settings: {
        foreground: "#FFD050",
      },
    },
    {
      name: "GraphQL function arguments",
      scope: ["meta.selectionset.graphql meta.arguments variable"],
      settings: {
        foreground: "#E9ECEF",
      },
    },
    {
      name: "GraphQL fragment name (definition)",
      scope: ["entity.name.fragment.graphql", "variable.fragment.graphql"],
      settings: {
        foreground: "#2ACEC0",
      },
    },
    {
      name: "Edge cases (foreground color resets)",
      scope: [
        "constant.other.symbol.hashkey.ruby",
        "keyword.operator.dereference.java",
        "keyword.operator.navigation.groovy",
        "meta.scope.for-loop.shell punctuation.definition.string.begin",
        "meta.scope.for-loop.shell punctuation.definition.string.end",
        "meta.scope.for-loop.shell string",
        "storage.modifier.import",
        "punctuation.section.embedded.begin.tsx",
        "punctuation.section.embedded.end.tsx",
        "punctuation.section.embedded.begin.jsx",
        "punctuation.section.embedded.end.jsx",
        "punctuation.separator.list.comma.css",
        "constant.language.empty-list.haskell",
      ],
      settings: {
        foreground: "#E9ECEF",
      },
    },
    {
      name: 'Shell variables prefixed with "$" (edge case)',
      scope: ["source.shell variable.other"],
      settings: {
        foreground: "#9174F7",
      },
    },
    {
      name: "Powershell constants mistakenly scoped to `support`, rather than `constant` (edge)",
      scope: ["support.constant"],
      settings: {
        fontStyle: "normal",
        foreground: "#9174F7",
      },
    },
    {
      name: "Makefile prerequisite names",
      scope: ["meta.scope.prerequisites.makefile"],
      settings: {
        foreground: "#FFD050",
      },
    },
    {
      name: "SCSS attibute selector strings",
      scope: ["meta.attribute-selector.scss"],
      settings: {
        foreground: "#FFD050",
      },
    },
    {
      name: "SCSS attribute selector brackets",
      scope: [
        "punctuation.definition.attribute-selector.end.bracket.square.scss",
        "punctuation.definition.attribute-selector.begin.bracket.square.scss",
      ],
      settings: {
        foreground: "#E9ECEF",
      },
    },
    {
      name: "Haskell Pragmas",
      scope: ["meta.preprocessor.haskell"],
      settings: {
        foreground: "#6F7C88",
      },
    },
  ],
};

const shiki = await createHighlighter({
  themes: [netlifyTheme],
  langs: [...Object.keys(bundledLanguages)],
});

const FALLBACK_LANGUAGE = "text";

// TODO
// Add fallback language on code blocks so it doesn't crash
// Look into custom properties on the code blocks for different cool stylings

export function rehypeAero() {
  return async (tree: HastRoot) => {
    let i = 0;
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "pre" && parent) {
        const codeNode = node.children.find(
          (child: any) => child.tagName === "code"
        );

        // Need to parse the meta data and inject html class attributes on the lines/text
        // const meta = codeNode?.data.meta;

        if (codeNode) {
          // convert the node to Mdast format to pull the syntax language for shiki and the html span
          const codeMdast = toMdast(node);
          // grab the code block text and trim any white space off the end
          const codeBlock = codeNode.children[0].value.trimEnd();

          // style the code block with shiki
          const styledCodeBlock = shiki.codeToHast(codeBlock, {
            lang: codeMdast.lang,
            theme: "Netlify",

            transformers: [
              {
                pre(hast: { children: any }) {
                  return {
                    type: "element",
                    tagName: "div",
                    properties: {
                      className: "code-block",
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "p",
                        properties: {
                          className: "code-block-header",
                        },
                        children: [
                          {
                            type: "element",
                            tagName: "span",
                            properties: {
                              className: "language-name",
                            },
                            children: [{ type: "text", value: codeMdast.lang }],
                          },
                        ],
                      },
                      {
                        type: "element",
                        tagName: "pre",
                        properties: {
                          className: "aero",
                        },
                        children: hast.children,
                      },
                    ],
                  };
                },
                line(hast: { children: any }, line: any) {
                  return {
                    type: "element",
                    tagName: "span",
                    properties: {
                      className: "line",
                    },
                    children: hast.children,
                  };
                },
                span(hast: { properties: any; children: any }, line: any) {
                  return {
                    type: "element",
                    tagName: "span",
                    properties: hast.properties,
                    children: hast.children,
                  };
                },
              },
            ],
          });

          parent.children.splice(index, 1, styledCodeBlock);
        }
      }
    });
  };
}

const data = Deno.args[0];
async function main(data: string) {
  const encoder = new TextEncoder();

  const parsed = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeAero)
    .use(rehypeStringify)
    .process(data);

  encoder.encode(parsed.toString());
  Deno.stdout.writeSync(encoder.encode(parsed.toString()));
}

await main(data);
