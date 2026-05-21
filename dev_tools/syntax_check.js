const fs = require('fs');

try {
    const content = fs.readFileSync('script.js', 'utf8');
    const stack = [];
    let line = 1;
    let col = 0;
    let inString = false;
    let stringChar = '';
    let inComment = false; // Multi-line comment

    for (let i = 0; i < content.length; i++) {
        const char = content[i];

        if (char === '\n') {
            line++;
            col = 0;
            continue;
        }
        col++;

        // Handle Comments
        if (!inString && !inComment) {
            if (char === '/' && content[i + 1] === '*') {
                inComment = true;
                i++;
                continue;
            }
            if (char === '/' && content[i + 1] === '/') {
                // Single line comment, skip to newline
                while (i < content.length && content[i] !== '\n') i++;
                line++;
                col = 0;
                continue;
            }
        }
        if (inComment) {
            if (char === '*' && content[i + 1] === '/') {
                inComment = false;
                i++;
            }
            continue;
        }

        // Handle Strings
        if (!inComment) {
            if (inString) {
                if (char === stringChar && content[i - 1] !== '\\') {
                    inString = false;
                }
                continue;
            } else if (char === '"' || char === "'" || char === '`') {
                inString = true;
                stringChar = char;
                continue;
            }
        }

        // Handle Braces/Parens
        if (['(', '{', '['].includes(char)) {
            stack.push({ char, line, col });
        } else if ([')', '}', ']'].includes(char)) {
            if (stack.length === 0) {
                console.log(`❌ Unexpected closing '${char}' at line ${line}:${col}`);
                process.exit(1);
            }
            const last = stack.pop();
            const expected = last.char === '(' ? ')' : last.char === '{' ? '}' : ']';
            if (char !== expected) {
                console.log(`❌ Mismatch! Expected '${expected}' but found '${char}' at line ${line}:${col}. Match for '${last.char}' at ${last.line}:${last.col}`);
                process.exit(1);
            }
        }
    }

    if (stack.length > 0) {
        const last = stack[stack.length - 1];
        console.log(`❌ Unclosed '${last.char}' from line ${last.line}:${last.col}`);
        process.exit(1);
    }

    console.log("✅ No simple brace/paren mismatches found.");

} catch (err) {
    console.error("Error reading file:", err);
}
