export const dummyData = {
    "GROUP": [
        {
            "key": "[]",
            "type": "GROUP",
            "hint": "We use capital brackets for enclosing multiple keys. In following query, we can use wildcard chars to point multiple keys and the value is being searched into all listed key fields. i.e. <i>[key1, key2, *Id] value</i>",
            "supportedTypes": null
        },
        {
            "key": "()",
            "type": "GROUP",
            "hint": "We use the small breacket to combine multiple values or make a separation. Following query represent IN query, where we can define multiple values to be searched. i.e. <i>key = (value1, value2, value3)</i>",
            "supportedTypes": null
        },
        {
            "key": "\"",
            "type": "GROUP",
            "hint": "The \" we use to combine a text with spaces. i.e. <i>key = \"sample value\"</i>",
            "supportedTypes": null
        },
        {
            "key": "&#39;",
            "type": "GROUP",
            "hint": "Another form of combining text with spaces. i.e. <i>key = &#39;sample value&#39;</i>",
            "supportedTypes": null
        }
    ],
    "OPERATOR": [
        {
            "key": "=",
            "type": "OPERATOR",
            "hint": "Equals operator to make a value in key. i.e. <i>key = value</i>",
            "supportedTypes": "[INT, LONG, DOUBLE, BOOLEAN, TEXT, DATE, ARRAY, OBJECT]"
        },
        {
            "key": ">",
            "type": "OPERATOR",
            "hint": "Greater than operator to find rows which key has more value than specified value. i.e. <i>key > value</i>",
            "supportedTypes": "[INT, LONG, DOUBLE, DATE]"
        },
        {
            "key": ">=",
            "type": "OPERATOR",
            "hint": "Greater than equal to operator to find rows which key has more or equal value than specified value. i.e. <i>key >= value</i>",
            "supportedTypes": "[INT, LONG, DOUBLE, DATE]"
        },
        {
            "key": "<",
            "type": "OPERATOR",
            "hint": "Less than operator to find rows which key has less value than specified value. i.e. <i>key < value</i>",
            "supportedTypes": "[INT, LONG, DOUBLE, DATE]"
        },
        {
            "key": "<=",
            "type": "OPERATOR",
            "hint": "Less than equal to operator to find rows which key has less or equal value than specified value. i.e. <i>key <= value</i>",
            "supportedTypes": "[INT, LONG, DOUBLE, DATE]"
        },
        {
            "key": "!=",
            "type": "OPERATOR",
            "hint": "Not equal to operator to find rows which key has not equal value than specified value. i.e. <i>key != value</i>",
            "supportedTypes": "[INT, LONG, DOUBLE, DATE]"
        },
        {
            "key": "= ()",
            "type": "OPERATOR",
            "hint": "IN operator to match multiple values in a key(s). i.e. <i>key = (value1, value2, value3)</i>",
            "supportedTypes": "[INT, LONG, DOUBLE, DATE, TEXT]"
        },
        {
            "key": "!= ()",
            "type": "OPERATOR",
            "hint": "NOT IN operator not to match multiple values in a key(s). i.e. <i>key != (value1, value2, value3)</i>",
            "supportedTypes": "[INT, LONG, DOUBLE, DATE, TEXT]"
        },
        {
            "key": "= &#39;x?y*z&#39;",
            "type": "OPERATOR",
            "hint": "This is sort of wildcard query where we can use ? and * to match values.",
            "supportedTypes": "[TEXT]"
        },
        {
            "key": "!= &#39;x?y*z&#39;",
            "type": "OPERATOR",
            "hint": "This is wildcard query where we can use ? and * to NOT match values.",
            "supportedTypes": "[TEXT]"
        }
    ],
    "KEYWORD": [
        {
            "key": "has",
            "type": "KEYWORD",
            "hint": "This keyword is used to identify if a row has value for key. A sort of exists query. i.e. <i>has key</i>",
            "supportedTypes": null
        },
        {
            "key": "+",
            "type": "KEYWORD",
            "hint": "We can use + before any value to make it must match. i.e.<i>key = +\"Rajesh Kumar\"</i>",
            "supportedTypes": null
        }
    ],
    "FUNCTION": [
        {
            "key": "isEmpty",
            "type": "FUNCTION",
            "hint": "Check or select rows if the key&#39;s value is empty i.e. <i>key isEmpty</i>",
            "supportedTypes": "[TEXT, DATE, ARRAY]"
        },
        {
            "key": "isNotEmpty",
            "type": "FUNCTION",
            "hint": "Check or select rows if the key&#39;s value is NOT empty i.e. <i>key isNotEmpty</i>",
            "supportedTypes": "[TEXT, DATE, ARRAY]"
        },
        {
            "key": "isNotNull",
            "type": "FUNCTION",
            "hint": "Check or select rows if the key&#39;s value is NOT null i.e. <i>key isNotNull</i>",
            "supportedTypes": "[TEXT, DATE, ARRAY]"
        },
        {
            "key": "isNull",
            "type": "FUNCTION",
            "hint": "Check or select rows if the key&#39;s value is null i.e. <i>key isNull</i>",
            "supportedTypes": "[TEXT, DATE, ARRAY]"
        },
        {
            "key": "regex",
            "type": "FUNCTION",
            "hint": "Check or select rows if key&#39;s value match with regex i.e. <i>.key regex(&#39;^R.*esh$&#39;)</i>",
            "supportedTypes": "[TEXT]"
        },
        {
            "key": "toDate",
            "type": "FUNCTION",
            "hint": "This function help to convert string value to date for matching key&#39;s value. i.e. <i>key >= toDate(&#39;2018-08-15 13:20:30&#39;, &#39;yyyy-MM-dd HH:mm:ss&#39;)</i>",
            "supportedTypes": "[DATE]"
        }
    ],
    "CONJUNCTION": [
        {
            "key": "AND",
            "type": "CONJUNCTION",
            "hint": "A logical conjunction on two expressions to be matched. i.e. key = value AND key = value",
            "supportedTypes": null
        },
        {
            "key": "OR",
            "type": "CONJUNCTION",
            "hint": "A logical conjunction on two expressions to be matched. i.e. key = value AND key = value",
            "supportedTypes": null
        }
    ]
};