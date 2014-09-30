// Transliteration ported from https://github.com/yaroslav/russian/blob/master/lib/russian/transliteration.rb

var LOWER_SINGLE = {
  "і": "i", "ґ": "g", "ё": "yo", "№": "#", "є": "e",
  "ї": "yi", "а": "a", "б": "b",
  "в": "v", "г": "g", "д": "d", "е": "e", "ж": "zh",
  "з": "z", "и": "i", "й": "y", "к": "k", "л": "l",
  "м": "m", "н": "n", "о": "o", "п": "p", "р": "r",
  "с": "s", "т": "t", "у": "u", "ф": "f", "х": "h",
  "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sch", "ъ": "",
  "ы": "y", "ь": "", "э": "e", "ю": "yu", "я": "ya"
};

var LOWER_MULTI = {
  "ье": "ie",
  "ьё": "ie"
};

var UPPER_SINGLE = {
  "Ґ": "G", "Ё": "YO", "Є": "E", "Ї": "YI", "І": "I",
  "А": "A", "Б": "B", "В": "V", "Г": "G",
  "Д": "D", "Е": "E", "Ж": "ZH", "З": "Z", "И": "I",
  "Й": "Y", "К": "K", "Л": "L", "М": "M", "Н": "N",
  "О": "O", "П": "P", "Р": "R", "С": "S", "Т": "T",
  "У": "U", "Ф": "F", "Х": "H", "Ц": "TS", "Ч": "CH",
  "Ш": "SH", "Щ": "SCH", "Ъ": "", "Ы": "Y", "Ь": "",
  "Э": "E", "Ю": "YU", "Я": "YA"
};
var UPPER_MULTI = {
  "ЬЕ": "IE",
  "ЬЁ": "IE"
};

var LOWER = {};
for (var key in LOWER_SINGLE) {
  LOWER[key] = LOWER_SINGLE[key];
}
for (var key in LOWER_MULTI) {
  LOWER[key] = LOWER_MULTI[key];
}

var UPPER = {};
for (var key in UPPER_SINGLE) {
  UPPER[key] = UPPER_SINGLE[key];
}
for (var key in UPPER_MULTI) {
  UPPER[key] = UPPER_MULTI[key];
}

var MULTI_KEYS = {};
for (var key in LOWER_MULTI) MULTI_KEYS[key] = LOWER_MULTI[key];
for (var key in UPPER_MULTI) MULTI_KEYS[key] = UPPER_MULTI[key];
MULTI_KEYS = Object.keys(MULTI_KEYS).sort(function(a, b) {
  return a.length > b.length;
});


// Transliterate a string with russian/ukrainian characters
function transliterate(str) {
  var reg = new RegExp(MULTI_KEYS.join('|') + '|\\w|.', 'g');

  var result = "";
  var chars = str.match(reg);
  for (var i = 0; i < chars.length; i++) {
    if (chars[i] in UPPER && chars[i + 1] in LOWER) {
      // combined case
      var r = UPPER[chars[i]].toLowerCase();
      result += r[0].toUpperCase() + r.slice(1);
    } else if (chars[i] in UPPER) {
      result += UPPER[chars[i]];
    } else if (chars[i] in LOWER) {
      result += LOWER[chars[i]];
    } else {
      result += chars[i];
    }
  }

  return result;
}

module.exports = transliterate;
