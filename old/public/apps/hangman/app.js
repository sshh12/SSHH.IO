let pattern = document.getElementById('pattern');
let notinclude = document.getElementById('lettersguessed');

function calcBestGuess() {

    let pat = pattern.value.toLowerCase().replace(/[\.\?!,]/g, '').trim();
    let groups = pat.split(' ');
    let notincluded = notinclude.value.toLowerCase().replace(' ', "").split('');

    let counts = {};

    for (let w of words) {
        let valid = true;
        for (let ch of notincluded) {
            if (w.includes(ch)) {
                valid = false;
                break;
            }
        }
        if (valid) {
            for (let p of groups) {
                if (patternMatch(w, p)) {
                    addCounts(counts, w);
                    console.log(w)
                }
            }
        }
    }

    console.log(counts)

    let best = '';

    for (var ch in counts) {
        if (!pat.includes(ch) && (best.length == 0 || counts[ch] >= counts[best])) {
            best = ch;
        }
    }

    alert(best);
}

function patternMatch(word, pattern) {
    if (pattern.length == word.length) {
        for (let i = 0; i < word.length; i++) {
            if (!(pattern.charAt(i) == '-' || pattern.charAt(i) == word.charAt(i))) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function addCounts(counts, word) {
    for (var i = 0; i < word.length; i++) {
        if (counts[word.charAt(i)] === undefined) {
            counts[word.charAt(i)] = 0;
        }
        counts[word.charAt(i)] += 1;
    }
}